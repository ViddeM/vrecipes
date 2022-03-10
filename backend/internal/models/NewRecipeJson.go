package models

type NewRecipeJson struct {
	Name string `json:"name" binding:"required"`
}
