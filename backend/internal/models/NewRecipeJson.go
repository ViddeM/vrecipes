package models

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"math"
)

type NewRecipeJson struct {
	Name            string                    `json:"name" binding:"required"`
	Description     string                    `json:"description"`
	OvenTemperature int                       `json:"ovenTemperature" binding:"required,lte=9999"`
	CookingTime     int                       `json:"cookingTime" binding:"required"`
	Steps           []NewRecipeStepJson       `json:"steps" binding:"required,dive,required"`
	Ingredients     []NewRecipeIngredientJson `json:"ingredients" binding:"required,dive,required"`
	Images          []NewRecipeImageJson      `json:"images" binding:"required,dive,required"`
}

type NewRecipeStepJson struct {
	Number uint16 `json:"number" validate:"required"`
	Step   string `json:"step" validate:"required"`
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
	ID uuid.UUID `json:"id" validate:"required"`
}

func (image *NewRecipeImageJson) SameAs(other *tables.Image) bool {
	return image.ID == other.ID
}

func floatsAreSame(a, b float32) bool {
	if math.Abs(float64(b-a)) < 0.0001 {
		return true
	}
	return false
}
