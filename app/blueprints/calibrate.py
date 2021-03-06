from flask import Blueprint, Response, request
from app.camera import get_camera, get_frame
blueprint = Blueprint('calibrate',__name__)


# TODO web socket / socket.io
@blueprint.route('/stream')
def video_stream():
    width = request.args.get('width', default=640, type=int)
    height = request.args.get('height', default=480, type=int)
    def next_frame(camera):
        while True:
            frame = get_frame(camera)
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(next_frame(get_camera(width, height)),
                mimetype='multipart/x-mixed-replace; boundary=frame')