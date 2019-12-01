import cv2
import io
from PIL import Image

def get_camera(width, height):
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FPS, 30)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, width)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
    cam.set(cv2.CAP_PROP_AUTO_EXPOSURE, 1)
    cam.set(cv2.CAP_PROP_AUTOFOCUS, 1)
    cam.set(cv2.CAP_PROP_AUTO_WB, 1)
    return cam


def get_frame(camera):
    if not camera.isOpened():
            return ''

    ret, frame = camera.read()
    image = Image.fromarray(frame)
    buf = io.BytesIO()
    image.save(buf, 'JPEG')

    return buf.getvalue()