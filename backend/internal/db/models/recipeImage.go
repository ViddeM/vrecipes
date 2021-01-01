package models

type RecipeImage struct {
	Image Image  `gorm:"primaryKey;embedded;embeddedPrefix:image_"`
	Recipe Recipe `gorm:"primaryKey;embedded;embeddedPrefix:recipe_"`
}

func (_ RecipeImage) StructName() string {
	return "Recipe Image"
}