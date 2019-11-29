from flask import render_template, Blueprint
views_blueprint = Blueprint('views',__name__)

@views_blueprint.route('/')
@views_blueprint.route('/home')
def index():
	return render_template("views/base.html", component="Home")


@views_blueprint.route('/calibrate')
def calibrate():
	return render_template("views/base.html", component="Calibrate")
