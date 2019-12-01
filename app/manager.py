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


def get_camera_settings_path(xml, config):
    camera_tags = xml.getElementsByTagName('camera')
    camera_settings_path = camera_tags[0].getAttribute('config') if camera_tags.length > 0 else 'default'
    return camera_settings_path if camera_settings_path != 'default' else config['DEFAULT_CAMERA_SETTINGS_PATH']


def load_settings(config):
    xml = parse(config['SETTINGS_PATH'])

    camera_xml = parse(get_camera_settings_path(xml, config))
    # TODO: camera settings

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


def save_settings(config, fiducial=None, connections=None, camera=None):
    xml = parse(config['SETTINGS_PATH'])
    root = xml.getElementsByTagName('reactivision')[0]

    if fiducial:
        fiducial_elm = xml.getElementsByTagName('fiducial')
        fiducial_elm = fiducial_elm[0] if fiducial_elm.length > 0 else None
        if not fiducial_elm:
            fiducial_elm = xml.createElement('fiducial')
            root.appendChild(fiducial_elm)
        
        if 'amoeba' in fiducial:
            fiducial_elm.setAttribute('amoeba', fiducial['amoeba'])
        if 'mirror'  in fiducial:
            fiducial_elm.setAttribute('mirror', str(fiducial['mirror']).lower())
        if 'yamaarashi'  in fiducial:
            fiducial_elm.setAttribute('yamaarashi', str(fiducial['yamaarashi']).lower())

    if connections:
        tuio_tags = xml.getElementsByTagName('tuio')
        for tag in tuio_tags:
            root.removeChild(tag)
        
        for connection in connections:
            new_tag = xml.createElement('tuio')

            if 'protocol' in connection:
                new_tag.setAttribute('type', connection['protocol'])
            if 'host' in connection:
                new_tag.setAttribute('host', connection['host'])
            if 'port' in connection:
                new_tag.setAttribute('port', str(connection['port']))

            root.appendChild(new_tag)

    with open(config['SETTINGS_PATH'], 'w') as xmlFile:
        xml.writexml(xmlFile)

    # TODO: camera settings

    return True


