from dataclasses import dataclass


@dataclass
class RecipeStepJson:
    step: str = ""
    number: int = -1
