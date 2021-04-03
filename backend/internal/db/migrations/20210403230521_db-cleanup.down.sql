ALTER TABLE recipe
    ALTER COLUMN deleted DROP NOT NULL,
    ALTER COLUMN created_by DROP NOT NULL;

ALTER TABLE recipe_ingredient
    ALTER COLUMN recipe_id DROP NOT NULL,
    ALTER COLUMN ingredient_name DROP NOT NULL;

ALTER TABLE IF EXISTS vrecipes_user
    RENAME TO "user";