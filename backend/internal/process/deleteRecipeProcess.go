package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteRecipe(recipe *tables.Recipe) error {
	tx, err := commands.BeginTransaction()
	if err != nil {
		return err
	}
	defer commands.RollbackTransaction(tx)

	deletedName := fmt.Sprintf("%s_%s_deleted", recipe.Name, recipe.ID)
	deletedUniqueName := fmt.Sprintf("%s_%s_deleted", recipe.UniqueName, recipe.ID)

	err = commands.RecipeSetDeleted(tx, deletedName, deletedUniqueName, recipe.ID)
	if err != nil {
		return err
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return err
	}

	return nil
}
