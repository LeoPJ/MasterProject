from pprint import pprint
import os
import logging
import shutil
from sklearn.metrics import accuracy_score, f1_score, multilabel_confusion_matrix, classification_report
import torch
import torch.nn as nn
import numpy as np
from torch.utils.data import DataLoader, RandomSampler
from transformers import BertTokenizer
from sklearn.model_selection import train_test_split

import bert_config
import preprocess
import dataset
import models
import utils
import json
import csv

logger = logging.getLogger(__name__)


class Trainer:
    def __init__(self, args, train_loader, dev_loader, test_loader):
        self.args = args
        gpu_ids = args.gpu_ids.split(',')
        self.device = torch.device("cpu" if gpu_ids[0] == '-1' else "cuda:" + gpu_ids[0])
        self.model = models.BertForMultiLabelClassification(args)
        self.optimizer = torch.optim.Adam(params=self.model.parameters(), lr=self.args.lr)
        self.criterion = nn.BCEWithLogitsLoss()
        self.train_loader = train_loader
        self.dev_loader = dev_loader
        self.test_loader = test_loader
        self.model.to(self.device)

    def load_ckp(self, model, optimizer, checkpoint_path):
        checkpoint = torch.load(checkpoint_path)
        model.load_state_dict(checkpoint['state_dict'])
        optimizer.load_state_dict(checkpoint['optimizer'])
        epoch = checkpoint['epoch']
        loss = checkpoint['loss']
        return model, optimizer, epoch, loss

    def save_ckp(self, state, checkpoint_path):
        torch.save(state, checkpoint_path)

    """
    def save_ckp(self, state, is_best, checkpoint_path, best_model_path):
        tmp_checkpoint_path = checkpoint_path
        torch.save(state, tmp_checkpoint_path)
        if is_best:
            tmp_best_model_path = best_model_path
            shutil.copyfile(tmp_checkpoint_path, tmp_best_model_path)
    """

    def train(self):
        total_step = len(self.train_loader) * self.args.train_epochs
        global_step = 0
        eval_step = 100
        best_dev_micro_f1 = 0.0
        for epoch in range(args.train_epochs):
            for train_step, train_data in enumerate(self.train_loader):
                self.model.train()
                token_ids = train_data['token_ids'].to(self.device)
                attention_masks = train_data['attention_masks'].to(self.device)
                token_type_ids = train_data['token_type_ids'].to(self.device)
                labels = train_data['labels'].to(self.device)
                train_outputs = self.model(token_ids, attention_masks, token_type_ids)
                loss = self.criterion(train_outputs, labels)
                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()
                logger.info(
                    "【train】 epoch：{} step:{}/{} loss：{:.6f}".format(epoch, global_step, total_step, loss.item()))
                global_step += 1
                if global_step % eval_step == 0:
                    dev_loss, dev_outputs, dev_targets = self.dev()
                    accuracy, micro_f1, macro_f1 = self.get_metrics(dev_outputs, dev_targets)
                    logger.info(
                        "【dev】 loss：{:.6f} accuracy：{:.4f} micro_f1：{:.4f} macro_f1：{:.4f}".format(dev_loss, accuracy,
                                                                                                   micro_f1, macro_f1))
                    if macro_f1 > best_dev_micro_f1:
                        logger.info("------------>保存当前最好的模型")
                        checkpoint = {
                            'epoch': epoch,
                            'loss': dev_loss,
                            'state_dict': self.model.state_dict(),
                            'optimizer': self.optimizer.state_dict(),
                        }
                        best_dev_micro_f1 = macro_f1
                        checkpoint_path = os.path.join(self.args.output_dir, 'best.pt')
                        self.save_ckp(checkpoint, checkpoint_path)

    def dev(self):
        self.model.eval()
        total_loss = 0.0
        dev_outputs = []
        dev_targets = []
        with torch.no_grad():
            for dev_step, dev_data in enumerate(self.dev_loader):
                token_ids = dev_data['token_ids'].to(self.device)
                attention_masks = dev_data['attention_masks'].to(self.device)
                token_type_ids = dev_data['token_type_ids'].to(self.device)
                labels = dev_data['labels'].to(self.device)
                outputs = self.model(token_ids, attention_masks, token_type_ids)
                loss = self.criterion(outputs, labels)
                # val_loss = val_loss + ((1 / (dev_step + 1))) * (loss.item() - val_loss)
                total_loss += loss.item()
                outputs = torch.sigmoid(outputs).cpu().detach().numpy().tolist()
                outputs = (np.array(outputs) > 0.6).astype(int)
                dev_outputs.extend(outputs.tolist())
                dev_targets.extend(labels.cpu().detach().numpy().tolist())

        return total_loss, dev_outputs, dev_targets

    def test(self, checkpoint_path):
        model = self.model
        optimizer = self.optimizer
        model, optimizer, epoch, loss = self.load_ckp(model, optimizer, checkpoint_path)
        model.eval()
        model.to(self.device)
        total_loss = 0.0
        test_outputs = []
        test_targets = []
        with torch.no_grad():
            for test_step, test_data in enumerate(self.test_loader):
                token_ids = test_data['token_ids'].to(self.device)
                attention_masks = test_data['attention_masks'].to(self.device)
                token_type_ids = test_data['token_type_ids'].to(self.device)
                labels = test_data['labels'].to(self.device)
                outputs = model(token_ids, attention_masks, token_type_ids)
                loss = self.criterion(outputs, labels)
                # val_loss = val_loss + ((1 / (dev_step + 1))) * (loss.item() - val_loss)
                total_loss += loss.item()
                outputs = torch.sigmoid(outputs).cpu().detach().numpy().tolist()
                outputs = (np.array(outputs) > 0.6).astype(int)
                test_outputs.extend(outputs.tolist())
                test_targets.extend(labels.cpu().detach().numpy().tolist())

        return total_loss, test_outputs, test_targets

    def predict(self, tokenizer, text, id2label, args):
        model = self.model
        optimizer = self.optimizer
        checkpoint = os.path.join(args.output_dir, 'best.pt')
        model, optimizer, epoch, loss = self.load_ckp(model, optimizer, checkpoint)
        model.eval()
        model.to(self.device)
        with torch.no_grad():
            inputs = tokenizer.encode_plus(text=text,
                                           add_special_tokens=True,
                                           max_length=args.max_seq_len,
                                           truncation='longest_first',
                                           padding="max_length",
                                           return_token_type_ids=True,
                                           return_attention_mask=True,
                                           return_tensors='pt')
            token_ids = inputs['input_ids'].to(self.device)
            attention_masks = inputs['attention_mask'].to(self.device)
            token_type_ids = inputs['token_type_ids'].to(self.device)
            outputs = model(token_ids, attention_masks, token_type_ids)
            outputs = torch.sigmoid(outputs).cpu().detach().numpy().tolist()
            print(outputs)
            outputs = (np.array(outputs) > 0.5).astype(int)
            outputs = np.where(outputs[0] == 1)[0].tolist()
            if len(outputs) != 0:
                outputs = [id2label[i] for i in outputs]
                return outputs
            else:
                return '不好意思，我没有识别出来'

    def get_metrics(self, outputs, targets):
        accuracy = accuracy_score(targets, outputs)
        micro_f1 = f1_score(targets, outputs, average='micro')
        macro_f1 = f1_score(targets, outputs, average='macro')
        return accuracy, micro_f1, macro_f1

    def get_classification_report(self, outputs, targets, labels):
        # confusion_matrix = multilabel_confusion_matrix(targets, outputs)
        report = classification_report(targets, outputs, target_names=labels)
        return report


