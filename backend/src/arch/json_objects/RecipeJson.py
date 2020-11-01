from dataclasses import dataclass
from typing import List

from arch.json_objects.RecipeImageJson import RecipeImageJson
from arch.json_objects.RecipeIngredientJson import RecipeIngredientJson
from arch.json_objects.RecipeStepJson import RecipeStepJson


@dataclass
class RecipeJson:
    ingredients: List[RecipeIngredientJson]
    steps: List[RecipeStepJson]
    images: List[RecipeImageJson]
    name: str = ""
    description: str = ""
    cooking_time: int = -1
    oven_temp: int = -1
