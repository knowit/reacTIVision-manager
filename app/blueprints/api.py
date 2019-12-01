from flask import render_template, Blueprint, request
from flask import current_app as app
from dataclasses import asdict
import app.manager as manager

blueprint = Blueprint('api',__name__)
base_url = '/api'

@blueprint.route('/settings', methods=['GET'])
def get_settings():
	react_settings = manager.load_settings(app.config)
	return asdict(react_settings)


@blueprint.route('/settings', methods=['POST'])
def post_settings():	
	payload = request.json
	return {
		'saved': manager.save_settings(
			app.config, 
			fiducial=payload['fiducial'] if 'fiducial' in payload else None,
			connections=payload['connections'] if 'connections' in payload else None,
			camera=payload['camera'] if 'camera' in payload else None)
	}


@blueprint.route('/server/start')
def start_server():
	return {
		'running': 	manager.start_server(app.config)
	}


@blueprint.route('/server/stop')
def stop_server():
	return {
		'running': 	manager.stop_server()
	}


@blueprint.route('/server/status')
def status():
	return {
		'running': manager.is_running()
	}