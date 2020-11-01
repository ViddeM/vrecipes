from uuid import UUID

from pony.orm import db_session

from db import RecipeImage


@db_session
def add_recipe_image(image_id: UUID, recipe_id: UUID):
    RecipeImage(image=image_id, recipe=recipe_id)
