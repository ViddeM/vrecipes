# Handles most communication with the database
from pony.orm import db_session, select

from db import Recipe, RecipeIngredient, RecipeStep
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

    ingredients = list(RecipeIngredient.select(lambda ing: str(ing.recipe.id) == recipe_id))
    ingredients_json = []
    for ingredient in ingredients:
        ingredients_json.append({
            "name": ingredient.ingredient.name,
            "unit": ingredient.unit.name,
            "amount": ingredient.amount
        })

    steps = list(RecipeStep.select(lambda step: str(step.recipe.id) == recipe_id))
    steps_json = []
    for step in steps:
        steps_json.append({
            "number": step.number,
            "description": step.step
        })

    recipe_json = {
        "id": str(recipe.id),
        "name": str(recipe.name),
        "description": str(recipe.description),
        "ovenTemperature": recipe.oven_temp,
        "estimatedTime": recipe.estimated_time,
        "steps": steps_json,
        "ingredients": ingredients_json
    }
    return get_with_data(recipe_json)


@db_session
def create_new_recipe(name: str, description: str = "", oven_temp: int = -1, estimated_time: int = -1) -> Recipe:
    """
    Create a new recipe.
    :return: the new recipe
    """
    id = generate_name_id(name)
    return Recipe(name=name, unique_name=id, description=description, oven_temp=oven_temp, estimated_time=estimated_time)


@db_session
def generate_name_id(name: str) -> str:
    """
    Takes the name of a recipe and generates a unique name that can be used for identification.
    :param name: the recipe name
    :return: the identifying name
    """
    id = name.lower().replace(" ", "_")

    same_name_recipes = Recipe.select(lambda res: res.unique_name.startswith(id))
    colliding_name_count = -1

    for recipe in same_name_recipes:
        sub = recipe[len(id):]
        if sub.isnumeric():
            colliding_name_count += 1

    unique_name = id
    if colliding_name_count >= 0:
        unique_name = id + "_" + str(colliding_name_count)

    return unique_name