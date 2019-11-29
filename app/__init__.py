from flask import Flask
app = Flask(__name__,
 	static_folder = './public',
 	template_folder="./static")

from app.views import views_blueprint
app.register_blueprint(views_blueprint)

from app.api import api_blueprint
app.register_blueprint(views_blueprint)
