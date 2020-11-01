from uuid import UUID

from arch.command.IngredientCommands import insert_ingredient
from arch.command.RecipeCommands import insert_new_recipe
from arch.command.RecipeImageCommands import add_recipe_image
from arch.command.RecipeIngredientCommands import insert_recipe_ingredient
from arch.command.RecipeStepCommands import insert_recipe_step
from arch.command.UnitCommands import insert_unit
from arch.query.RecipeQueries import find_ingredient, find_unit, get_recipe_by_unique_name
from arch.validation.RecipeValidation import validate_recipe_json
from db import Recipe, RecipeIngredient, RecipeStep
from response_messages import RECIPE_NAME_EXISTS
from response_with_data import HttpResponse, get_with_error, get_with_data
from result_with_data import ResultWithData, get_result_with_errors, get_result_with_data


def new_recipe(json: dict) -> HttpResponse:
    """
    Validates the given json and tries to create a recipe from it.
    :param json: the json with the information for the new recipe
    :return: A HttpResponse with the new recipes unique_name.
    """
    parsed_res = validate_recipe_json(json)
    if parsed_res.is_error:
        return get_with_error(400, parsed_res.message)

    parsed = parsed_res.data

    recipe_res = create_recipe(parsed.name, parsed.description, parsed.oven_temp, parsed.cooking_time)
    if recipe_res.is_error:
        return get_with_error(400, recipe_res.message)
    recipe = recipe_res.data

    for ingredient in parsed.ingredients:
        create_recipe_ingredient(ingredient.name, ingredient.unit, ingredient.amount, recipe.id)

    for step in parsed.steps:
        create_recipe_step(step.step, step.number, recipe.id)

    for image in parsed.images:
        add_recipe_image(image.id, recipe.id)

    return get_with_data({
        "recipeUniqueName": str(recipe.unique_name)
    })


def create_recipe(name: str, description: str = "", oven_temp: int = -1, estimated_time: int = -1) -> ResultWithData[
    Recipe]:

    edited_name = name.strip()

    unique_name = name_to_unique_name(edited_name)
    if unique_name.is_error:
        return get_result_with_errors(unique_name.message)
    return get_result_with_data(insert_new_recipe(edited_name, unique_name.data, description, oven_temp, estimated_time))


def create_recipe_ingredient(name: str, unit: str, amount: float, recipe_id: UUID) -> RecipeIngredient:
    ingredient = find_ingredient(name)
    if ingredient is None:
        ingredient = insert_ingredient(name)

    unit_obj = find_unit(unit)
    if unit_obj is None:
        unit_obj = insert_unit(unit)

    return insert_recipe_ingredient(ingredient.name, unit_obj.name, amount, recipe_id)


def create_recipe_step(name: str, number: int, recipe_id: UUID) -> RecipeStep:
    return insert_recipe_step(name, number, recipe_id)


def create_recipe_image(recipe_id: UUID, image_id: UUID):
    add_recipe_image(image_id, recipe_id)


def name_to_unique_name(name: str) -> ResultWithData:
    """
    Converts the name to a unique name that can be used for verification
    :param name: the recipe name
    :return: A result with the identifying name or an error.
    """
    unique_name = name.lower().replace(" ", "_")
    if get_recipe_by_unique_name(unique_name) is not None:
        return get_result_with_errors(RECIPE_NAME_EXISTS)
    return get_result_with_data(unique_name)
