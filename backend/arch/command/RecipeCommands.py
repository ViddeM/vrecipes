import uuid

from pony.orm import db_session

from db import Recipe, Ingredient, RecipeIngredient, Unit, RecipeStep


@db_session
def insert_new_recipe(name: str, unique_name: str, description: str = "", oven_temp: int = -1, estimated_time: int = -1) -> Recipe:
    """
    Create a new recipe.
    :return: the new recipe
    """
    return Recipe(name=name, unique_name=unique_name, description=description, oven_temp=oven_temp,
                  estimated_time=estimated_time)


@db_session
def insert_recipe_ingredient(ingredient: Ingredient, unit: str, amount: float, recipe_id: uuid):
    """
    Create a new RecipeIngredient
    :return: the new RecipeIngredient
    """
    return RecipeIngredient(ingredient=ingredient, unit=unit, amount=amount, recipe=recipe_id)


@db_session
def insert_ingredient(name: str) -> Ingredient:
    """
    Create a new ingredient
    :return: the new ingredient
    """
    return Ingredient(name=name)


@db_session
def insert_unit(name: str) -> Unit:
    """
    Create a new Unit
    :return: the new Unit
    """
    return Unit(name=name)


@db_session
def insert_recipe_step(name: str, number: int, recipe_id: uuid) -> RecipeStep:
    """
    Create a new recipe step
    :return: the new step
    """
    return RecipeStep(step=name, number=number, recipe=recipe_id)