from uuid import UUID

from pony.orm import Database, PrimaryKey, Required, Optional, Set

import db_config as config

db = Database()


# An image
class Image(db.Entity):
    id = PrimaryKey(UUID, auto=True)
    location = Required(str)
    recipes = Set("RecipeImage")


# The images for a recipe
class RecipeImage(db.Entity):
    image = Required(Image)
    recipe = Required("Recipe")
    PrimaryKey(image, recipe)


# A recipe
class Recipe(db.Entity):
    id = PrimaryKey(UUID, auto=True)
    name = Required(str)
    unique_name = Required(str, unique=True)
    description = Optional(str)
    oven_temp = Optional(int)
    estimated_time = Optional(int)

    steps = Set("RecipeStep")
    ingredients = Set("RecipeIngredient")
    images = Set(RecipeImage)


# An ingredient
class Ingredient(db.Entity):
    name = PrimaryKey(str)
    recipes = Set("RecipeIngredient")


# A unit (i.e. dl, kg, msk etc)
class Unit(db.Entity):
    name = PrimaryKey(str)

    recipe_ingredients = Set("RecipeIngredient")


# An ingredient in a recipe
class RecipeIngredient(db.Entity):
    recipe = Required(Recipe)
    ingredient = Required(Ingredient)
    unit = Required(Unit)
    amount = Required(float)
    PrimaryKey(recipe, ingredient)


# A cooking step in a recipe
class RecipeStep(db.Entity):
    recipe = Required(Recipe)
    number = Required(int)
    step = Required(str)
    PrimaryKey(recipe, number)


db.bind(
    provider="postgres",
    user=config.POSTGRES_USER,
    password=config.POSTGRES_PASSWORD,
    host=config.POSTGRES_HOST,
    port=config.POSTGRES_PORT,
    database=config.POSTGRES_DB
)


def create_db():
    print(" ========== Creating Database ========== ")
    db.create_tables()


db.generate_mapping(create_tables=True)

# Image
# class Image(db.Entity):
#     uuid = PrimaryKey(UUID, auto=True)
#     image_name = Required(str)
#
#
# # A recipe
# class Recipe(db.Entity):
#     uuid = PrimaryKey(UUID, auto=True)
#     name = Required(str)
#     description = Required(str) # A description of the dish
#     steps = Set("RecipeSteps")
#     ingredients = Set("Ingredient")
#
#
# # Steps in cooking a recipe
# class RecipeSteps(db.Entity):
#     stepNumber = Required(int)
#     description = Required(str)
#     recipes = Required(Recipe)
#
#     PrimaryKey(stepNumber, recipes)
#
#
# # Recipes connected with their images.
# class RecipeImages(db.Entity):
#     recipe = Set(Recipe)
#     image = Set(Image)
#     PrimaryKey(recipe, image)
#
#
# # A unit such as Kilograms (KG),
# class Unit(db.Entity):
#     name = PrimaryKey(str)
#     short = Required(str)
#
#
# # A food type such as fish, pork, vegetable, fruit
# class FoodType(db.Entity):
#     name = PrimaryKey(str)
#
#
# # A raw food such as pasta, apple, porkchop
# class RawFood(db.Entity):
#     name = PrimaryKey(str)
#     type = Optional(FoodType)
#
#
# # A way of preparing a food such as grated, mashed etc...
# class PreparationMethod(db.Entity):
#     method = PrimaryKey(str)
#     ingredients = Set("Ingredient")
#
#
# # An ingredient
# class Ingredient(db.Entity):
#     name = PrimaryKey(str)
#     recipes = Set("Recipe")

#    raw = Required(RawFood)
#    preparationMethod = Required(PreparationMethod)

#    defaultUnit = Required(Unit)
