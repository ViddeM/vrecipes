package models

// An ingredient in a recipe
type RecipeIngredient struct {
	Recipe Recipe
	RecipeID uint64 `gorm:"primaryKey"`
	Ingredient Ingredient
	IngredientName string `gorm:"primaryKey"`
	Unit Unit
	UnitName string `gorm:"not null"`
	Amount float32 `gorm:"not null"`
}

func (_ RecipeIngredient) StructName() string {
	return "Recipe Ingredient"
}