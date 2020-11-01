import os
from typing import List, Optional
from uuid import UUID

from pony.orm import db_session, select

from arch.data_objects.ImageData import ImageData
from arch.query.ConfigQueries import get_config
from db import RecipeImage, Image


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


def image_data_to_url(image_data: ImageData) -> str:
    backend = get_config("backend_base_address")
    image_path = get_config("image_base_path")

    id_path = f"{image_path}/{image_data.id}_{image_data.name}"
    if os.path.exists(id_path):
        return f"{backend}/{id_path}"

    return f"{backend}/{image_path}/{image_data.name}"


def get_image_url(id: UUID) -> Optional[str]:
    image = get_image_by_id(id)
    if image is None:
        return None
    return image_data_to_url(image)


@db_session
def get_images_for_recipe(recipe_id: str) -> List[str]:
    images_list = list(select((recImg.image.id, recImg.image.name) for recImg in RecipeImage if
                              str(recImg.recipe.id) == recipe_id))

    image_data_list = [ImageData(id=id, name=name) for (id, name) in images_list]

    return list(map(image_data_to_url, image_data_list))


@db_session
def get_image_by_id(id: UUID) -> Optional[ImageData]:
    image = Image.get(id=id)
    if image is not None:
        return ImageData(id=image.id, name=image.name)
    return None
