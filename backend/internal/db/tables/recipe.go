package tables

type Recipe struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"unique;not null"`
	UniqueName string `gorm:"unique;not null"`
	Description string
	OvenTemp int
	EstimatedTime int
	Deleted bool
	CreatedBy uint64
	User User `gorm:"foreignKey:CreatedBy"`
}

func (_ Recipe) StructName() string {
	return "Recipe"
}