package models

type NewRecipeBookJson struct {
	Name string `json:"name" binding:"required"`
}
