CREATE TABLE favorite_recipe
(
    recipe_id uuid REFERENCES recipe (id),
    user_id   uuid REFERENCES vrecipes_user (id),
    PRIMARY KEY(recipe_id, user_id)
);