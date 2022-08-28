package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v4"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookCommand = `
INSERT INTO recipe_book(name, unique_name, author, deleted, created_by)
				VALUES ($1,   $2, 	       $3,     false,   $4)
RETURNING id, name, unique_name, author, created_by, deleted
`

func CreateRecipeBook(tx pgx.Tx, name, uniqueName, author string, createdBy uuid.UUID) (
	*tables.RecipeBook,
	error,
) {
	var recipeBook tables.RecipeBook
	err := pgxscan.Get(
		ctx,
		tx,
		&recipeBook,
		createRecipeBookCommand,
		name,
		uniqueName,
		author,
		createdBy,
	)
	return &recipeBook, err
}

var updateRecipeBookCommand = `
UPDATE recipe_book
SET name=$1,
	unique_name=$2,
	author=$3
WHERE id=$4
`

func UpdateRecipeBook(tx pgx.Tx, name, uniqueName, author string, bookId uuid.UUID) error {
	_, err := tx.Exec(
		ctx,
		updateRecipeBookCommand,
		name,
		uniqueName,
		author,
		bookId,
	)
	return err
}

var recipeBookSetDeletedCommand = `
UPDATE recipe_book
SET deleted=true,
	name=$1,
	unique_name=$2
WHERE id=$3
`

func RecipeBookSetDeleted(tx pgx.Tx, name, uniqueName string, id uuid.UUID) error {
	_, err := tx.Exec(ctx, recipeBookSetDeletedCommand, name, uniqueName, id)
	return err
}
