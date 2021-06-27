package tables

import "github.com/google/uuid"

type RecipeBookRecipe struct {
	RecipeBookId uuid.UUID
	RecipeId     uuid.UUID
}
