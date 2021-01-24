from typing import List
from uuid import UUID

from result_with_data import ResultWithData, get_result_with_data, get_result_with_error


def validate_uuid_str(id_str: str) -> ResultWithData[UUID]:
    """
    Validates if the given string is a valid UUID
    :param id_str: the supposed UUID
    :return: the uuid or an error
    """
    try:
        return get_result_with_data(UUID(id_str))
    except ValueError:
        return get_result_with_error(f"String {id_str} is not a valid uuid")


def validate_uuid(json: dict, key: str) -> ResultWithData[UUID]:
    """
    Validates if the given json has a valid uuid for the given key.
    :param json: the json to validate for
    :param key: the key to look for
    :return: the uuid or an error.
    """
    str_res = validate_non_empty_str(json, key)
    if str_res.is_error:
        return get_result_with_error(str_res.message)
    str = str_res.data
    uuid_res = validate_uuid_str(str)
    if uuid_res.is_error:
        return get_result_with_error(uuid_res.message)
    return get_result_with_data(uuid_res.data)


def validate_non_empty_str(json: dict, key: str) -> ResultWithData[str]:
    """
    Validates if the given json has a non-empty str for the given key.
    :param json: the json to validate for.
    :param key: the key to look for.
    :return: The str if possible, None otherwise
    """
    val_res = validate_str(json, key)
    if val_res.is_error:
        return get_result_with_error(val_res.message)
    val = val_res.data

    if len(val) > 0:
        return get_result_with_data(val)

    return get_result_with_error(f"Value '{val}' for key '{key}' was not a non-empty string")


def validate_str(json: dict, key: str) -> ResultWithData[str]:
    """
    Validates if the given json has a str val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The str if possible, None otherwise
    """
    if not val_exists(json, key):
        return get_result_with_error(f"Missing key {key}")

    val = json[key]
    if type(val) is str:
        return get_result_with_data(val)

    return get_result_with_error(f"Value '{val}' must be of type string")


def validate_int(json: dict, key: str) -> ResultWithData[int]:
    """
    Validates if the given json has an int val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The int if possible, None otherwise
    """
    if not val_exists(json, key):
        return get_result_with_error(f"Missing key '{key}'")

    val_res = parse_int(json[key])
    if val_res.is_error:
        return get_result_with_error(val_res.message)

    return get_result_with_data(val_res.data)


def validate_float(json: dict, key: str) -> ResultWithData[float]:
    """
    Validates if the given json has a float val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The float if possible, None otherwise
    """
    if not val_exists(json, key):
        return get_result_with_error(f"Missing key '{key}")

    val_res = parse_float(json[key])
    if val_res.is_error:
        return get_result_with_error(val_res.message)

    return get_result_with_data(val_res.data)


def validate_list(json: dict, key: str) -> ResultWithData[List]:
    """
    Tries to parse the given a list from the given key and json.
    :param json: the json to parse for
    :param key: the key to parse
    :return: The list if possible, None otherwise
    """
    if not val_exists(json, key):
        return get_result_with_error("Missing key '{key}'")

    val = json[key]
    if type(val) is list:
        return get_result_with_data(val)

    return get_result_with_error(f"Value '{val}' for key '{key}' must be of type list")


def val_exists(json: dict, key: str) -> bool:
    """
    Validates if the given key exists in the given json
    :param json: the json to validate for.
    :param key: the key to look for
    :return: True if the key exists and False otherwise
    """
    return key in json


def parse_int(num: str) -> ResultWithData[int]:
    """
    Tries to parse a string to an integer
    :param num: the string to parse
    :return: the integer if parsing was successful, None otherwise
    """
    try:
        return get_result_with_data(int(num))
    except ValueError:
        return get_result_with_error(f"Unable to parse '{num}' to integer")


def parse_float(num: str) -> ResultWithData[float]:
    """
    Tries to parse a string to a float
    :param num: the string to parse
    :return: the float if parsing was successful, None otherwise
    """
    try:
        return get_result_with_data(float(num))
    except ValueError:
        return get_result_with_error(f"Unable to parse '{num}' to float")
