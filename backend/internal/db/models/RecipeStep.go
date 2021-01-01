package models

type RecipeStep struct {
	Recipe Recipe `gorm:"not null;primaryKey;embedded;embeddedPrefix:image_"`
	Number uint16 `gorm:"not null;primaryKey"`
	Step string `gorm:"not null"`
}

func (_ RecipeStep) StructName() string {
	return "Recipe Step"
}