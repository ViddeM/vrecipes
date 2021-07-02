CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================
-- Drop old FKEYS
-- ==============================================================

ALTER TABLE recipe_book_image
    DROP CONSTRAINT recipe_book_image_image_id_fkey,
    DROP CONSTRAINT recipe_book_image_recipe_book_id_fkey;

ALTER TABLE recipe_book_recipe
    DROP CONSTRAINT recipe_book_recipe_recipe_id_fkey,
    DROP CONSTRAINT recipe_book_recipe_recipe_book_id_fkey;

ALTER TABLE recipe_image
    DROP CONSTRAINT fk_recipe_image_recipe,
    DROP CONSTRAINT fk_recipe_image_image;

ALTER TABLE recipe_ingredient
    DROP CONSTRAINT fk_recipe_ingredient_recipe;

ALTER TABLE recipe_step
    DROP CONSTRAINT fk_recipe_step_recipe;

ALTER TABLE recipe
    DROP CONSTRAINT fk_recipe_user;

ALTER TABLE recipe_book
    DROP CONSTRAINT recipe_book_created_by_fkey;

ALTER TABLE user_email
    DROP CONSTRAINT user_email_user_id_fkey;

-- ==============================================================
-- Do the update
-- ==============================================================
-- image
-- Drop pkey
ALTER TABLE image
    DROP CONSTRAINT image_pkey;

-- Rename old column
ALTER TABLE image
    RENAME COLUMN id TO old_id;

-- Create new id column
ALTER TABLE image
    ADD COLUMN id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4();

-- recipe
-- Drop pkey
ALTER TABLE recipe
    DROP CONSTRAINT recipe_pkey;

-- Rename old column
ALTER TABLE recipe
    RENAME COLUMN id TO old_id;

-- Create new id column
ALTER TABLE recipe
    ADD COLUMN id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4();

-- recipe book
-- Drop pkey
ALTER TABLE recipe_book
    DROP CONSTRAINT recipe_book_pkey;

-- Rename old column
ALTER TABLE recipe_book
    RENAME COLUMN id TO old_id;

-- Create new id column
ALTER TABLE recipe_book
    ADD COLUMN id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4();

-- recipe book
-- Drop pkey
ALTER TABLE recipe_ingredient
    DROP CONSTRAINT recipe_ingredient_pkey;

-- Rename old column
ALTER TABLE recipe_ingredient
    RENAME COLUMN id TO old_ing_id;

-- Create new id column
ALTER TABLE recipe_ingredient
    ADD COLUMN id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4();

-- User
-- Drop pkey
ALTER TABLE vrecipes_user
    DROP CONSTRAINT user_pkey;

-- Rename old column
ALTER TABLE vrecipes_user
    RENAME COLUMN id TO old_id;

-- Create new id column
ALTER TABLE vrecipes_user
    ADD COLUMN id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4();

-- ==============================================================
-- Update so that the referencing tables use the new pkey
-- ==============================================================
-- recipe book recipes
ALTER TABLE recipe_book_recipe
    RENAME COLUMN recipe_id TO old_recipe_id;

ALTER TABLE recipe_book_recipe
    RENAME COLUMN recipe_book_id TO old_recipe_book_id;

ALTER TABLE recipe_book_recipe
    ADD COLUMN recipe_id      uuid,
    ADD COLUMN recipe_book_id uuid;

