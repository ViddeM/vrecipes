package models

// An ingredient in a recipe
type RecipeIngredient struct {
	Recipe Recipe `gorm:"not null;primaryKey;embedded;embeddedPrefix:image_"`
	Ingredient Ingredient `gorm:"not null;primaryKey;embedded;embeddedPrefix:image_"`
	Unit Unit `gorm:"not null;embedded;embeddedPrefix:image_"`
	Amount float32 `gorm:"not null"`
}

func (_ RecipeIngredient) StructName() string {
	return "Recipe Ingredient"
}