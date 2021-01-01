package models

type Image struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string
}

func (_ Image) StructName() string {
	return "Image"
}