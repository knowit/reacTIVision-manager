from flask import render_template, Blueprint
blueprint = Blueprint('views',__name__)

@blueprint.route('/')
@blueprint.route('/home')
def index():
	return render_template("views/base.html", 
		component="Home", title="ReacTIVision - Home")


@blueprint.route('/calibrate')
def calibrate():
	return render_template("views/base.html", 
		component="Calibrate", title="ReacTIVision - Calibrate")
