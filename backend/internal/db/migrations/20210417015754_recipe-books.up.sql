CREATE TABLE IF NOT EXISTS recipe_book
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    unique_name TEXT NOT NULL UNIQUE,
    author      TEXT NOT NULL,
    deleted     BOOLEAN NOT NULL,
    created_by  BIGINT REFERENCES vrecipes_user (id)
);

CREATE TABLE IF NOT EXISTS recipe_book_recipe
(
    recipe_book_id BIGINT REFERENCES recipe_book (id),
    recipe_id      BIGINT REFERENCES recipe (id),
    PRIMARY KEY (recipe_book_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS recipe_book_image
(
    recipe_book_id BIGINT REFERENCES recipe_book (id),
    image_id       BIGINT REFERENCES recipe (id),
    PRIMARY KEY (recipe_book_id, image_id)
)