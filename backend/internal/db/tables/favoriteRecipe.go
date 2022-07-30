package tables

import "github.com/google/uuid"

type FavoriteRecipe struct {
	RecipeID uuid.UUID
	TagId    uuid.UUID
}

func (_ FavoriteRecipe) StructName() string {
	return "Favorite Recipe"
}
