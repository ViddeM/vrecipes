package tables

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
)

// RecipeIngredient An ingredient in a recipe
type RecipeIngredient struct {
	ID             uuid.UUID
	RecipeID       uuid.UUID
	IngredientName string
	UnitName       string
	Amount         float32
	Number         int
	IsHeading      bool
}

func (_ RecipeIngredient) StructName() string {
	return "Recipe Ingredient"
}

func (recIng *RecipeIngredient) Equals(other *RecipeIngredient) bool {
	return recIng.ID == other.ID &&
		recIng.RecipeID == other.RecipeID &&
		recIng.IngredientName == other.IngredientName &&
		recIng.UnitName == other.UnitName &&
		recIng.IsHeading == other.IsHeading &&
		common.FloatsAreSame(recIng.Amount, other.Amount)
}
