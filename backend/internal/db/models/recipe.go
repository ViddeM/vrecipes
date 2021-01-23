package models

type Recipe struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"not null"`
	UniqueName string `gorm:"unique;not null"`
	Description string
	OvenTemp int
	EstimatedTime int
}

func (_ Recipe) StructName() string {
	return "Recipe"
}