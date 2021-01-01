package models

type Unit struct {
	Name string `gorm:"primaryKey"`
}

func (_ Unit) StructName() string {
	return "Unit"
}