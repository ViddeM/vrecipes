CREATE TABLE tag
(
    id          uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    name        TEXT             NOT NULL,
    description TEXT             NOT NULL,
    color_red   INTEGER          NOT NULL,
    color_green INTEGER          NOT NULL,
    color_blue  INTEGER          NOT NULL,
    UNIQUE (name)
);

CREATE TABLE recipe_tag
(
    recipe_id uuid REFERENCES recipe (id),
    tag_id    uuid REFERENCES tag (id)
);