-- recipe
UPDATE recipe_book_recipe *
SET recipe_id = subquery.id
FROM (
    SELECT old_recipe_id AS old_r_id, id, old_id, recipe_id
    FROM recipe_book_recipe
             JOIN recipe ON old_recipe_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_id;

-- recipe book
UPDATE recipe_book_recipe *
SET recipe_book_id = subquery.id
FROM (
    SELECT old_recipe_book_id AS old_r_id, id, old_id, recipe_book_id
    FROM recipe_book_recipe
             JOIN recipe_book ON old_recipe_book_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_book_id;

ALTER TABLE recipe_book_recipe
    ADD FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    ADD FOREIGN KEY (recipe_book_id) REFERENCES recipe_book (id),
    DROP COLUMN old_recipe_id,
    DROP COLUMN old_recipe_book_id,
    ALTER COLUMN recipe_id SET NOT NULL,
    ALTER COLUMN recipe_book_id SET NOT NULL;

-- recipe ingredient
ALTER TABLE recipe_ingredient
    RENAME COLUMN recipe_id TO old_recipe_id;

ALTER TABLE recipe_ingredient
    ADD COLUMN recipe_id uuid;

UPDATE recipe_ingredient *
SET recipe_id = subquery.id
FROM (
    SELECT old_recipe_id AS old_r_id, recipe.id, old_id, recipe_id
    FROM recipe_ingredient
             JOIN recipe ON old_recipe_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_id;

ALTER TABLE recipe_ingredient
    ADD FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    DROP COLUMN old_recipe_id,
    ALTER COLUMN recipe_id SET NOT NULL;

-- recipe step
ALTER TABLE recipe_step
    RENAME COLUMN recipe_id TO old_recipe_id;

ALTER TABLE recipe_step
    ADD COLUMN recipe_id uuid;

UPDATE recipe_step *
SET recipe_id = subquery.id
FROM (
    SELECT old_recipe_id AS old_r_id, recipe.id, old_id, recipe_id
    FROM recipe_step
             JOIN recipe ON old_recipe_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_id;

ALTER TABLE recipe_step
    ADD FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    DROP COLUMN old_recipe_id,
    ALTER COLUMN recipe_id SET NOT NULL;

-- recipe image
ALTER TABLE recipe_image
    RENAME COLUMN recipe_id TO old_recipe_id;

ALTER TABLE recipe_image
    RENAME COLUMN image_id TO old_image_id;

ALTER TABLE recipe_image
    ADD COLUMN recipe_id uuid,
    ADD COLUMN image_id  uuid;

-- Recipe
UPDATE recipe_image *
SET recipe_id = subquery.id
FROM (
    SELECT old_recipe_id AS old_r_id, id, old_id, recipe_id
    FROM recipe_image
             JOIN recipe ON old_recipe_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_id;

-- Image
UPDATE recipe_image *
SET image_id = subquery.id
FROM (
    SELECT old_image_id AS old_i_id, image.id, old_id, image_id
    FROM recipe_image
             JOIN image ON old_image_id = old_id
) AS subquery
WHERE subquery.old_id = old_image_id;

ALTER TABLE recipe_image
    ADD FOREIGN KEY (recipe_id) REFERENCES recipe (id),
    ADD FOREIGN KEY (image_id) REFERENCES image (id),
    DROP COLUMN old_recipe_id,
    DROP COLUMN old_image_id,
    ALTER COLUMN recipe_id SET NOT NULL,
    ALTER COLUMN image_id SET NOT NULL;


-- recipe book image
ALTER TABLE recipe_book_image
    RENAME COLUMN image_id TO old_image_id;

ALTER TABLE recipe_book_image
    RENAME COLUMN recipe_book_id TO old_recipe_book_id;

ALTER TABLE recipe_book_image
    ADD COLUMN image_id       uuid,
    ADD COLUMN recipe_book_id uuid;

UPDATE recipe_book_image *
SET image_id = subquery.id
FROM (
    SELECT old_image_id AS old_i_id, image.id, old_id, image_id
    FROM recipe_book_image
             JOIN image ON old_image_id = old_id
) AS subquery
WHERE subquery.old_id = old_image_id;

UPDATE recipe_book_image *
SET recipe_book_id = subquery.id
FROM (
    SELECT old_recipe_book_id AS old_i_id, id, old_id, recipe_book_id
    FROM recipe_book_image
             JOIN recipe_book ON old_recipe_book_id = old_id
) AS subquery
WHERE subquery.old_id = old_recipe_book_id;

ALTER TABLE recipe_book_image
    ADD FOREIGN KEY (image_id) REFERENCES image (id),
    ADD FOREIGN KEY (recipe_book_id) REFERENCES recipe_book (id),
    DROP COLUMN old_image_id,
    DROP COLUMN old_recipe_book_id,
    ALTER COLUMN image_id SET NOT NULL,
    ALTER COLUMN recipe_book_id SET NOT NULL;


-- recipe
ALTER TABLE recipe
    RENAME COLUMN created_by TO old_created_by;

ALTER TABLE recipe
    ADD COLUMN created_by uuid;

UPDATE recipe *
SET created_by = subquery.id
FROM (
    SELECT old_created_by AS old_cb, vrecipes_user.id, vrecipes_user.old_id AS vu_old_id, created_by
    FROM recipe
             JOIN vrecipes_user ON old_created_by = vrecipes_user.old_id
) AS subquery
WHERE subquery.vu_old_id = old_created_by;

ALTER TABLE recipe
    ADD FOREIGN KEY (created_by) REFERENCES vrecipes_user (id),
    DROP COLUMN old_created_by,
    ALTER COLUMN created_by SET NOT NULL;

-- recipe book
ALTER TABLE recipe_book
    RENAME COLUMN created_by TO old_created_by;

ALTER TABLE recipe_book
    ADD COLUMN created_by uuid;

UPDATE recipe_book *
SET created_by = subquery.id
FROM (
    SELECT old_created_by AS old_cb, vrecipes_user.id, vrecipes_user.old_id AS vu_old_id, created_by
    FROM recipe_book
             JOIN vrecipes_user ON old_created_by = vrecipes_user.old_id
) AS subquery
WHERE subquery.vu_old_id = old_created_by;

ALTER TABLE recipe_book
    ADD FOREIGN KEY (created_by) REFERENCES vrecipes_user (id),
    DROP COLUMN old_created_by,
    ALTER COLUMN created_by SET NOT NULL;

-- user email
ALTER TABLE user_email
    RENAME COLUMN user_id TO old_user_id;

ALTER TABLE user_email
    ADD COLUMN user_id uuid;

UPDATE user_email *
SET user_id = subquery.id
FROM (
    SELECT old_user_id AS old_ui, vrecipes_user.id, old_id, user_id
    FROM user_email
             JOIN vrecipes_user ON old_user_id = old_id
) AS subquery
WHERE subquery.old_id = old_user_id;

ALTER TABLE user_email
    ADD FOREIGN KEY (user_id) REFERENCES vrecipes_user (id),
    DROP COLUMN old_user_id,
    ALTER COLUMN user_id SET NOT NULL;

-- ==============================================================
-- Drop the tmp old columns
-- ==============================================================

ALTER TABLE recipe
    DROP COLUMN old_id;

ALTER TABLE image
    DROP COLUMN old_id;

ALTER TABLE recipe_book
    DROP COLUMN old_id;

ALTER TABLE recipe_ingredient
    DROP COLUMN old_ing_id;

ALTER TABLE vrecipes_user
    DROP COLUMN old_id;