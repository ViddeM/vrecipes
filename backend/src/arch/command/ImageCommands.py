from pony.orm import db_session

from arch.data_objects.ImageData import ImageData
from db import Image


@db_session
def add_image(image_name: str) -> ImageData:
    image = Image(name=image_name)
    return ImageData(id=image.id, name=image.name)
