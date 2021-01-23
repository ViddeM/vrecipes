package models

type Ingredient struct {
	Name string `gorm:"primaryKey"`
}

func (_ Ingredient) StructName() string {
	return "Ingredient"
}