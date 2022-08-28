package queries

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var getTagByNameQuery = `
SELECT id, name, description, color_red, color_green, color_blue, created_by
FROM tag
WHERE name=$1
`

func GetTagByName(name string) (*tables.Tag, error) {
	db := getDb()

	var tag tables.Tag
	err := pgxscan.Get(ctx, db, &tag, getTagByNameQuery, name)
	return &tag, err
}

var getTagByIdQuery = `
SELECT id, name, description, color_red, color_green, color_blue, created_by
FROM tag
WHERE id=$1
`

func GetTagById(id uuid.UUID) (*tables.Tag, error) {
	db := getDb()

	var tag tables.Tag
	err := pgxscan.Get(ctx, db, &tag, getTagByIdQuery, id)
	return &tag, err
}

var getAllTagsQuery = `
SELECT id, name, description, color_red, color_green, color_blue, created_by
FROM tag
`

func GetAllTags() ([]*tables.Tag, error) {
	db := getDb()

	var tags []*tables.Tag
	err := pgxscan.Select(ctx, db, &tags, getAllTagsQuery)

	return tags, err
}

var getTagsForRecipeQuery = `
SELECT id, name, description, color_red, color_green, color_blue, created_by
FROM recipe_tag
	JOIN tag ON recipe_tag.tag_id = tag.id
WHERE recipe_tag.recipe_id = $1
`

func GetTagsForRecipe(recipeId uuid.UUID) ([]*tables.Tag, error) {
	db := getDb()

	var tags []*tables.Tag
	err := pgxscan.Select(ctx, db, &tags, getTagsForRecipeQuery, recipeId)

	return tags, err
}
