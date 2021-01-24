from arch.command.RecipeCommands import update_recipe_name, update_recipe_general
from arch.command.RecipeImageCommands import add_recipe_image, delete_recipe_image
from arch.command.RecipeIngredientCommands import insert_recipe_ingredient, update_recipe_ingredient, \
    delete_recipe_ingredient
from arch.command.RecipeStepCommands import insert_recipe_step, update_recipe_step, delete_recipe_step
from arch.data_objects.RecipeData import RecipeData
from arch.json_objects.RecipeJson import RecipeJson
from arch.process.NewRecipeProcess import name_to_unique_name
from arch.query.RecipeQueries import get_recipe_data_by_id
from arch.validation.RecipeValidation import validate_recipe_id, validate_recipe_json
from response_with_data import HttpResponse, get_with_error, get_with_data
from result_with_data import get_result_with_error, ResultWithData, get_result_with_data


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

    return get_with_data({
        "recipeUniqueName": update_res.data
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
    update_recipe_steps(recipe, validated)
    update_recipe_ingredients(recipe, validated)
    update_recipe_images(recipe, validated)

    return get_result_with_data(unique_name)


def update_recipe_steps(recipe: RecipeData, validated: RecipeJson):
    unused_steps = recipe.steps

    for validated_step in validated.steps:
        new = True
        for existing_step in recipe.steps:
            if existing_step.number == validated_step.number:
                new = False
                unused_steps.remove(existing_step)
                break

        if new:
            insert_recipe_step(validated_step.step, validated_step.number, recipe.id)
        else:
            update_recipe_step(recipe.id, validated_step.step, validated_step.number)

    # Delete the ones no longer in use
    for unused_step in unused_steps:
        delete_recipe_step(recipe.id, unused_step.number)


def update_recipe_ingredients(recipe: RecipeData, validated: RecipeJson):
    unused_ingredients = recipe.ingredients

    for validated_ingredient in validated.ingredients:
        new = True
        for existing_ingredient in recipe.ingredients:
            if existing_ingredient.ingredient.name == validated_ingredient.name:
                new = False
                unused_ingredients.remove(existing_ingredient)
                break

        if new:
            insert_recipe_ingredient(validated_ingredient.name, validated_ingredient.unit, validated_ingredient.amount,
                                     recipe.id)
        else:
            update_recipe_ingredient(validated_ingredient, recipe.id)

    for unused_ingredient in unused_ingredients:
        delete_recipe_ingredient(recipe.id, unused_ingredient.ingredient.name)


def update_recipe_images(recipe: RecipeData, validated: RecipeJson):
    unused_images = recipe.images

    for image in validated.images:
        new = True
        for existing_image in recipe.images:
            if existing_image.image.id == image.id:
                new = False
                unused_images.remove(existing_image)
                break

        if new:
            add_recipe_image(image.id, recipe.id)

    for unused_image in unused_images:
        delete_recipe_image(recipe.id, unused_image.image.id)
