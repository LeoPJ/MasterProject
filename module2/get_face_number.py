import time
import base64
import requests


def get_access_token_face():
    """
    获取百度API的token
    """
    API_key = 'PHj3tqCFtVq7wrNGtCmfHz8k'
    Secret_key = 'xaSPhKQ7PDE0D2Z5764BAZZKZgFmSAGg'
    host = f'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={API_key}&client_secret={Secret_key}'
    response = requests.get(host)
    # if response:
    #     print(response.json())

    return response.json()['access_token']


def get_face(path):
    """
    人脸检测与属性分析
    百度API文档参考：https://ai.baidu.com/ai-doc/FACE/yk37c1u4t
    :param path: str 图片路径
    :return: int 人脸个数
    """
    request_url = "https://aip.baidubce.com/rest/2.0/face/v3/detect"

    # 二进制方式打开图片文件
    f = open(path, 'rb')
    img = base64.b64encode(f.read())

    params = {"image": img, "image_type": "BASE64", "max_face_num": 120}
    request_url = f'{request_url}?access_token={get_access_token_face()}'
    headers = {'content-type': 'application/json'}
    response = requests.post(request_url, data=params, headers=headers)
    if response:
        print(response.json())

    # time.sleep(0.5)  # 免费API无额度限制，但有2QPS并发限制

    return response.json()['result']['face_num']


if __name__ == "__main__":
    print(get_face("f4.png"))
