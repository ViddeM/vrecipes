# Handles most communication with the database
from typing import List

from pony.orm import db_session, select

from db import Recipe, RecipeIngredient, RecipeStep, RecipeImage, Config
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
        new_recipe = {
            "id": str(recipe.id),
            "name": recipe.name,
            "author": "Ej implementerat",
            "unique_name": recipe.unique_name,
            "image_link": get_main_image_url(str(recipe.id))
        }
        recipes_list.append(new_recipe)

    return get_with_data({"recipes": recipes_list})


@db_session
def get_main_image_url(recipe_id: str) -> str:
    images = get_images_for_recipe(recipe_id)
    image = recipe_to_url("default.jpg")
    if len(images) > 0:
        image = images[0]

    return image


def recipe_to_url(name: str) -> str:
    backend = get_config("backend_base_address")
    image_path = get_config("image_base_path")
    return "{0}/{1}/{2}".format(backend, image_path, name)


@db_session
def get_images_for_recipe(recipe_id: str) -> List[str]:
    name_list = list(select(recImg.image.name for recImg in RecipeImage if str(recImg.recipe.id) == recipe_id))
    return list(map(recipe_to_url, name_list))


@db_session
def get_recipe(unique_recipe_name: str) -> HttpResponse:
    """
    Get all information for the specified recipe
    :param unique_recipe_name:
    :param recipe_id: the id of the recipe to return
    :return: all the information about the given recipe
    """
    recipe = Recipe.get(unique_name=unique_recipe_name)
    if recipe is None:
        return get_with_error(404, "Recipe not found")

    ingredients = list(RecipeIngredient.select(lambda ing: str(ing.recipe.id) == str(recipe.id)))
    ingredients_json = []
    for ingredient in ingredients:
        ingredients_json.append({
            "name": ingredient.ingredient.name,
            "unit": ingredient.unit.name,
            "amount": ingredient.amount
        })

    steps = list(RecipeStep.select(lambda step: str(step.recipe.id) == str(recipe.id)))
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
        "ingredients": ingredients_json,
        "images": get_images_for_recipe(str(recipe.id))
    }
    return get_with_data(recipe_json)


@db_session
def get_config(key):
    return Config.get(key=key).value


@db_session
def create_new_recipe(name: str, description: str = "", oven_temp: int = -1, estimated_time: int = -1) -> Recipe:
    """
    Create a new recipe.
    :return: the new recipe
    """
    id = generate_name_id(name)
    return Recipe(name=name, unique_name=id, description=description, oven_temp=oven_temp,
                  estimated_time=estimated_time)


@db_session
def generate_name_id(name: str) -> str:
    """
    Takes the name of a recipe and generates a unique name that can be used for identification.
    :param name: the recipe name
    :return: the identifying name
    """
    id = name.lower().replace(" ", "_")

    same_name_recipes = list(select(res.name for res in Recipe if res.unique_name.startswith(id)))
    colliding_name_count = -1

    if len(same_name_recipes) > 0:
        colliding_name_count = 0

    for recipe in same_name_recipes:
        sub = recipe[len(id):]
        if sub.isnumeric():
            colliding_name_count += 1

    unique_name = id
    if colliding_name_count >= 0:
        unique_name = id + "_" + str(colliding_name_count)

    return unique_name
