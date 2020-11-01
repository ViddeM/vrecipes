from dataclasses import dataclass

from arch.data_objects.IngredientData import IngredientData
from arch.data_objects.UnitData import UnitData


@dataclass
class RecipeIngredientData:
    ingredient: IngredientData
    unit: UnitData
    amount: float
