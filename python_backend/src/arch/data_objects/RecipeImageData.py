from dataclasses import dataclass

from arch.data_objects.ImageData import ImageData


@dataclass
class RecipeImageData:
    image: ImageData
