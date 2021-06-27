package models

import "github.com/google/uuid"

type NewRecipeBookJson struct {
	Name    string      `json:"name" validate:"required"`
	Author  string      `json:"author"`
	Recipes []uuid.UUID `json:"recipes" validate:"required"`
	Images  []uuid.UUID `json:"images" validate:"required"`
}
