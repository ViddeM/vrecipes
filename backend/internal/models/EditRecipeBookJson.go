package models

import "github.com/google/uuid"

type EditRecipeBookJson struct {
	Name    string      `json:"name" binding:"required"`
	Author  string      `json:"author"`
	Recipes []uuid.UUID `json:"recipes" binding:"required"`
	Images  []uuid.UUID `json:"images" binding:"required"`
}
