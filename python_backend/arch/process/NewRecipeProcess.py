import uuid

from arch.command.RecipeCommands import insert_new_recipe, insert_ingredient, insert_recipe_ingredient, insert_unit, \
    insert_recipe_step
from arch.query.RecipeQueries import get_same_name_unique_names, find_ingredient, find_unit
from arch.validation.RecipeValidation import validate_new_recipe_json
from db import Recipe, RecipeIngredient, RecipeStep
from response_with_data import HttpResponse, get_with_error, get_with_data


def new_recipe(json: dict) -> HttpResponse:
    """
    Validates the given json and tries to create a recipe from it.
    :param json: the json with the information for the new recipe
    :return: A HttpResponse with the new recipes unique_name.
    """
    parsed = validate_new_recipe_json(json)
    if parsed is None:
        return get_with_error(400, "Invalid recipe json")

    recipe = create_recipe(parsed.name, parsed.description, parsed.oven_temp, parsed.cooking_time)

    for ingredient in parsed.ingredients:
        create_recipe_ingredient(ingredient.name, ingredient.unit, ingredient.amount, recipe.id)

    for step in parsed.steps:
        create_recipe_step(step.step, step.number, recipe.id)

    return get_with_data({
        "recipeUniqueName": str(recipe.unique_name)
    })


def create_recipe(name: str, description: str = "", oven_temp: int = -1, estimated_time: int = -1) -> Recipe:
    id = generate_name_id(name)
    return insert_new_recipe(name, id, description, oven_temp, estimated_time)


def create_recipe_ingredient(name: str, unit: str, amount: float, recipe_id: uuid) -> RecipeIngredient:
    ingredient = find_ingredient(name)
    if ingredient is None:
        ingredient = insert_ingredient(name)

    unit_obj = find_unit(unit)
    if unit_obj is None:
        unit_obj = insert_unit(unit)

    return insert_recipe_ingredient(ingredient.name, unit_obj.name, amount, recipe_id)


def create_recipe_step(name: str, number: int, recipe_id: uuid) -> RecipeStep:
    return insert_recipe_step(name, number, recipe_id)


def generate_name_id(name: str) -> str:
    """
    Takes the name of a recipe and generates a unique name that can be used for identification.
    :param name: the recipe name
    :return: the identifying name
    """
    id = name.lower().replace(" ", "_")

    same_name_recipes = get_same_name_unique_names(id)
    colliding_name_count = -1

    if len(same_name_recipes) > 0:
        colliding_name_count = 0

    for recipe in same_name_recipes:
        sub = recipe[len(id):]
        if sub.isnumeric():
            colliding_name_count += 1

    unique_name = id
    if colliding_name_count >= 0:
        unique_name = id + "_" + str(colliding_name_count)

    return unique_name
