package models

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type DetailedRecipeJson struct {
	ID              uuid.UUID              `json:"id"`
	Name            string                 `json:"name"`
	Description     string                 `json:"description"`
	OvenTemperature int                    `json:"ovenTemperature"`
	EstimatedTime   int                    `json:"estimatedTime"`
	Steps           []RecipeStepJson       `json:"steps"`
	Ingredients     []RecipeIngredientJson `json:"ingredients"`
	Images          []ImageJson            `json:"images"`
	Author          tables.User            `json:"author"`
	Tags            []TagJson              `json:"tags"`
}

type RecipeStepJson struct {
	Number      uint16 `json:"number"`
	Description string `json:"description"`
}

type RecipeIngredientJson struct {
	Name   string  `json:"name"`
	Unit   string  `json:"unit"`
	Amount float32 `json:"amount"`
}

type ImageJson struct {
	Path string    `json:"url"`
	ID   uuid.UUID `json:"id"`
}
