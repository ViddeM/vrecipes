# Insert temp data into the database
from pony.orm import db_session, raw_sql

from db import Recipe, Ingredient, RecipeIngredient, RecipeStep, RecipeImage, Image, db, create_db


@db_session
def setup_db():
    # https://www.ica.se/recept/chokladkaka-med-chokladkram-och-bar-4214/
    name = "Chokladkaka med chokladkräm och bär"

    if Recipe.get(name=name) is None:
        # Create the recipe
        description = "Chokladkaka med chokladkräm och bär är den perfekta efterrätten som passar alla åldrar och vid alla tillfällen. Denna delikata dessert med en härlig chokladbotten och en krämig chokladkräm ovanpå dekoreras med färska bär."
        recipe = Recipe(name=name, description=description)

        # Add the ingredients
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="smör"), amount="100 g")
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="ägg"), amount="2")
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="socker"), amount="2 dl")
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="vetemjöl"), amount="1 dl")
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="siktad kakao"), amount="1/2 dl")
        RecipeIngredient(recipe=recipe, ingredient=Ingredient(name="vaniljsocker"), amount="1 tsk")

        # Add the steps
        RecipeStep(recipe=recipe, step="Sätt ugnen på 175 °C.", number=1)
        RecipeStep(recipe=recipe, step="Smält smöret och låt det svalna.", number=2)
        RecipeStep(recipe=recipe, step="Vispa ägg och socker pösigt. Blanda samman mjöl, kakao och vaniljsocker. Rör ner mjölblandningen i äggsmeten. Tillsätt smöret. ", number=3)
        RecipeStep(recipe=recipe, step="Häll i en smord bröad form (ca 20 cm i diameter, för 8 bitar), gärna med löstagbar botten. Grädda i ca 25 minuter. Låt den stå och kallna så stelnar den.", number=4)

        RecipeImage(image=Image(location="chokladkaka.webp"), recipe=recipe)


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
