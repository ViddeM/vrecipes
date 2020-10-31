from pony.orm import db_session

from db import Config


@db_session
def get_config(key):
    return Config.get(key=key).value

