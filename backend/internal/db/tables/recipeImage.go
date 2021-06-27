package tables

import "github.com/google/uuid"

type RecipeImage struct {
	ImageID  uuid.UUID
	RecipeID uuid.UUID
}

func (_ RecipeImage) StructName() string {
	return "Recipe Image"
}
