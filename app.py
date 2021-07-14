from flask import Flask
from flask_cors import CORS 
from flask_pymongo import PyMongo
import config
from flask_restful import Api
import os

app = Flask(__name__, static_url_path='', static_folder='src')
app.secret_key = 'reactFlaskMongo'
app.config['MONGO_URI'] = config.con
app.config["UPLOAD_FOLDER"] = os.path.realpath('.') + '/src/component/uploads'
app.config["MAX_CONTENT_PATH"] = 20000000

#set
CORS(app)
api = Api(app)

#db
mongo = PyMongo(app)
mongo.init_app(app)
db = mongo.db.test
tw = mongo.db.tweet


