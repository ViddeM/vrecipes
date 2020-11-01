from uuid import UUID

from pony.orm import db_session

from db import Recipe


@db_session
def insert_new_recipe(name: str, unique_name: str, description: str = "", oven_temp: int = -1,
                      estimated_time: int = -1) -> Recipe:
    """
    Create a new recipe.
    :return: the new recipe
    """
    return Recipe(name=name, unique_name=unique_name, description=description, oven_temp=oven_temp,
                  estimated_time=estimated_time)


@db_session
def update_recipe_name(id: UUID, name: str, unique_name: str):
    recipe = Recipe(id=id)
    recipe.name = name
    recipe.unique_name = unique_name


@db_session
def update_recipe_general(id: UUID, description: str, oven_temp: int, estimed_time: int):
    recipe = Recipe(id=id)

