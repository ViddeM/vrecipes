CREATE TABLE IF NOT EXISTS image
(
    id   BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredient
(
    name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS unit
(
    name TEXT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS "user"
(
    id       BIGSERIAL PRIMARY KEY,
    name     TEXT NOT NULL,
    email    TEXT NOT NULL,
    provider TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe
(
    id             BIGSERIAL PRIMARY KEY,
    name           TEXT UNIQUE NOT NULL,
    unique_name    TEXT UNIQUE NOT NULL,
    description    TEXT,
    oven_temp      BIGINT,
    estimated_time BIGINT,
    deleted        BOOLEAN,
    created_by     BIGINT
        CONSTRAINT fk_recipe_user REFERENCES "user" (id)
);

CREATE TABLE IF NOT EXISTS recipe_image
(
    image_id  BIGINT
        -- Constraint named to support older DB versions
        CONSTRAINT fk_recipe_image_image REFERENCES image (id),
    recipe_id BIGINT
        -- Constraint named to support older DB versions
        CONSTRAINT fk_recipe_image_recipe REFERENCES recipe (id),
    PRIMARY KEY (image_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS recipe_ingredient
(
    id              BIGSERIAL PRIMARY KEY,
    recipe_id       BIGINT
        -- Constraint named to support older DB versions
        CONSTRAINT fk_recipe_ingredient_recipe REFERENCES recipe (id),
    ingredient_name TEXT REFERENCES ingredient (name),
    unit_name       TEXT REFERENCES unit (name) NOT NULL,
    amount          NUMERIC                     NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_step
(
    recipe_id BIGINT
        -- Constraint named to support older DB versions
        CONSTRAINT fk_recipe_step_recipe REFERENCES recipe (id),
    number    INTEGER,
    step      TEXT NOT NULL,
    PRIMARY KEY (recipe_id, number)
);