from flask import render_template, Blueprint
from flask import current_app as app
api_blueprint = Blueprint('api',__name__)

@api_blueprint.route('/settings')
def settings():
	return str(app.config['DEBUG'])