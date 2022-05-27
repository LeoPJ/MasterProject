import cv2

img = cv2.imread("ocr_dbor_4.jpg")
cv2.imshow("img", img)
cv2.waitKey(0)

title_box = [[82.0, 139.0], [400.0, 142.0], [400.0, 176.0], [81.0, 174.0]]

drawed = cv2.line(img, (41, 70), (200, 71), (0, 255 ,255), 5)
cv2.imshow("img", drawed)
cv2.waitKey(0)