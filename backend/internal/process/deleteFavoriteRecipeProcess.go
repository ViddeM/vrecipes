package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
)

func DeleteFavoriteRecipe(recipeId, userId uuid.UUID) error {
	return commands.DeleteFavoriteRecipe(recipeId, userId)
}
