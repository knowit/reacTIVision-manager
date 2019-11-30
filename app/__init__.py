from flask import Flask
import pkgutil
import importlib
import app.blueprints as blueprints

app = Flask(__name__,
 	static_folder = './public',
 	template_folder="./static")


for _, modname, _ in pkgutil.iter_modules(blueprints.__path__):
	m = importlib.import_module(f'app.blueprints.{modname}')
	app.register_blueprint(m.blueprint, url_prefix=m.base_url if 'base_url' in vars(m) else None)
