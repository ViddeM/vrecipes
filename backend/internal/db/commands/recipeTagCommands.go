package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeTagCommand = `
INSERT INTO recipe_tag(recipe_id, tag_id)
VALUES				  ($1,		  $2)
RETURNING recipe_id, tag_id
`

func CreateRecipeTag(recipeId, tagId uuid.UUID) (*tables.RecipeTag, error) {
	db := getDb()

	var recipeTag tables.RecipeTag
	err := pgxscan.Get(
		ctx,
		db,
		&recipeTag,
		createRecipeTagCommand,
		recipeId,
		tagId,
	)

	return &recipeTag, err
}

var deleteRecipeTagCommand = `
DELETE FROM recipe_tag
WHERE recipe_id=$1 AND tag_id=$2
`

func DeleteRecipeTag(recipeId, tagId uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(ctx, deleteRecipeTagCommand, recipeId, tagId)
	return err
}
