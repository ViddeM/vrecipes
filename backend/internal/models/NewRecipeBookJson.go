package models

type NewRecipeBookJson struct {
	Name string `json:"name" validate:"required"`
	Author string `json:"author"`
	Recipes []uint64 `json:"recipes" validate:"required"`
	Images []uint64 `json:"images" validate:"required"`
}