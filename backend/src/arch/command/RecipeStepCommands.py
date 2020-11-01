from uuid import UUID

from pony.orm import db_session

from db import RecipeStep


@db_session
def insert_recipe_step(name: str, number: int, recipe_id: UUID) -> RecipeStep:
    """
    Create a new recipe step
    :return: the new step
    """
    return RecipeStep(step=name, number=number, recipe=recipe_id)
