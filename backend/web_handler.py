from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource

from db_handler import get_all_recipes

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/": {"origins": "*"}})


class RecipeRes(Resource):
    def get(self):
        """
        Get all the recipes.
        :return: the recipes
        """
        recipes = get_all_recipes()
        return recipes


api.add_resource(RecipeRes, "/recipe")


def host():
    print(" ========== Backend Listening on 0.0.0.0 ========== ")
    app.run(host="0.0.0.0")