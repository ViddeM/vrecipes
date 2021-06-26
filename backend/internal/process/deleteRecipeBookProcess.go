package process

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

func DeleteRecipeBook(recipeBook *tables.RecipeBook) error {
	deletedName := fmt.Sprintf("%s_%d_deleted", recipeBook.Name, recipeBook.ID)
	deletedUniqueName := fmt.Sprintf("%s_%d_deleted", recipeBook.UniqueName, recipeBook.ID)

	err := commands.RecipeBookSetDeleted(deletedName, deletedUniqueName, recipeBook.ID)
	return err
}
