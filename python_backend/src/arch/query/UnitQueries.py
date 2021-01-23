from typing import Optional

from pony.orm import db_session

from db import Unit


@db_session
def find_unit(name: str) -> Optional[Unit]:
    return Unit.get(name=name)
