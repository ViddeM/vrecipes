package models

import (
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"math"
)

type NewRecipeJson struct {
	Name            string                    `json:"name" validate:"required"`
	Description     string                    `json:"description"`
	OvenTemperature int                       `json:"ovenTemperature" validate:"required,lte=9999"`
	CookingTime     int                       `json:"cookingTime" validate:"required"`
	Steps           []NewRecipeStepJson       `json:"steps" validate:"required,dive,required"`
	Ingredients     []NewRecipeIngredientJson `json:"ingredients" validate:"required,dive,required"`
	Images          []NewRecipeImageJson      `json:"images" validate:"required,dive,required"`
}

type NewRecipeStepJson struct {
	Number      uint16 `json:"number" validate:"required"`
	Step string `json:"step" validate:"required"`
}

func (step *NewRecipeStepJson) SameAs(other *tables.RecipeStep) bool {
	return step.Number == other.Number && step.Step == other.Step
}

type NewRecipeIngredientJson struct {
	Name   string  `json:"name" validate:"required"`
	Unit   string  `json:"unit"`
	Amount float32 `json:"amount"`
}

func (ingredient *NewRecipeIngredientJson) SameAs(other *tables.RecipeIngredient) bool {
	return ingredient.Name == other.IngredientName &&
		floatsAreSame(ingredient.Amount, other.Amount) &&
		ingredient.Unit == other.UnitName
}

type NewRecipeImageJson struct {
	ID uint64 `json:"id" validate:"required"`
}

func (image *NewRecipeImageJson) SameAs(other *tables.Image) bool {
	return image.ID == other.ID
}

func floatsAreSame(a, b float32) bool {
	if math.Abs(float64(b - a)) < 0.0001 {
		return true
	}
	return false
}