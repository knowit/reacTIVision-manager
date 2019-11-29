from flask import render_template, Blueprint
api_blueprint = Blueprint('views',__name__)

@api_blueprint.route('/api/test')
def test():
	return ""