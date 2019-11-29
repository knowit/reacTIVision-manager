from flask import render_template, Blueprint
views_blueprint = Blueprint('views',__name__)

@views_blueprint.route('/')
@views_blueprint.route('/home')
def index():
	return render_template("views/base.html", component="Home")
