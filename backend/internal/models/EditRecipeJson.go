package models

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"math"
)

type EditRecipeJson struct {
	Name            string                     `json:"name" binding:"required"`
	Description     string                     `json:"description"`
	OvenTemperature int                        `json:"ovenTemperature" binding:"lte=9999"`
	EstimatedTime   int                        `json:"estimatedTime"`
	Steps           []EditRecipeStepJson       `json:"steps" binding:"required,dive,required"`
	Ingredients     []EditRecipeIngredientJson `json:"ingredients" binding:"required,dive,required"`
	Images          []EditRecipeImageJson      `json:"images" binding:"required,dive,required"`
	Tags            []uuid.UUID                `json:"tags" binding:"required"`
}

type EditRecipeStepJson struct {
	Number      uint16 `json:"number" validate:"required"`
	Description string `json:"description" validate:"required"`
}

func (step *EditRecipeStepJson) SameAs(other *tables.RecipeStep) bool {
	return step.Number == other.Number && step.Description == other.Step
}

type EditRecipeIngredientJson struct {
	Name      string  `json:"name" validate:"required"`
	Unit      string  `json:"unit"`
	Amount    float32 `json:"amount"`
	IsHeading bool    `json:"isHeading" validate:"required"`
}

func (ingredient *EditRecipeIngredientJson) SameAs(other *tables.RecipeIngredient) bool {
	return ingredient.Name == other.IngredientName &&
		floatsAreSame(ingredient.Amount, other.Amount) &&
		ingredient.Unit == other.UnitName &&
		ingredient.IsHeading == other.IsHeading
}

type EditRecipeImageJson struct {
	ID uuid.UUID `json:"id" validate:"required"`
}

func (image *EditRecipeImageJson) SameAs(other *tables.Image) bool {
	return image.ID == other.ID
}

func floatsAreSame(a, b float32) bool {
	if math.Abs(float64(b-a)) < 0.0001 {
		return true
	}
	return false
}
