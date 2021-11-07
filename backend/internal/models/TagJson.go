package models

import (
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
)

type TagJson struct {
	ID          uuid.UUID   `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Color       ColorJson   `json:"color"`
	RecipeCount uint64      `json:"recipeCount"`
	Author      tables.User `json:"author"`
}
