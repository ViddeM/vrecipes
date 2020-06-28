# Handles most communication with the database
from pony.orm import db_session, select

from db import Recipe
from response_with_data import HttpResponse, get_with_data, get_with_error


@db_session
def get_recipes_basic() -> HttpResponse:
    """
    Get all the basic information for all recipes
    :return: the basic information about every recipe
    """
    recipes = select(recipe for recipe in Recipe)
    recipes_list = []
    for recipe in recipes:
        new_recipe = {"id": str(recipe.id), "name": recipe.name, "author": "Ej implementerat"}
        recipes_list.append(new_recipe)

    return get_with_data({"recipes": recipes_list})


@db_session
def get_recipe(recipe_id : str) -> HttpResponse:
    """
    Get all information for the specified recipe
    :param recipe_id: the id of the recipe to return
    :return: all the information about the given recipe
    """
    recipe = Recipe.get(id=recipe_id)
    if recipe is None:
        return get_with_error(404, "Recipe not found")

    recipe_json = {
        "id": str(recipe.id),
        "name": str(recipe.name),
        "description": str(recipe.description),
        "ovenTemp": recipe.oven_temp,
        "estimatedTime": recipe.estimated_time,
        "steps": [],
        "ingredients": []
    }
    return get_with_data(recipe_json)