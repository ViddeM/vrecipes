from dataclasses import dataclass
from typing import List
from uuid import UUID


@dataclass
class RecipeIngredientJson:
    name: str = ""
    amount: float = -1
    unit: str = ""


@dataclass
class RecipeStepJson:
    step: str = ""
    number: int = -1


@dataclass
class RecipeImageJson:
    id: UUID


@dataclass
class RecipeJson:
    ingredients: List[RecipeIngredientJson]
    steps: List[RecipeStepJson]
    images: List[RecipeImageJson]
    name: str = ""
    description: str = ""
    cooking_time: int = -1
    oven_temp: int = -1
