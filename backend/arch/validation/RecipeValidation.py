from typing import Optional, List

from arch.ParsedJson.Recipe import RecipeJson, RecipeIngredientJson, RecipeStepJson


def validate_new_recipe_json(json: dict) -> Optional[RecipeJson]:
    """
    Validates if the json is valid to create a new recipe.
    :param json: the json to validate
    :return: RecipeJson if valid, None otherwise
    """

    recipe = RecipeJson()

    try:
        name = validate_non_empty_str(json, "name")
        if name is None:
            return None
        recipe.name = name

        description = validate_str(json, "description")
        if description is None:
            return None
        recipe.description = description

        cooking_time = validate_int(json, "cookingTime")
        if cooking_time is None:
            return None
        recipe.cooking_time = cooking_time

        oven_temp = validate_int(json, "ovenTemperature")
        if oven_temp is None:
            return None
        recipe.oven_temp = oven_temp

        ingredients = validate_ingredients(json)
        if ingredients is None:
            return None
        else:
            recipe.ingredients = ingredients

        steps = validate_steps(json)
        if steps is None:
            return None
        else:
            recipe.steps = steps

        return recipe
    except Exception as e:
        print("An error occurred whilst validation new recipe json: {0}".format(str(e)))

    return None


def validate_ingredients(json: dict) -> Optional[List[RecipeIngredientJson]]:
    """
    Validates if the json contains a valid ingredients list.
    :param json: the json to validate for
    :return: the parsed list if possible, None otherwise
    """

    parsed = validate_list(json, "ingredients")
    if parsed is None:
        return None

    ingredients = []
    for ingredient in parsed:
        ingredient_object = RecipeIngredientJson()

        name = validate_non_empty_str(ingredient, "name")
        if name is None:
            return None
        ingredient_object.name = name

        unit = validate_non_empty_str(ingredient, "unit")
        if unit is None:
            return None
        ingredient_object.unit = unit

        amount = validate_float(ingredient, "amount")
        if amount is None:
            return None
        ingredient_object.amount = amount

        ingredients.append(ingredient_object)

    return ingredients


def validate_steps(json: dict) -> Optional[List[RecipeStepJson]]:
    """
    Validates if the json contains a valid steps list.
    :param json: the json to validate for
    :return: The parsed list if possible, None otherwise
    """
    parsed = validate_list(json, "steps")
    if parsed is None:
        return None

    steps = []
    for step in parsed:
        step_obj = RecipeStepJson()

        name = validate_non_empty_str(step, "step")
        if name is None:
            return None
        step_obj.step = name

        number = validate_int(step, "number")
        if number is None:
            return None
        step_obj.number = number

        steps.append(step_obj)

    return steps


def validate_non_empty_str(json: dict, key: str) -> Optional[str]:
    """
    Validates if the given json has a non-empty str for the given key.
    :param json: the json to validate for.
    :param key: the key to look for.
    :return: The str if possible, None otherwise
    """
    val = validate_str(json, key)
    if val is not None and len(val) > 0:
        return val

    return None


def validate_str(json: dict, key: str) -> Optional[str]:
    """
    Validates if the given json has a str val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The str if possible, None otherwise
    """
    if not val_exists(json, key):
        return None

    val = json[key]
    if type(val) is str:
        return val

    return None


def validate_int(json: dict, key: str) -> Optional[int]:
    """
    Validates if the given json has an int val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The int if possible, None otherwise
    """
    if not val_exists(json, key):
        return None

    val = parse_int(json[key])
    return val


def validate_float(json: dict, key: str) -> Optional[float]:
    """
    Validates if the given json has a float val for the given key
    :param json: the json to validate for
    :param key: the key to look for
    :return: The float if possible, None otherwise
    """
    if not val_exists(json, key):
        return None

    val = parse_float(json[key])
    return val


def validate_list(json: dict, key: str) -> Optional[List[dict]]:
    """
    Tries to parse the given a list from the given key and json.
    :param json: the json to parse for
    :param key: the key to parse
    :return: The list if possible, None otherwise
    """
    if not val_exists(json, key):
        return None

    val = json[key]
    if type(val) is list:
        return val

    return None


def val_exists(json: dict, key: str) -> bool:
    """
    Validates if the given key exists in the given json
    :param json: the json to validate for.
    :param key: the key to look for
    :return: True if the key exists and False otherwise
    """
    return key in json


def parse_int(num: str) -> Optional[int]:
    """
    Tries to parse a string to an integer
    :param num: the string to parse
    :return: the integer if parsing was successful, None otherwise
    """
    try:
        return int(num)
    except ValueError:
        return None


def parse_float(num: str) -> Optional[float]:
    """
    Tries to parse a string to a float
    :param num: the string to parse
    :return: the float if parsing was successful, None otherwise
    """
    try:
        return float(num)
    except ValueError:
        return None
