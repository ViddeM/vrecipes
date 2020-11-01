from dataclasses import dataclass
from typing import List
from uuid import UUID

from arch.data_objects.RecipeIngredientData import RecipeIngredientData
from arch.data_objects.RecipeStepData import RecipeStepData
from db import RecipeImage


@dataclass
class RecipeData:
    ingredients: List[RecipeIngredientData]
    steps: List[RecipeStepData]
    images: List[RecipeImage]
    id: UUID
    name: str
    unique_name: str
    description: str = ""
    oven_temp: int = -1
    estimated_time: int = -1

