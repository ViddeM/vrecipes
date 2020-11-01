from src.ResultWithData import get_result_with_error, ResultWithData, get_result_with_data

from arch.command.RecipeCommands import update_recipe_name, update_recipe_general
from arch.data_objects.RecipeData import RecipeData
from arch.json_objects.RecipeJson import RecipeJson
from arch.process.NewRecipeProcess import name_to_unique_name
from arch.query.RecipeQueries import get_recipe_data_by_id
from arch.validation.RecipeValidation import validate_recipe_id, validate_recipe_json
from response_with_data import HttpResponse, get_with_error, get_with_data


def edit_recipe(id_str: str, json: dict) -> HttpResponse:
    id_res = validate_recipe_id(id_str)
    if id_res.is_error:
        return get_with_error(404, id_res.message)
    id = id_res.data

    validated_res = validate_recipe_json(json)
    if validated_res.is_error:
        return get_with_error(400, validated_res.message)
    validated = validated_res.data

    recipe = get_recipe_data_by_id(id)
    if recipe is None:
        return get_with_error(500, f"Internal error, recipe with id {id} no longer found")

    update_res = update_recipe_with_changes(recipe, validated)
    if update_res.is_error:
        return get_with_error(400, update_res.message)

    raise get_with_data({
        "unique_name": update_res.data
    })


def update_recipe_with_changes(recipe: RecipeData, validated: RecipeJson) -> ResultWithData[str]:
    unique_name = recipe.unique_name
    if validated.name != recipe.name:
        new_unique_name_res = name_to_unique_name(validated.name)
        if new_unique_name_res.is_error:
            return get_result_with_error(new_unique_name_res.message)
        unique_name = new_unique_name_res.data
        update_recipe_name(recipe.id, validated.name, unique_name)

    update_recipe_general(recipe.id, validated.description, validated.oven_temp, validated.cooking_time)
    return get_result_with_data(unique_name)
