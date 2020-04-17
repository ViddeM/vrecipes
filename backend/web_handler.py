from flask import Flask
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/": {"origins": "*"}})