import os
from typing import Optional
from uuid import UUID

from pony.orm import db_session

from arch.data_objects.ImageData import ImageData
from arch.query.ConfigQueries import get_config
from db import Image


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
def get_image_by_id(id: UUID) -> Optional[ImageData]:
    image = Image.get(id=id)
    if image is not None:
        return ImageData(id=image.id, name=image.name)
    return None
