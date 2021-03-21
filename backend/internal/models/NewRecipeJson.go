package models

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

type NewRecipeIngredientJson struct {
	Name   string  `json:"name" validate:"required"`
	Unit   string  `json:"unit" validate:"required"`
	Amount float32 `json:"amount" validate:"required"`
}

type NewRecipeImageJson struct {
	ID uint64 `json:"id" validate:"required"`
}