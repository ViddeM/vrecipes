from uuid import UUID

from pony.orm import db_session, delete

from db import RecipeStep


@db_session
def insert_recipe_step(name: str, number: int, recipe_id: UUID) -> RecipeStep:
    """
    Create a new recipe step
    :return: the new step
    """
    return RecipeStep(step=name, number=number, recipe=recipe_id)


@db_session
def update_recipe_step(recipe_id: UUID, name: str, number: int):
    """
    Update the recipe step
    """
    step = RecipeStep.get(recipe=recipe_id, number=number)
    step.name = name


@db_session
def delete_recipe_step(recipe_id: UUID, number: int):
    step = RecipeStep.get(recipe=recipe_id, number=number)
    delete(step)
