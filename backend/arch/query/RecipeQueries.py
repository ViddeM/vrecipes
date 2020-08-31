from typing import List, Optional

from pony.orm import db_session, select

from arch.query.ImageQueries import get_main_image_url, get_images_for_recipe
from db import Recipe, RecipeIngredient, RecipeStep, Ingredient, Unit
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
def get_same_name_unique_names(unique_name: str) -> List[str]:
    """
    Returns a list of all the unique recipe names that starts with the same unique_name as the given string.
    :return: a list of unique_name strings.
    """
    return list(select(res.name for res in Recipe if res.unique_name.startswith(unique_name)))


@db_session
def find_ingredient(name: str) -> Optional[Ingredient]:
    return Ingredient.get(name=name)


@db_session
def find_unit(name: str) -> Optional[Unit]:
    return Unit.get(name=name)