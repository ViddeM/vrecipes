from uuid import UUID

from pony.orm import Database, PrimaryKey, Required, Optional, Set

db = Database()


# Image
class Image(db.Entity):
    uuid = PrimaryKey(UUID, auto=True)
    image_name = Required(str)


# A recipe
class Recipe(db.Entity):
    uuid = PrimaryKey(UUID, auto=True)
    name = Required(str)
    description = Optional(str)


# Recipes connected with their images.
class RecipeImages(db.Entity):
    recipe = Set(Recipe)
    image = Set(Image)
    PrimaryKey(recipe, image)


# A unit such as Kilograms (KG),
class Unit(db.Entity):
    name = PrimaryKey(str)
    short = Required(str)


# A food type such as fish, pork, vegetable, fruit
class FoodType(db.Entity):
    name = PrimaryKey(str)


# A raw food such as pasta, apple, porkchop
class RawFood(db.Entity):
    name = PrimaryKey(str)
    type = Optional(FoodType)


# A way of preparing a food such as grated, mashed etc...
class PreparationMethod(db.Entity):
    method = PrimaryKey(str)



# An ingredient
class Ingredient(db.Entity):
    name = PrimaryKey(str)
    raw = Required(RawFood)
    preparationMethod =

    defaultUnit = Required(Unit)
