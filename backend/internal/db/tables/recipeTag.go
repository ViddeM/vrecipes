package tables

import "github.com/google/uuid"

type RecipeTag struct {
	RecipeID uuid.UUID
	TagId    uuid.UUID
}

func (_ RecipeTag) StructName() string {
	return "Recipe Tag"
}
