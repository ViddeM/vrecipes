from typing import List
from uuid import UUID

from pony.orm import db_session, select

from arch.data_objects.RecipeStepData import RecipeStepData
from db import RecipeStep


@db_session
def get_steps_for_recipe(recipe_id: UUID) -> List[RecipeStepData]:
    steps = list(select(step for step in RecipeStep if step.recipe.id == recipe_id))
    return [RecipeStepData(
        number=step.number,
        step=step.step
    ) for step in steps]
