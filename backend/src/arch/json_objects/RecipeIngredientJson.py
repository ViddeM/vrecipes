from dataclasses import dataclass


@dataclass
class RecipeIngredientJson:
    name: str = ""
    amount: float = -1
    unit: str = ""
