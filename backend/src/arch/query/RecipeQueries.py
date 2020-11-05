from typing import List, Optional
from uuid import UUID

from pony.orm import db_session, select

from arch.command.RecipeImageCommands import get_recipe_images_for_recipe
from arch.data_objects.RecipeData import RecipeData
from arch.data_objects.RecipeImageData import RecipeImageData
from arch.data_objects.RecipeIngredientData import RecipeIngredientData
from arch.data_objects.RecipeStepData import RecipeStepData
from arch.query.RecipeImageQueries import get_main_image_url, get_images_for_recipe_dict
from arch.query.RecipeIngredientQueries import get_ingredients_for_recipe
from arch.query.RecipeStepQueries import get_steps_for_recipe
from db import Recipe, RecipeIngredient, RecipeStep
from response_messages import RECIPE_NOT_FOUND
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
        return get_with_error(404, RECIPE_NOT_FOUND)

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
        "images": get_images_for_recipe_dict(str(recipe.id))
    }
    return get_with_data(recipe_json)


@db_session
def get_recipe_by_unique_name(unique_name: str) -> List[str]:
    """
    Returns the recipe with the given unique name.
    :return: a string with the unique name or None if none exists.
    """
    return Recipe.get(unique_name=unique_name)


@db_session
def recipe_with_id_exists(id: UUID) -> bool:
    return Recipe.get(id=id) is not None


@db_session
def get_recipe_data_by_id(id: UUID) -> Optional[RecipeData]:
    recipe = Recipe.get(id=id)
    if recipe is None:
        return None

    ingredients: List[RecipeIngredientData] = get_ingredients_for_recipe(id)
    steps: List[RecipeStepData] = get_steps_for_recipe(id)
    images: List[RecipeImageData] = get_recipe_images_for_recipe(id)

    return RecipeData(
        id=recipe.id,
        name=recipe.name,
        unique_name=recipe.unique_name,
        description=recipe.description,
        estimated_time=recipe.estimated_time,
        oven_temp=recipe.oven_temp,
        ingredients=ingredients,
        steps=steps,
        images=images
    )
