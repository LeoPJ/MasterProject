# encoding:utf-8
import json
import requests
import base64
import cv2
import numpy as np


# access_token: 24.73293984473d0389b2eea913fe9352ec.2592000.1649332082.282335-25728899
def get_access_token():
    API_key = 'BY91u1yqikMYxsr09w9hdyk9'
    Secret_key = 'GbSaY6sBQPXxTMahd3V7VzDDmEkubD0Z'
    host = f'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_key}&client_secret={Secret_key}'
    response = requests.get(host)
    if response:
        print(response.json())

    return response.json()['access_token']


ACCESS_TOKEN = '24.73293984473d0389b2eea913fe9352ec.2592000.1649332082.282335-25728899'

'''
人像分割
'''

request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg"
# 二进制方式打开图片文件
f = open('E:/MasterProject/毕业论文/论文2.0/视频截图/投影完整/MB_4_151.jpg', 'rb')
img = base64.b64encode(f.read())

params = {"image": img}
request_url = request_url + "?access_token=" + get_access_token()
headers = {'content-type': 'application/x-www-form-urlencoded'}
response = requests.post(request_url, data=params, headers=headers)
if response:
    print(response.json())


with open('E:/MasterProject/毕业论文/论文2.0/视频截图/投影完整/MB_4_151.json', 'w') as f:
    json.dump(response.json(), f)
with open('E:/MasterProject/毕业论文/论文2.0/视频截图/投影完整/MB_4_151.json', 'r') as f:
    res = json.load(f)

labelmap = base64.b64decode(res['labelmap'])    # res为通过接口获取的返回json
nparr = np.frombuffer(labelmap, np.uint8)
labelimg = cv2.imdecode(nparr, 1)
# width, height为图片原始宽、高
# 画api返回的灰度图
ori_img = cv2.imread('E:/MasterProject/毕业论文/论文2.0/视频截图/投影完整/MB_4_151.jpg')
height = ori_img.shape[0]
width = ori_img.shape[1]
labelimg = cv2.resize(labelimg, (width, height), interpolation=cv2.INTER_NEAREST)
im_new = np.where(labelimg==1, 255, labelimg)
cv2.imshow('new', im_new)
cv2.waitKey(0)
# cv2.imwrite('new_yolo/dbor4_gray.jpg', im_new)

# 画原图的人体轮廓
contours, hierarchy = cv2.findContours(cv2.cvtColor(im_new, cv2.COLOR_BGR2GRAY),
                                       cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
cv2.drawContours(ori_img, contours, -1, (0, 0, 255), 10)
cv2.imshow('img2', ori_img)
cv2.waitKey(0)
cv2.imwrite('E:/MasterProject/毕业论文/论文2.0/视频截图/投影完整/MB_4_151_contours.jpg', ori_img)

area = 0
print(len(contours[0]))
for i in contours:
    print(i)
    area += cv2.contourArea(i)
print(area)
print(width, height)
print(width * height)
print(area / (width * height))
print(1 - area / (width * height))

# img = cv2.imread('3_new.png', cv2.CV_8UC1)
# ori_img = cv2.imread('3.png')
# print(img.shape[0], img.shape[1])
# cv2.imshow('img', img)
# cv2.waitKey(0)
# contours, hierarchy = cv2.findContours(img, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
# print(contours)
# print(hierarchy)
# cv2.drawContours(ori_img, contours, -1, (0, 0, 255), 3)
# cv2.imshow('img2', ori_img)
# cv2.waitKey(0)

# mat_img = cv2.imread('3.png', cv2.CV_8UC1)
# cv2.imshow('m', mat_img)
# cv2.waitKey(0)
# dst = cv2.adaptiveThreshold(mat_img, 210, cv2.BORDER_REPLICATE, cv2.THRESH_BINARY_INV, 3, 10)
# cv2.imshow('m', dst)
# cv2.waitKey(0)
# contours, hierarchy = cv2.findContours(dst, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
# print(contours)
# print(hierarchy)
# cv2.drawContours(mat_img, contours, -1, (111, 111, 111), 3)
# cv2.imshow('m2', mat_img)
# cv2.waitKey(0)
