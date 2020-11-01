from uuid import UUID

from pony.orm import db_session

from db import Ingredient, RecipeIngredient


@db_session
def insert_recipe_ingredient(ingredient: Ingredient, unit: str, amount: float, recipe_id: UUID):
    """
    Create a new RecipeIngredient
    :return: the new RecipeIngredient
    """
    return RecipeIngredient(ingredient=ingredient, unit=unit, amount=amount, recipe=recipe_id)
