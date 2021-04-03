package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

var createIngredientCommand = `INSERT INTO ingredient VALUES ($1)`

func CreateIngredient(ingredient *tables.Ingredient) error {
	db, err := getDb()
	if err != nil {
		return err
	}
	defer db.Release()

	_, err = db.Exec(ctx, createIngredientCommand, ingredient.Name)
	return err
}