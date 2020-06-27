from uuid import UUID

from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource

from db_handler import get_recipes_basic, get_recipe

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


class RecipesRes(Resource):
    def get(self):
        """
        Get basic info for all recipes.
        :return: the basic info for all recipes
        """
        return get_recipes_basic().get_response()


class RecipeRes(Resource):
    def get(self, id: str):
        """
        Get more detailed info for a specific recipe
        :param recipe_id: The id of the recipe
        :return: detailed info for a specific recipe
        """
        return get_recipe(id).get_response()


api.add_resource(RecipesRes, "/api/recipes")
api.add_resource(RecipeRes, "/api/recipe/<string:id>")


def host():
    print(" ========== Backend Listening on 0.0.0.0 ========== ")
    app.run(host="0.0.0.0")
