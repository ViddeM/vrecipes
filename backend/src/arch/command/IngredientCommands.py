from pony.orm import db_session

from db import Ingredient


@db_session
def insert_ingredient(name: str) -> Ingredient:
    """
    Create a new ingredient
    :return: the new ingredient
    """
    return Ingredient(name=name)
