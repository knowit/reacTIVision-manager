from dataclasses import dataclass
from enum import Enum
from typing import List

class Protocols(str, Enum):
    TCP = 'tcp'
    UDP = 'udp'
    WEB = 'web'
    FLASH = 'flc'


class Amoeba(str, Enum):
    DEFAULT = 'default'
    SMALL = 'small'
    MINI = 'mini'


@dataclass
class Connection:
    protocol: Protocols = Protocols.UDP
    host: str = '127.0.0.1'
    port: str = '3333'


@dataclass
class CameraSettings:
    pass


@dataclass
class FiducialSettings:
    amoeba: Amoeba = Amoeba.DEFAULT
    yamaarashi: bool = False
    mirror: bool = False


@dataclass
class ReactSettings:
    connections: List[Connection]
    camera: CameraSettings
    fiducial: FiducialSettings
