from typing import Optional, List
from uuid import UUID

from src.ResultWithData import get_result_with_error

from arch.json_objects.Recipe import RecipeJson, RecipeIngredientJson, RecipeStepJson, RecipeImageJson
from arch.query.ImageQueries import get_image_by_id
from result_with_data import ResultWithData, get_result_with_data


def validate_new_recipe_json(json: dict) -> ResultWithData[RecipeJson]:
    """
    Validates if the json is valid to create a new recipe.
    :param json: the json to validate
    :return: RecipeJson if valid, None otherwise
    """

    name_res = validate_non_empty_str(json, "name")
    if name_res.is_error:
        return get_result_with_error(name_res.message)

    description_res = validate_str(json, "description")
    if description_res.is_error:
        return get_result_with_error(description_res.message)

    cooking_time_res = validate_int(json, "cookingTime")
    if cooking_time_res.is_error:
        return get_result_with_error(cooking_time_res.message)

    oven_temp_res = validate_int(json, "ovenTemperature")
    if oven_temp_res.is_error:
        return get_result_with_error(oven_temp_res.message)

    ingredients_res = validate_ingredients(json)
    if ingredients_res.is_error:
        return get_result_with_error(ingredients_res.message)

    steps_res = validate_steps(json)
    if steps_res.is_error:
        return get_result_with_error(steps_res.message)

    images_res = validate_images(json)
    if images_res.is_error:
        return get_result_with_error(images_res.message)

    recipe = RecipeJson(
        name=name_res.data,
        description=description_res.data,
        cooking_time=cooking_time_res.data,
        oven_temp=oven_temp_res.data,
        ingredients=ingredients_res.data,
        steps=steps_res.data,
        images=images_res.data
    )

    return get_result_with_data(recipe)


def validate_ingredients(json: dict) -> ResultWithData[List[RecipeIngredientJson]]:
    """
    Validates if the json contains a valid ingredients list.
    :param json: the json to validate for
    :return: the parsed list if possible, None otherwise
    """

    parsed_res = validate_list(json, "ingredients")
    if parsed_res.is_error:
        return get_result_with_error(parsed_res.message)

    ingredients = []
    for ingredient in parsed_res.data:
        ingredient_object = RecipeIngredientJson()

        name_res = validate_non_empty_str(ingredient, "name")
        if name_res.is_error:
            return get_result_with_error(name_res.message)
        ingredient_object.name = name_res.data

        unit_res = validate_non_empty_str(ingredient, "unit")
        if unit_res.is_error:
            return get_result_with_error(unit_res.message)
        ingredient_object.unit = unit_res.data

        amount_res = validate_float(ingredient, "amount")
        if amount_res.is_error:
            return get_result_with_error(amount_res.message)
        ingredient_object.amount = amount_res.data

        ingredients.append(ingredient_object)

    return get_result_with_data(ingredients)


def validate_steps(json: dict) -> ResultWithData[List[RecipeStepJson]]:
    """
    Validates if the json contains a valid steps list.
    :param json: the json to validate for
    :return: The parsed list if possible, None otherwise
    """
    parsed_res = validate_list(json, "steps")
    if parsed_res.is_error:
        return get_result_with_error(parsed_res.message)

    steps = []
    for step in parsed_res.data:
        step_obj = RecipeStepJson()

        name_res = validate_non_empty_str(step, "step")
        if name_res.is_error:
            return get_result_with_error(name_res.message)
        step_obj.step = name_res.data

        number_res = validate_int(step, "number")
        if number_res.is_error:
            return get_result_with_error(number_res.message)
        step_obj.number = number_res.data

        steps.append(step_obj)

    return get_result_with_data(steps)


def validate_images(json: dict) -> ResultWithData[List[RecipeImageJson]]:
    images_res = validate_list(json, "images")
    if images_res.is_error:
        return get_result_with_error(images_res.message)

    recipe_images = []
    for id_obj in images_res.data:
        id_res = validate_uuid(id_obj, "id")
        if id_res.is_error:
            return get_result_with_error(id_res.message)
        image_id = id_res.data

        if get_image_by_id(image_id) is None:
            return get_result_with_error(f"No image with id {image_id}")

        recipe_images.append(RecipeImageJson(id=image_id))

    return get_result_with_data(recipe_images)


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

    try:
        return get_result_with_data(UUID(str))
    except ValueError:
        return get_result_with_error(f"String {str} is not a valid uuid")


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
