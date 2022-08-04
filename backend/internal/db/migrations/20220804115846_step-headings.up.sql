ALTER TABLE recipe_step
    ADD COLUMN
        is_heading BOOL NOT NULL DEFAULT false;