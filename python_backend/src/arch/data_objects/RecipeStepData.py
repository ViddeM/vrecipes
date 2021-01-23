from dataclasses import dataclass

from arch.json_objects.RecipeStepJson import RecipeStepJson


@dataclass
class RecipeStepData:
    number: int
    step: str
