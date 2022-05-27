import glob
import os
import cv2
import config
import torch
import numpy as np
from torch import nn
from PIL import Image
from torchvision import models
import torchvision.transforms as transforms
import subprocess

transform_test = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

# error_num = [0, 0, 0, 0]
# all_num = [0, 0, 0, 0]
# classes = ['0', '1', '2']

def predict_images(image_file, model):
    image = Image.open(image_file)
    image = image.convert("RGB")
    numpy_array = np.asarray(image.copy())
    image = transform_test(image)
    image = image.unsqueeze_(0).to(config.device)
    with torch.no_grad():
        outputs = model(image)
        outputs = outputs.to('cpu')
    predict_label = torch.max(outputs, dim=1)[1].data.numpy()[0]
    # if predict_label != label:
        # error_num[label] += 1
        # print("predict error image = {}".format(image_file))
        # cv2.imshow("image", numpy_array)
    # print("测试类别={} 预测类别={} 检测正确".format(label, predict_label))
    # cv2.imshow("image", numpy_array)
    # cv2.waitKey(0)
    return predict_label


def get_image_label_to_predict(images_path):
    model = models.resnet18(pretrained=False)
    num_fits = model.fc.in_features
    model.fc = nn.Linear(num_fits, config.num_classes)
    model.load_state_dict(torch.load(config.predict_model)['net'])
    model.eval()
    model.to(config.device)
    
    # classes_dir = os.listdir(config.predict_image_path)
    # for label in classes_dir:
    #    # label_path = os.path.join(config.predict_image_path, label)
    res = []
    if os.path.isdir(images_path):
        images = glob.glob(os.path.join(images_path, "*.{}".format(config.image_format)))
        # all_num[int(label)] = len(images)
        for img in images:
            res.append([img, predict_images(img, model)])
            print([img, predict_images(img, model)])
        # accuracy = 1 - error_num[int(label)] / all_num[int(label)]
        # print("类别{}共{}张图片，预测错误图片共{}张，精度为{}\n".format(label, all_num[int(label)], error_num[int(label)], accuracy))


if __name__ == '__main__':
    # get_image_label_to_predict("./resnet18_image_classify/data2/test_for_use/info_dmt/")

    # 只对一张图预测
    model = models.resnet18(pretrained=False)
    num_fits = model.fc.in_features
    model.fc = nn.Linear(num_fits, config.num_classes)
    model.load_state_dict(torch.load(config.predict_model)['net'])
    model.eval()
    model.to(config.device)
    
    # img_path = './resnet18_image_classify/data2/test_for_use/Chinese_6/Chinese_3.jpg'
    # print(predict_images(img_path, model))
    
    label2name = {0: 'D', 1: 'B', 2: 'A', 3: 'C'}

    # course_list = ['dbor_8', 'dbor_30', 'dbor_29', 'dbor_13', 'dbor_10', 'dbor_7', 'dbor_9', 'dbor_15', 'dbor_14', 'dbor_16', 'dbor_22', 'dbor_18', 'dbor_27', 'dbor_6', 'dbor_11', 'dbor_2', 'dbor_31', 'dbor_24', 'dbor_17', 'dbor_21', 'dbor_3', 'dbor_1', 'dbor_19', 'dbor_26', 'dbor_32', 'dbor_12', 'dbor_28', 'dbor_23', 'dbor_4', 'dbor_5', 'dbor_25']
    course_list = ['MB_4']
    for j in course_list:
        frame_path = f'./resnet18_image_classify/data2/test_for_use/{j}/'
        frame_number = len(os.listdir(frame_path))
        print(frame_path + str(frame_number) + '张图')
        
        close_path = f'./resnet18_image_classify/data2/test_for_use/MB_4_close/{j}/'
        if not os.path.exists(close_path):
            os.makedirs(close_path)
    
        res_json = []
        for i in range(1, frame_number+1):
            image_path = os.path.join(frame_path, f'MB_4_{i}.jpg')
            label = predict_images(image_path, model)
            print(f'{image_path} predict:{label}')

            if i == 1:
                res_json.append({'name': label2name[label], 'startTime': 1, 'endTime': 1})
                continue
    
            if label2name[label] == res_json[-1]['name']:
                res_json[-1]['endTime'] = i
            else:
                res_json.append({'name': label2name[label], 'startTime': i, 'endTime': i})

            if label == 1:
                subprocess.run(f"cp {image_path} {close_path}", shell=True)

        with open(f'./resnet18_image_classify/data2/test_for_use/{j}.txt', 'w') as f:
            for k in res_json:
                f.write(str(k) + ',\n')
