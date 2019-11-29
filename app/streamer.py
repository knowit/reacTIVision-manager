from flask import Blueprint, Response
import cv2
import io
import time
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


streamer_blueprint = Blueprint('streamer',__name__)
@streamer_blueprint.route('/stream')
def video_stream():
    def next_frame(camera):
        while True:
            frame = get_frame(camera)
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(next_frame(get_camera()),
                mimetype='multipart/x-mixed-replace; boundary=frame')