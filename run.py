from app import app
from werkzeug.utils import import_string

#Load this config object for development mode
app.config.from_object(import_string('configurations.DevelopmentConfig')())
app.run()
