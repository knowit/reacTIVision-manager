import xml.dom.minidom
from xml.dom.minidom import parse
import psutil
from subprocess import signal
from app.models import ReactSettings, CameraSettings, Amoeba, Connection, FiducialSettings


def start_server(config):
    if is_running():
        return True

    exe = config['REACTIVISION_EXE']
    proc = psutil.Popen([exe, '-n'], 
        cwd=config['REACTIVISION_PATH'])

    with open('.pid', 'w') as f:
        f.write(str(proc.pid))
        
    return proc.is_running()


def stop_server():
    if not is_running():
        return False

    with open('.pid', 'r') as f:
        pid = int(f.read())
        proc = psutil.Process(pid)
        proc.send_signal(signal.SIGTERM)
        proc.wait()
        return proc.is_running()


def is_running():
    try:
        with open('.pid', 'r') as f:
            pid = int(f.read())
            return psutil.pid_exists(pid)
    except FileNotFoundError:
        return False


def load_settings(config):
    xml = parse(config['SETTINGS_PATH'])

    camera_tags = xml.getElementsByTagName('camera')
    camera_settings_path = camera_tags[0].getAttribute('config') if camera_tags.length > 0 else 'default'
    camera_settings_path = camera_settings_path if camera_settings_path != 'default' else config['DEFAULT_CAMERA_SETTINGS_PATH']
    
    camera_xml = parse(camera_settings_path)

    tuio_tags = xml.getElementsByTagName('tuio')
    fiducial = xml.getElementsByTagName('fiducial')
    fiducial = fiducial[0] if fiducial.length > 0 else None

    return ReactSettings(
        connections = [
            Connection(
                host=x.getAttribute('host'),
                protocol=x.getAttribute('type'),
                port=x.getAttribute('port')) 
            for x in tuio_tags if x.hasAttribute('type')],
        camera = CameraSettings(),
        fiducial = FiducialSettings(
            amoeba=fiducial.getAttribute('amoeba'),
            yamaarashi=True if fiducial.getAttribute('yamaarashi') == 'true' else False,
            mirror=True if fiducial.getAttribute('mirror') == 'true' else False
        ) if fiducial else FiducialSettings()
    )


def save_settings(settings: ReactSettings, config):
    pass
