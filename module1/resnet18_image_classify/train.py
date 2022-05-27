from asyncore import write
import config
import torch
import torch.optim as optim
from torch.optim import lr_scheduler
from torch import classes, nn
import os
# from tqdm import tqdm
from torchvision import models, transforms
from torch.utils.tensorboard import SummaryWriter
from dataset import Dataset


def train(model, loss_func, dataset, optimizer, epoch, writer):
    model.train()
    batch_loss = 0.0
    accuracy_epoch = 0.0
    loss_epoch = 0.0
    item = 0
    correct = 0
    batch_num = 0

    for batch, (image, label) in enumerate(dataset):
        batch_num += 1
        # label=torch.tensor(label)
        # print(label)
        image = image.to(config.device)
        label = label.to(config.device)
        optimizer.zero_grad()
        output = model(image)
        _, pred = torch.max(output, 1)
        loss = loss_func(output, label)
        loss.backward()
        optimizer.step()

        item += label.size(0)
        batch_loss += loss.data.item()
        correct += pred.eq(label.data).cpu().sum()
        accuracy_epoch = 100. * correct / item
        loss_epoch = 100. * batch_loss / batch_num
        print("Train Epoch = %d Batcch = %d Train_Loss = %.03f Train_Acc = %.3f%%"
                % (epoch, batch, loss_epoch, accuracy_epoch))

    writer.add_scalar("train_loss", batch_loss, epoch)
    writer.add_scalar("train_accuracy", accuracy_epoch, epoch)

    return loss_epoch


def valid(model, loss_func, dataset, epoch, writer):
    model.eval()
    batch_loss = 0
    loss_epoch = 0.0
    accuracy_epoch = 0.0
    item = 0
    correct = 0
    batch_num = 0
    with torch.no_grad():
        for batch, (image, label) in enumerate(dataset):
            batch_num += 1
            image = image.to(config.device)
            label = label.to(config.device)
            output = model(image)
            loss = loss_func(output, label)
            _, pred = torch.max(output, 1)

            item += label.size(0)
            batch_loss += loss.data.item()
            correct += pred.eq(label.data).cpu().sum()
            accuracy_epoch = 100. * correct / item
            loss_epoch = 100. * batch_loss / batch_num

            print("valid Epoch = %d Batcch = %d Train_Loss = %.03f Train_Acc = %.3f%%"
                    % (epoch, batch, loss_epoch, accuracy_epoch))

        writer.add_scalar("valid_loss", loss_epoch, epoch)
        writer.add_scalar("valid_accuracy", accuracy_epoch, epoch)

    return loss_epoch


def train_model(model, loss_func, optimizer, step_scheduler, num_epochs=config.epoch):
    data_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])  # 各通道颜色的均值和方差,用于归一化
    ])    

    all_dataset = Dataset(config.train_image_path, data_transform, config.image_format)
    train_dataset, valid_dataset = torch.utils.data.random_split(dataset=all_dataset, lengths=[3087, 1050])

    train_dataloader = torch.utils.data.DataLoader(
        train_dataset, batch_size=config.batch_size,
        shuffle=True, num_workers=config.num_workers,
    )
    valid_dataloader = torch.utils.data.DataLoader(
        valid_dataset, batch_size=config.batch_size,
        shuffle=True, num_workers=config.num_workers
    )
    # classes = (0, 1, 2)
    start_epoch = 0
    # 断点继续训练
    if config.resume:
        checkpoint = torch.load(config.chkpt)  # 加载断点
        model.load_state_dict(checkpoint['net'])  # 加载模型可学习参数
        optimizer.load_state_dict(checkpoint['optimizer'])  # 加载优化器参数
        start_epoch = checkpoint['epoch']  # 设置开始的epoch
    writer = SummaryWriter(log_dir="./resnet18_image_classify/runs")
    # images, _ = next(iter(train_dataloader))
    # writer.add_graph(model, images)
    for epoch in range(start_epoch + 1, num_epochs):
        train_epoch_loss = train(model, loss_func, train_dataloader, optimizer, epoch, writer)
        valid_epoch_loss = valid(model, loss_func, valid_dataloader, epoch, writer)
        step_scheduler.step()
        # 模型保存
        if epoch % config.save_model_iter == 0:
            checkpoint = {
                "net": model.state_dict(),
                'optimizer': optimizer.state_dict(),
                "epoch": epoch
            }
            save_model_file = os.path.join(config.model_output_dir, "epoch_{}.pth".format(epoch))
            if not os.path.exists(config.model_output_dir):
                os.makedirs(config.model_output_dir)
            torch.save(checkpoint, save_model_file)
        if train_epoch_loss < config.best_loss or valid_epoch_loss < config.best_loss:
            checkpoint = {
                "net": model.state_dict(),
                'optimizer': optimizer.state_dict(),
                "epoch": epoch
            }
            save_model_file = os.path.join(config.model_output_dir, "best_{}.pth".format(epoch))
            if not os.path.exists(config.model_output_dir):
                os.makedirs(config.model_output_dir)
            torch.save(checkpoint, save_model_file)
        # if epoch % 10 == 0:
        #     print("Epoch = {} Train Loss = {} Valid Loss = {}".format(epoch, train_epoch_loss, valid_epoch_loss))
    writer.close()


if __name__ == '__main__':
    backbone = models.resnet18(pretrained=False)
    num_fits = backbone.fc.in_features
    backbone.fc = nn.Linear(num_fits, config.num_classes)  # 替换最后一个全连接层
    model_ft = backbone.to(config.device)
    criterion = nn.CrossEntropyLoss()
    optimizer_ft = optim.Adam(model_ft.parameters(), lr=config.lr)
    scheduler = lr_scheduler.StepLR(optimizer_ft, step_size=10, gamma=0.1)
    train_model(model_ft, criterion, optimizer_ft, scheduler, config.epoch)
