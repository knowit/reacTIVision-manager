import cv2
import io
from PIL import Image

def get_camera():
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FPS, 30)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    return cam


def get_frame(camera):
    if not camera.isOpened():
            return ''

    ret, frame = camera.read()
    image = Image.fromarray(frame)
    buf = io.BytesIO()
    image.save(buf, 'JPEG')

    return buf.getvalue()