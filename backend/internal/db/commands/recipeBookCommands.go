package commands

import (
	"github.com/georgysavva/scany/pgxscan"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

var createRecipeBookCommand = `
INSERT INTO recipe_book(name, unique_name, author, deleted, created_by)
				VALUES ($1,   $2, 	       $3,     false,   $4)
RETURNING id, name, unique_name, author
`

func CreateRecipeBook(name, uniqueName, author string, createdBy uint64) (*tables.RecipeBook, error) {
	db := getDb()

	var recipeBook tables.RecipeBook
	err := pgxscan.Get(ctx, db, &recipeBook, createRecipeBookCommand, name, uniqueName, author, false, createdBy)
	return &recipeBook, err
}