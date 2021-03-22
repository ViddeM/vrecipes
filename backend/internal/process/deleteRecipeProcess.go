package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteRecipe(recipe *tables.Recipe) error {
	deletedRecipe := tables.Recipe{
		ID:            recipe.ID,
		Name:          fmt.Sprintf("%s_%d_deleted", recipe.Name, recipe.ID),
		UniqueName:    fmt.Sprintf("%s_%d_deleted", recipe.UniqueName, recipe.ID),
		Deleted:       true,
	}

	err := commands.EditRecipe(&deletedRecipe)
	return err
}