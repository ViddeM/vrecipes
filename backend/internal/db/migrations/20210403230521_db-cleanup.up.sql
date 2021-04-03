ALTER TABLE recipe
    ALTER COLUMN deleted    SET NOT NULL,
    ALTER COLUMN created_by SET NOT NULL;

ALTER TABLE recipe_ingredient
    ALTER COLUMN recipe_id          SET NOT NULL,
    ALTER COLUMN ingredient_name    SET NOT NULL;

ALTER TABLE IF EXISTS public.user
    RENAME TO vrecipes_user;