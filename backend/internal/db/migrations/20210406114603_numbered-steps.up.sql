ALTER TABLE recipe_ingredient
    ADD COLUMN number INTEGER;

UPDATE recipe_ingredient AS ingredient
SET number=(
    SELECT COUNT(*) FROM recipe_ingredient WHERE recipe_id=ingredient.recipe_id AND id < ingredient.id
);

ALTER TABLE recipe_ingredient
    ALTER COLUMN number SET NOT NULL,
    ADD UNIQUE (recipe_id, number);
;


