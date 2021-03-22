package tables

type Image struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"not null"`
}

func (_ Image) StructName() string {
	return "Image"
}