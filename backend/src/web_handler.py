from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource

from arch.process.EditRecipeRes import edit_recipe
from arch.process.ImageUploadProcess import handle_uploaded_images
from arch.process.NewRecipeProcess import new_recipe
from arch.query.RecipeQueries import get_recipes_basic, get_recipe

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
    def get(self, unique_recipe_name: str):
        """
        Get more detailed info for a specific recipe
        :param unique_recipe_name: The unique name of the recipe
        :return: detailed info for a specific recipe
        """
        return get_recipe(unique_recipe_name).get_response()


class NewRecipeRes(Resource):
    def post(self):
        """
        Post a new recipe
        :return: the unique name for the new recipe
        """
        json = request.json
        return new_recipe(json).get_response()


class EditRecipeRes(Resource):
    def post(self, id: str):
        """
        Edit an existing recipe
        :return: the unique name for the recipe.
        """
        json = request.json
        return edit_recipe(id, json).get_response()


class ImageUploadRes(Resource):
    def put(self):
        """
        Upload an image
        :return: The url and id for the image.
        """
        return handle_uploaded_images(request.files).get_response()


api.add_resource(RecipesRes, "/api/recipes")
api.add_resource(NewRecipeRes, "/api/recipe/create")
api.add_resource(EditRecipeRes, "/api/recipe/edit/<string:id>")
api.add_resource(RecipeRes, "/api/recipe/details/<string:unique_recipe_name>")
api.add_resource(ImageUploadRes, "/api/recipe/image/upload")


def host():
    print(" ========== Backend Listening on 0.0.0.0 ========== ")
    app.run(host="0.0.0.0")
