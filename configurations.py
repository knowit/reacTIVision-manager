import os
import sys

_reactivision_path = os.environ.get("REACTIVISION_PATH")
if not _reactivision_path:
	raise ValueError("REACTIVISION_PATH is required")

class BaseCongig(object):
	'''
	Base config class
	'''
	DEBUG = True
	TESTING = False

	REACTIVISION_PATH = _reactivision_path

	@property
	def SETTINGS_PATH(self):
		return os.path.join(_reactivision_path, 'reacTIVision.xml')
	
	@property
	def DEFAULT_CAMERA_SETTINGS_PATH(self):
		return os.path.join(_reactivision_path, 'camera.xml')

	@property
	def REACTIVISION_EXE(self):
		return f'{os.path.join(_reactivision_path, "reacTIVision")}{".exe" if sys.platform == "win32" else ""}'

class ProductionConfig(BaseCongig):
	"""
	Production specific config
	"""
	DEBUG = False
	
class DevelopmentConfig(BaseCongig):
	"""
	Development environment specific configuration
	"""
	DEBUG = True
	TESTING = True
