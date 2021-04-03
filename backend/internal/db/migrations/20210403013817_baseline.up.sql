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
    created_by     BIGINT REFERENCES "user"(id)
);

CREATE TABLE IF NOT EXISTS recipe_image
(
    image_id  BIGINT REFERENCES image (id),
    recipe_id BIGINT REFERENCES recipe (id),
    PRIMARY KEY (image_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS recipe_ingredient
(
    id              BIGSERIAL PRIMARY KEY,
    recipe_id       BIGINT REFERENCES recipe (id),
    ingredient_name TEXT REFERENCES ingredient (name),
    unit_name       TEXT REFERENCES unit (name) NOT NULL,
    amount          NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_step
(
    recipe_id BIGINT REFERENCES recipe (id),
    number    INTEGER,
    step      TEXT NOT NULL,
    PRIMARY KEY (recipe_id, number)
);