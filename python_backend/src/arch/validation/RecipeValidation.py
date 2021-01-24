from typing import List
from uuid import UUID

from arch.json_objects.RecipeJson import RecipeJson, RecipeIngredientJson, RecipeStepJson, RecipeImageJson
from arch.query.ImageQueries import get_image_by_id
from arch.query.RecipeQueries import recipe_with_id_exists
from arch.validation.Validation import validate_uuid, validate_int, validate_list, validate_non_empty_str, \
    validate_float, validate_str, validate_uuid_str
from result_with_data import ResultWithData, get_result_with_data, get_result_with_error


def validate_recipe_json(json: dict) -> ResultWithData[RecipeJson]:
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


def validate_recipe_id(id_str: str) -> ResultWithData[UUID]:
    """
    Validates if the given string is a valid recipe id.
    :param id_str: the supposed id as a str
    :return: the uuid or an error.
    """
    id_res = validate_uuid_str(id_str)
    if id_res.is_error:
        return get_result_with_error(id_res.message)
    id = id_res.data
    if recipe_with_id_exists(id):
        return get_result_with_data(id)
    return get_result_with_error(f"No recipe exists with id {id}")
