package models

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type DetailedRecipeBookJson struct {
	ID         uuid.UUID              `json:"id"`
	Name       string                 `json:"name"`
	UniqueName string                 `json:"uniqueName"`
	UploadedBy tables.User            `json:"uploadedBy"`
	Author     string                 `json:"author"`
	Recipes    []RecipeBookRecipeJson `json:"recipes"`
	Image      *ImageJson             `json:"image"`
}

type RecipeBookRecipeJson struct {
	ID         uuid.UUID `json:"id"`
	Name       string    `json:"name"`
	UniqueName string    `json:"uniqueName"`
	Author     string    `json:"author"`
}
