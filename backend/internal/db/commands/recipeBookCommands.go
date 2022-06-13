package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookCommand = `
INSERT INTO recipe_book(name, unique_name, author, deleted, created_by)
				VALUES ($1,   $2, 	       '',     false,   $3)
RETURNING id, name, unique_name, author
`

func CreateRecipeBook(name, uniqueName string, createdBy uuid.UUID) (
	*tables.RecipeBook,
	error,
) {
	db := getDb()

	var recipeBook tables.RecipeBook
	err := pgxscan.Get(
		ctx,
		db,
		&recipeBook,
		createRecipeBookCommand,
		name,
		uniqueName,
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

func UpdateRecipeBook(name, uniqueName, author string, bookId uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(
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

func RecipeBookSetDeleted(name, uniqueName string, id uuid.UUID) error {
	db := getDb()

	_, err := db.Exec(ctx, recipeBookSetDeletedCommand, name, uniqueName, id)
	return err
}
