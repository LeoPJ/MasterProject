import cv2
import numpy as np


def locate_board(img):
    area = img.shape[0] * img.shape[1]
    lower_green = np.array([60, 25, 25])
    upper_green = np.array([90, 127, 153])

    # custom
    # lower_green = np.array([90, 100, 40])
    # upper_green = np.array([110, 200, 100])

    # xsize, ysize, channel = img.shape
    # 调整图片大小
    frame = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    cv2.imshow("frame", frame)
    cv2.waitKey(0)

    mask_green = cv2.inRange(frame, lower_green, upper_green)
    cv2.imshow('mask', mask_green)
    cv2.waitKey(0)
    cv2.imwrite('mask_20.jpg', mask_green)

    # mask_green1 = cv2.inRange(frame, lower_green1, upper_green1)
    # res_green = cv2.bitwise_and(frame, frame, mask=mask_green)
    # res_green = cv2.cvtColor(res_green, cv2.COLOR_HSV2BGR)
    # cv2.imshow("mask_blue", mask_green)
    # cv2.imshow("res_blue", res_green)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    contours, hierarchy = cv2.findContours(mask_green, cv2.RETR_TREE,
                                           cv2.CHAIN_APPROX_NONE)

    boardArea = 0
    boardCnt = []
    for cnt in contours:

        if 0.5 * area > cv2.contourArea(cnt) > boardArea:
            boardArea = cv2.contourArea(cnt)
            boardCnt = cnt
    cnt = boardCnt
    # res = cv2.drawContours(img, cnt, -1, (0, 0, 255), 5)
    # cv2.imshow('cnt', res)
    # cv2.waitKey(0)
    # cv2.imwrite('cnt_2.jpg', res)

    rect = cv2.boundingRect(cnt)

    return rect


img = cv2.imread('20.jpg')
board_rect = locate_board(img)

x, y, w, h = board_rect

crop = img[y:(y + h), x:(x+w)]
cv2.imshow('detect', crop)
cv2.waitKey(0)
cv2.imwrite('crop_20.jpg', crop)

cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), thickness=5)
cv2.imshow('detect', img)
cv2.waitKey(0)
cv2.imwrite('img_detect_20.jpg', img)
