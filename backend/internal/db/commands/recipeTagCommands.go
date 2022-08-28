package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeTagCommand = `
INSERT INTO recipe_tag(recipe_id, tag_id)
VALUES				  ($1,		  $2)
RETURNING recipe_id, tag_id
`

func CreateRecipeTag(tx pgx.Tx, recipeId, tagId uuid.UUID) (*tables.RecipeTag, error) {
	var recipeTag tables.RecipeTag
	err := pgxscan.Get(
		ctx,
		tx,
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

func DeleteRecipeTag(tx pgx.Tx, recipeId, tagId uuid.UUID) error {
	_, err := tx.Exec(ctx, deleteRecipeTagCommand, recipeId, tagId)
	return err
}

var deleteRecipeTagsByTagIdCommand = `
DELETE FROM recipe_tag
WHERE tag_id=$1
`

func DeleteRecipeTagsByTagId(tx pgx.Tx, tagId uuid.UUID) error {
	_, err := tx.Exec(ctx, deleteRecipeTagsByTagIdCommand, tagId)
	return err
}
