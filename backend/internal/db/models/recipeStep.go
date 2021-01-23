package models

type RecipeStep struct {
	Recipe Recipe
	RecipeID uint64 `gorm:"primaryKey"`
	Number uint16 `gorm:"primaryKey"`
	Step string `gorm:"not null"`
}

func (_ RecipeStep) StructName() string {
	return "Recipe Step"
}