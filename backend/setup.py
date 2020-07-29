# Insert temp data into the database
from pony.orm import db_session, raw_sql

from db import Recipe, Ingredient, RecipeIngredient, RecipeStep, RecipeImage, Image, db, create_db, Unit, Config
from db_handler import create_new_recipe

duplicate_text = "_duplicate"


def setup_db():
    # https://www.ica.se/recept/chokladkaka-med-chokladkram-och-bar-4214/
    name = "Chokladkaka med chokladkräm och bär"
    description = "Chokladkaka med chokladkräm och bär är den perfekta efterrätten som passar alla åldrar och vid alla tillfällen. Denna delikata dessert med en härlig chokladbotten och en krämig chokladkräm ovanpå dekoreras med färska bär."
    ingredients = [
        {
            "name": "smör",
            "amount": 100,
            "unit": "g"
        },
        {
            "name": "ägg",
            "amount": 2,
            "unit": "st"
        },
        {
            "name": "socker",
            "amount": 2,
            "unit": "dl"
        },
        {
            "name": "vetemjöl",
            "amount": 1,
            "unit": "dl"
        },
        {
            "name": "siktad kakao",
            "amount": 0.5,
            "unit": "dl"
        },
        {
            "name": "vaniljsocker",
            "amount": 1,
            "unit": "tsk"
        }
    ]
    steps = [
        "Sätt ugnen på 175 °C.",
        "Smält smöret och låt det svalna.",
        "Vispa ägg och socker pösigt. Blanda samman mjöl, kakao och vaniljsocker. Rör ner mjölblandningen i äggsmeten. Tillsätt smöret. ",
        "Häll i en smord bröad form (ca 20 cm i diameter, för 8 bitar), gärna med löstagbar botten. Grädda i ca 25 minuter. Låt den stå och kallna så stelnar den.",
    ]

    choklad = add_recipe_to_db(name, description, 175, -1, ingredients=ingredients, steps=steps)
    choklad_2 = add_recipe_to_db(name + duplicate_text, description, 175, -1, ingredients=ingredients, steps=steps)
    add_image("chokladkaka.webp", choklad)
    add_image("chokladkaka.webp", choklad_2)

    # https://www.ica.se/recept/ugnsbakad-lax-i-sas-pa-tre-satt-725369/
    name = "Ugnsbakad lax i sås"
    description = " Underbart trevligt recept på lax i ugn som går att variera enkelt med hjälp av olika kryddningar. Välj mellan dragon, dijon & örter och sweet chili & ingefära. Vilken kryddning blir din favorit?"
    ingredients = [
        {
            "name": "laxfilé utan skinn (à 125 g)",
            "amount": 4,
            "unit": "st"
        },
        {
            "name": "crème fraiche (34%)",
            "amount": 2,
            "unit": "dl"
        },
        {
            "name": "salt",
            "amount": 1,
            "unit": "tsk"
        },
        {
            "name": "malen vitpeppar",
            "amount": 1,
            "unit": "krm"
        },
        {
            "name": "citron, skal och saft",
            "amount": 0.5,
            "unit": "st"
        }
    ]
    steps = [
        "Sätt ugnen på 175°C.",
        "Lägg laxen i en smord ugnssäker form.",
        "Skrubba och skölj citronen i ljummet vatten. Riv skalet av citronen utan att få med det vita.",
        "Blanda crème fraiche med salt, peppar, citronskal och -juice plus din valda smaksättning.",
        "Bred blandningen över laxbitarna.",
        "Baka laxen mitt i ugnen ca 20 minuter.",
        "Till servering: Servera laxen med kokt potatis och en fräsch sallad."
    ]

    add_config("backend_base_address", "http://localhost:5000")
    add_config("image_base_path", "static/images")

    add_recipe_to_db(name, description, 175, 30, ingredients=ingredients, steps=steps)


@db_session
def add_recipe_to_db(name: str, description: str, temp: int, time: int, ingredients: list, steps: list) -> str:
    if Recipe.get(name=name) is None:
        if name.endswith(duplicate_text):
            name = name[:-len(duplicate_text)]

        recipe = create_new_recipe(name, description)
        if temp >= 0:
            recipe.oven_temp = temp
        if time >= 0:
            recipe.estimated_time = time

        if len(ingredients) > 0:
            for ingredient in ingredients:
                ing = Ingredient.get(name=ingredient["name"])
                if ing is None:
                    ing = Ingredient(name=ingredient["name"])

                unit = Unit.get(name=ingredient["unit"])
                if unit is None:
                    unit = Unit(name=ingredient["unit"])
                RecipeIngredient(recipe=recipe, ingredient=ing, unit=unit, amount=ingredient["amount"])

        if len(steps) > 0:
            for i in range(len(steps)):
                step = steps[i]
                RecipeStep(recipe=recipe, number=i + 1, step=step)

        return str(recipe.id)


@db_session
def add_image(name, recipe_id):
    RecipeImage(image=Image(name=name), recipe=recipe_id)


@db_session
def add_config(key, val):
    Config(key=key, value=val)


@db_session
def reset_db():
    print("!!!Resetting db!!!")
    db.execute("DROP SCHEMA public CASCADE;")
    db.execute("CREATE SCHEMA public;")


def setup(reset):
    if reset:
        reset_db()
        create_db()

    setup_db()
