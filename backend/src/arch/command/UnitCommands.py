from pony.orm import db_session

from db import Unit


@db_session
def insert_unit(name: str) -> Unit:
    """
    Create a new Unit
    :return: the new Unit
    """
    return Unit(name=name)

