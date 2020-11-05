from typing import Optional

from pony.orm import db_session

from db import Ingredient


@db_session
def find_ingredient(name: str) -> Optional[Ingredient]:
    return Ingredient.get(name=name)

