from flask import render_template, Blueprint
from flask import current_app as app
import xml.dom.minidom
from xml.dom.minidom import parse
api_blueprint = Blueprint('api',__name__)


class Settings:
	def __init__(self, xml):
		self.xml = xml

	@property
	def host(self):
		tag = self.xml.getElementsByTagName("tuio")[0]
		return tag.getAttribute("host")


def load_settings():
	settings_path = app.config['SETTINGS_PATH']
	return Settings(parse(settings_path))


@api_blueprint.route('/settings')
def settings():
	react_settings = load_settings()
	return react_settings.host