package process

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
)

func CreateFavoriteRecipe(recipeId, userId uuid.UUID) error {
	_, err := commands.CreateFavoriteRecipe(recipeId, userId)
	return err
}
