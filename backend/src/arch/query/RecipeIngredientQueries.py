from typing import List
from uuid import UUID

from pony.orm import db_session, select

from arch.data_objects.IngredientData import IngredientData
from arch.data_objects.RecipeIngredientData import RecipeIngredientData
from arch.data_objects.UnitData import UnitData
from db import RecipeIngredient


@db_session
def get_ingredients_for_recipe(recipe_id: UUID) -> List[RecipeIngredientData]:
    ingredients = list(select(ing for ing in RecipeIngredient if ing.recipe.id == recipe_id))
    ingredient_datas: List[RecipeIngredientData]
    for ingredient in ingredients:
        ingredient_datas.append(RecipeIngredientData(
            ingredient=IngredientData(
                name=ingredient.ingredient.name
            ),
            unit=UnitData(
                name=ingredient.unit.name
            ),
            amount=ingredient.amount
        ))

    return ingredient_datas
