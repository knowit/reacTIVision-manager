from flask import Blueprint, Response
from app.camera import get_camera, get_frame

blueprint = Blueprint('calibrate',__name__)

# TODO web socket / socket.io
@blueprint.route('/stream')
def video_stream():
    def next_frame(camera):
        while True:
            frame = get_frame(camera)
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(next_frame(get_camera()),
                mimetype='multipart/x-mixed-replace; boundary=frame')