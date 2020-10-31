from typing import List

from pony.orm import db_session, select

from arch.query.ConfigQueries import get_config
from db import RecipeImage


@db_session
def get_main_image_url(recipe_id: str) -> str:
    images = get_images_for_recipe(recipe_id)
    image = recipe_image_to_url("default.jpg")
    if len(images) > 0:
        image = images[0]

    return image


def recipe_image_to_url(name: str) -> str:
    backend = get_config("backend_base_address")
    image_path = get_config("image_base_path")
    return "{0}/{1}/{2}".format(backend, image_path, name)


@db_session
def get_images_for_recipe(recipe_id: str) -> List[str]:
    name_list = list(select(recImg.image.name for recImg in RecipeImage if str(recImg.recipe.id) == recipe_id))
    return list(map(recipe_image_to_url, name_list))
