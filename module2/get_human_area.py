import cv2
import base64
import numpy as np
import requests


def get_access_token_body():
    """
    获取百度API的token
    """
    API_key = 'BY91u1yqikMYxsr09w9hdyk9'
    Secret_key = 'GbSaY6sBQPXxTMahd3V7VzDDmEkubD0Z'
    host = f'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_key}&client_secret={Secret_key}'
    response = requests.get(host)
    # if response:
    #     print(response.json())

    return response.json()['access_token']


def get_contours_area(path):
    """
    :param path: str 图片路径
    :return: float 人像面积
    """
    img = human_split(path)
    contours, hierarchy = cv2.findContours(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY),
                                           cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

    area = 0
    for i in contours:
        area += cv2.contourArea(i)

    return area


def human_split(path):
    """
    人像分割
    调取API参考文档：https://ai.baidu.com/ai-doc/BODY/Fk3cpyxua
    :param path: str 图片路径
    :return: 标出人像轮廓的新图片
    """
    request_url = "https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg"
    # 二进制方式打开图片文件
    f = open(path, 'rb')
    img = base64.b64encode(f.read())

    params = {"image": img}
    request_url = f'{request_url}?access_token={get_access_token_body()}'
    headers = {'content-type': 'application/x-www-form-urlencoded'}
    response = requests.post(request_url, data=params, headers=headers)
    # if response:
    #     print(response.json())

    # 转码得到人像分割二值化图像
    labelmap = base64.b64decode(response.json()['labelmap'])
    nparr = np.frombuffer(labelmap, np.uint8)
    labelimg = cv2.imdecode(nparr, 1)
    ori_img = cv2.imread(path)  # width, height为图片原始宽、高
    height = ori_img.shape[0]
    width = ori_img.shape[1]
    labelimg = cv2.resize(labelimg, (width, height), interpolation=cv2.INTER_NEAREST)
    im_new = np.where(labelimg == 1, 255, labelimg)

    # 画api返回的灰度图
    # cv2.imshow('new', im_new)
    # cv2.waitKey(0)
    # cv2.imwrite('human/dbor4_human_gray.jpg', im_new)

    # 画原图的人体轮廓
    contours, hierarchy = cv2.findContours(cv2.cvtColor(im_new, cv2.COLOR_BGR2GRAY),
                                           cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    cv2.drawContours(ori_img, contours, -1, (0, 0, 255), 10)
    # cv2.imshow('img2', ori_img)
    # cv2.waitKey(0)
    # cv2.imwrite('human/23_2523_contours.jpg', ori_img)

    return im_new


# if __name__ == "__main__":
#     Area = get_contours_area('3.png')
#     print(Area)
