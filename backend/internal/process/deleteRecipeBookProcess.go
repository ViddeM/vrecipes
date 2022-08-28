package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteRecipeBook(recipeBook *tables.RecipeBook) error {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return err
	}
	defer commands.RollbackTransaction(tx)

	deletedName := fmt.Sprintf("%s_%s_deleted", recipeBook.Name, recipeBook.ID)
	deletedUniqueName := fmt.Sprintf("%s_%s_deleted", recipeBook.UniqueName, recipeBook.ID)

	err = commands.RecipeBookSetDeleted(tx, deletedName, deletedUniqueName, recipeBook.ID)
	if err != nil {
		return err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return err
	}

	return nil
}
