package models

type Unit struct {
	Name string `gorm:"primaryKey" json:"name"`
}

func (_ Unit) StructName() string {
	return "Unit"
}