package tables

import "github.com/google/uuid"

type RecipeStep struct {
	RecipeID uuid.UUID
	Number   uint16
	Step     string
}

func (_ RecipeStep) StructName() string {
	return "Recipe Step"
}
