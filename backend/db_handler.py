# Handles most communication with the database
from pony.orm import db_session, select

from db import Recipe, RecipeImage, RecipeIngredient, RecipeStep


@db_session
def get_all_recipes():
    recipes = select(recipe for recipe in Recipe)
    recipe_json = {}
    for recipe in recipes:
        recipe_id = str(recipe.id)
        image_ids = get_images_for_recipe(recipe_id)
        ingredients = get_ingredients_for_recipe(recipe_id)
        steps = get_steps_for_recipe(recipe_id)

        recipe_json[recipe_id] = {
            "id": recipe_id,
            "name": recipe.name,
            "description": recipe.description,
            "image_ids": image_ids,
            "ingredients": ingredients,
            "steps": steps
        }

    return recipe_json


@db_session
def get_images_for_recipe(recipe_id):
    image_ids_q = select(
        str(recipe_image.image.id) for recipe_image in RecipeImage if (str(recipe_image.recipe) == recipe_id))
    image_ids = []
    for id in image_ids_q:
        image_ids.append(str(id))

    return image_ids


@db_session
def get_ingredients_for_recipe(recipe_id):
    rec_ingreds_q = RecipeIngredient.select(lambda rec_ing: str(rec_ing.recipe.id) == recipe_id)
    ingredients = []
    for rec_ingred in rec_ingreds_q:
        ingredients.append({
            "name": rec_ingred.ingredient.name,
            "amount": rec_ingred.amount
        })

    return ingredients


@db_session
def get_steps_for_recipe(recipe_id):
    recipe_steps_q = RecipeStep.select(lambda rs: str(rs.recipe.id) == recipe_id)
    steps_dict = {}
    for recipe_step in recipe_steps_q:
        steps_dict[recipe_step.step] = {
            "step_number": recipe_step.number,
            "text": recipe_step.step
        }

    return steps_dict