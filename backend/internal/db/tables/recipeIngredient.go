package tables

// An ingredient in a recipe
type RecipeIngredient struct {
	ID uint64 `gorm:"autoIncrement"`
	Recipe Recipe
	RecipeID uint64
	Ingredient Ingredient
	IngredientName string
	Unit Unit
	UnitName string `gorm:"not null"`
	Amount float32 `gorm:"not null"`
}

func (_ RecipeIngredient) StructName() string {
	return "Recipe Ingredient"
}