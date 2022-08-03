ALTER TABLE recipe_ingredient
ADD COLUMN
    is_heading BOOL NOT NULL DEFAULT false;