from paddleocr import PaddleOCR, draw_ocr
from PIL import Image

def do_ocr(img_path, save_path):
    """
    参考文档：https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.4/doc/doc_ch/quickstart.md
    """
    # Paddleocr目前支持的多语言语种可以通过修改lang参数进行切换
    # 例如`ch`, `en`, `fr`, `german`, `korean`, `japan`
    ocr = PaddleOCR(use_angle_cls=True, lang="ch")  # need to run only once to download and load model into memory
    result = ocr.ocr(img_path, cls=True)
    for line in result:
        print(line)

    result = result[1:]

    # 显示结果
    image = Image.open(img_path).convert('RGB')
    boxes = [line[0] for line in result]
    txts = [line[1][0] for line in result]
    scores = [line[1][1] for line in result]
    im_show = draw_ocr(image, boxes, txts, scores, font_path='./fonts/simsun.ttc')
    im_show = Image.fromarray(im_show)
    im_show.save(save_path)


do_ocr('ocr/info.jpg', './ocr/ocr_info.jpg')
#
#
# def ocr_only_rec(img):
#     ocr = PaddleOCR()
#     res = ocr.ocr(img, det=False)
#
#     return res


# import os
# import cv2
# from paddleocr import PPStructure, draw_structure_result, save_structure_res
#
# table_engine = PPStructure(show_log=True)
#
# save_folder = './output/'
# img_path = 'scan_6.png'
# img = cv2.imread(img_path)
# result = table_engine(img)
# print(result)
# save_structure_res(result, save_folder, os.path.basename(img_path).split('.')[0])
#
# for line in result:
#     line.pop('img')
#     print(line)
#
# # result = [{'type': 'Figure', 'bbox': [0, 8, 1071, 737], 'res': (
# # [[814.0, 67.0, 956.0, 67.0, 956.0, 90.0, 814.0, 90.0], [83.0, 139.0, 399.0, 141.0, 399.0, 176.0, 82.0, 173.0],
# #  [90.0, 211.0, 184.0, 211.0, 184.0, 239.0, 90.0, 239.0], [148.0, 252.0, 744.0, 253.0, 744.0, 279.0, 148.0, 278.0],
# #  [149.0, 295.0, 587.0, 295.0, 587.0, 318.0, 149.0, 318.0], [148.0, 334.0, 681.0, 335.0, 680.0, 359.0, 148.0, 358.0],
# #  [149.0, 376.0, 722.0, 376.0, 722.0, 399.0, 149.0, 399.0], [149.0, 416.0, 869.0, 416.0, 869.0, 439.0, 149.0, 439.0],
# #  [373.0, 456.0, 558.0, 456.0, 558.0, 480.0, 373.0, 480.0], [146.0, 496.0, 618.0, 493.0, 618.0, 519.0, 146.0, 522.0],
# #  [70.0, 572.0, 149.0, 572.0, 149.0, 588.0, 70.0, 588.0], [856.0, 570.0, 948.0, 570.0, 948.0, 586.0, 856.0, 586.0],
# #  [477.0, 625.0, 531.0, 625.0, 531.0, 642.0, 477.0, 642.0]],
# # [('英中年范大学', 0.5894844), ('文件系统阶段（续）', 0.9869307), ('特点', 0.9986489), ('激据的管理者：文件系统，激据可长期保存', 0.8710847),
# #  ('数据面向的对象：某一应用程序', 0.9342157), ('激据的共掌程度：共拿性差、余度大', 0.85992676), ('数据的结构化：记录内有结构，整体无结构', 0.94620705),
# #  ('数据的独立性：独立性差，数据的逻辑结构改变必须', 0.952852), ('修改应用程厅', 0.8848281), ('数据控制能力：应用程序自己控制', 0.9455567), ('2017/2/20', 0.7631025),
# #  ('武强年原理', 0.505407), ('SOGWO', 0.63643783)])}]
#
# from PIL import Image
#
# font_path = './fonts/simsun.ttc'  # PaddleOCR下提供字体包
# image = Image.open(img_path).convert('RGB')
# im_show = draw_structure_result(image, result, font_path=font_path)
# im_show = Image.fromarray(im_show)
# im_show.save('scan6_stru.jpg')

# im_cut = im_show.crop((15, 66, 486, 107))
# im_cut.save('result2_cut.png')
#
# print(ocr_only_rec('result2_cut.png'))
# print(ocr_only_rec('sift1.png'))


# def stru(img, model):
#     image = cv2.imread(img)
#     image = image[..., ::-1]
#     # 检测
#     layout = model.detect(image)
#
#     # 显示结果
#     name = img.split(".")[0]
#     show_img = lp.draw_box(image, layout, box_width=3, show_element_type=True)
#     show_img.save(f"{name}_structure.png")
#
#
# import cv2
# import layoutparser as lp
# import numpy as np
#
# """
# 文档参考: https://github.com/PaddlePaddle/PaddleOCR/blob/release/2.4/ppstructure/layout/README_ch.md
# """
# image = cv2.imread("sift/dbor_4.jpg")
# image = image[..., ::-1]
#
# # 加载模型
# model = lp.PaddleDetectionLayoutModel(config_path="lp://PubLayNet/ppyolov2_r50vd_dcn_365e_publaynet/config",
#                                       threshold=0.1,
#                                       label_map={0: "Text", 1: "Title", 2: "List", 3: "Table", 4: "Figure"},
#                                       enforce_cpu=False,
#                                       enable_mkldnn=True)
# # 检测
# layout = model.detect(image)
#
# # 显示结果
# show_img = lp.draw_box(image, layout, box_width=3, show_element_type=True)
# show_img.save("dbor_4_structure.jpg")
# # img = cv2.cvtColor(np.asarray(show_img), cv2.COLOR_RGB2BGR)
# # cv2.imwrite("cv2_stru.png", img)
# print(layout)
#
# # # stru("scan_1.png", model)
# # # stru("scan_2.png", model)
# # # stru("scan_3.png", model)
# # # stru("scan_4.png", model)
# # # stru("scan_5.png", model)
# # # stru("scan_6.png", model)
# # # stru("scan_7.png", model)
# # stru("test1.png", model)
