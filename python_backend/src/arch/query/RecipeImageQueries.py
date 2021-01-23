from typing import List

from pony.orm import db_session, select

from arch.data_objects.ImageData import ImageData
from arch.query.ImageQueries import image_data_to_url, recipe_image_to_url
from db import RecipeImage


@db_session
def get_main_image_url(recipe_id: str) -> str:
    images = get_images_for_recipe_dict(recipe_id)
    image = recipe_image_to_url("default.jpg")
    if len(images) > 0:
        image = images[0]["url"]

    return image


@db_session
def get_images_for_recipe_dict(recipe_id: str) -> List[dict]:
    images_list = list(select((recImg.image.id, recImg.image.name) for recImg in RecipeImage if
                              str(recImg.recipe.id) == recipe_id))

    image_data_list = [ImageData(id=id, name=name) for (id, name) in images_list]

    return [
        {
            "url": image_data_to_url(image_data),
            "id": str(image_data.id)
        }
        for image_data in image_data_list]
