from typing import Union
from uuid import UUID

from pony.orm import db_session, delete

from arch.json_objects.RecipeIngredientJson import RecipeIngredientJson
from db import Ingredient, RecipeIngredient


@db_session
def insert_recipe_ingredient(ingredient: Union[Ingredient, str], unit: str, amount: float, recipe_id: UUID):
    """
    Create a new RecipeIngredient
    :return: the new RecipeIngredient
    """
    return RecipeIngredient(ingredient=ingredient, unit=unit, amount=amount, recipe=recipe_id)


@db_session
def update_recipe_ingredient(ingredient_json: RecipeIngredientJson, recipe_id: UUID):
    rec_ing = RecipeIngredient.get(recipe=recipe_id, ingredient=ingredient_json.name)
    rec_ing.unit = ingredient_json.unit
    rec_ing.amount = ingredient_json.amount


@db_session
def delete_recipe_ingredient(recipe_id: UUID, ingredient: str):
    rec_ing = RecipeIngredient.get(recipe=recipe_id, ingredient=ingredient)
    delete(rec_ing)
