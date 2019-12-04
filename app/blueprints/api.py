from flask import render_template, Blueprint, request
from flask import current_app as app
from dataclasses import asdict
import app.manager as manager
import os

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


@blueprint.route('/calibration', methods=['GET'])
def get_calibrations():
	def aslabel(x):
		return x.split('.')[0].capitalize()

	def ensureDefault(l):
		if not next((x for x in l if x['file'] == 'default.grid'), None):
			return l + [{ 'file': 'default.grid' }]
		return l

	return {
		'calibrations': [
			{ 'label': aslabel(x['file']), 'value': x['file'] } 
			for x in ensureDefault(manager.list_calibration_files(app.config))
		] 
	}


@blueprint.route('/calibration/<name>', methods=['GET'])
def get_calibration(name):
	calibration_data = manager.load_calibration(name, app.config)
	if not calibration_data: 
		return { 'calibration': None }

	return {
		'calibration': [
			[int(y.strip()) for y in x.rstrip().lstrip().split(' ')] 
			for x in calibration_data.split('\n')
		]
	}


@blueprint.route('/calibration/<name>', methods=['POST'])
def post_calibration(name):
	payload = request.json
	calibration_data = payload['calibration'] if 'calibration' in payload else None
	if not calibration_data: 
		return { 'saved': False }

	def writer():
		for point in calibration_data:
			yield str.join([str(x) for x in point], ' ')

	return { 
		'saved': manager.save_calibration(name, writer, app.config) 
	}
	