from typing import List
from uuid import UUID

from pony.orm import db_session, select, delete

from arch.data_objects.ImageData import ImageData
from arch.data_objects.RecipeImageData import RecipeImageData
from db import RecipeImage


@db_session
def add_recipe_image(image_id: UUID, recipe_id: UUID):
    RecipeImage(image=image_id, recipe=recipe_id)


@db_session
def get_recipe_images_for_recipe(recipe_id: UUID) -> List[RecipeImageData]:
    recipe_images = list(select(recipe_image for recipe_image in RecipeImage if recipe_image.recipe.id == recipe_id))
    return [RecipeImageData(
        image=ImageData(
            id=recipe_image.image.id,
            name=recipe_image.image.name
        )
    ) for recipe_image in recipe_images]


@db_session
def delete_recipe_image(recipe_id: UUID, image_id: UUID):
    rec_img = RecipeImage.get(recipe=recipe_id, image=image_id)
    delete(rec_img)
