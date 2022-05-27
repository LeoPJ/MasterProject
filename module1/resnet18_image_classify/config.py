import torch
# train
epoch = 500
num_classes = 4
batch_size = 32
# device = 'cpu'  # cpu or 'cuda:0'
# 定义是否使用GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
train_image_path = './resnet18_image_classify/data2/numbers/train2/'  # 每个类别一个文件夹, 类别使用数字
# valid_image_path = './resnet18_image_classify/data2/numbers/val/'  # 每个类别一个文件夹, 类别使用数字
num_workers = 4  # 加载数据集线程并发数
best_loss = 0.001  # 当loss小于等于该值会保存模型
save_model_iter = 100  # 每多少次保存一份模型
model_output_dir = './resnet18_image_classify/data2/resnet_cls/'
resume = False  # 是否从断点处开始训练
chkpt = './resnet18_image_classify/data2/resnet_cls/best_11.pth'  # 断点训练的模型
lr = 0.0001

# predict
predict_model = './resnet18_image_classify/data2/resnet_cls/epoch_400.pth'
#predict_model = './data2/resnet_cls/best_66.pth'
predict_image_path = './resnet18_image_classify/data2/numbers/test3'  # 每个类别一个文件夹, 类别使用数字
#predict_image_path = './data2/numbers/test'

image_format = 'jpg'
