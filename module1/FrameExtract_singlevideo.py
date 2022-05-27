import cv2
import os
import shutil


# video_capture = cv2.VideoCapture("/example_video/test1.mp4")
def get_frame_from_video(video_name, interval, out_dir, course_name):
    """
    Args:
        video_name:输入视频名字（路径）
        interval: 保存图片的帧率间隔
    Returns:
    """

    name = video_name.split('/')[-1][:video_name.split('/')[-1].rfind(".")]
    print(name)
    # 保存图片的路径,若是路径不存在，则创建文件夹
    save_path = f'{out_dir}{course_name}_{name}/'
    # save_path = video_name.split('.mp4')[0] + '/'
    print(save_path)
    is_exists = os.path.exists(save_path)
    if not is_exists:
        os.makedirs(save_path)
        print('path of %s is build' % save_path)
    else:
        shutil.rmtree(save_path)    # 删除该目录已有所有文件
        os.makedirs(save_path)
        print('path of %s already exist and rebuild' % save_path)

    # 开始读视频
    video_capture = cv2.VideoCapture(video_name)
    i = 0
    j = 0

    while True:
        success, frame = video_capture.read()
        i += 1
        if i % interval == 0:
            # 保存图片
            j += 1
            # save_name = save_path + video_name.split('\\')[-1].split('.mp4')[0] + '_' + str(j) + '.jpg'
            save_name = f'{save_path}{course_name}_{j}.jpg'
            cv2.imwrite(save_name, frame)
            print('image of %s is saved' % save_name)
        if not success:
            print('video is all read')
            break


if __name__ == '__main__':
    interval = 30
    file_path = f'./Chinese_joint/12.mp4'
    get_frame_from_video(file_path, interval, "./frames/", 'Chinese')