if __name__ == '__main__':
    args = bert_config.Args().get_parser()
    utils.utils.set_seed(args.seed)
    utils.utils.set_logger(os.path.join(args.log_dir, 'main.log'))

    processor = preprocess.Processor()

    label2id = {'过渡': 0, '交互': 1, '其他': 2}
    id2label = {0: '过渡', 1: '交互', 2: '其他'}
    labels = ['过渡', '交互', '其他']

    # 预测
    trainer = Trainer(args, None, None, None)
    checkpoint_path = './checkpoints/best.pt'
    tokenizer = BertTokenizer.from_pretrained(args.bert_dir)
    # 读取test1.json里面的数据
    # with open(os.path.join('./media/srt/TCP.json'), 'r') as fp:
    #     lines = fp.read().strip().split('\n')
    #     for line in lines:
    #         text = eval(line)['text']
    #         print(text)
    #         result = trainer.predict(tokenizer, text, id2label, args)
    #         print(result)

    # with open(os.path.join('./media/srt/2a.json'), 'r') as fp:
    #     xf_dicts = json.load(fp)
    #
    # with open("./data/mydata/result/2a.csv", "a") as csvfile:
    #     writer = csv.writer(csvfile)
    #     writer.writerow(['text', 'result'])
    #     for i in xf_dicts["xf_result"]["data"]:
    #         text = preprocess.cut_text(i['onebest'])
    #         print(text)
    #         result = trainer.predict(tokenizer, text, id2label, args)
    #         print(result)
    #         writer.writerow([text, str(result)])

    # 预测单条
    text = '然后呢我们要说一下数据库技术是怎么产生'
    print(trainer.predict(tokenizer, text, id2label, args))
