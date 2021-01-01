package models

type Recipe struct {
	ID uint64 `gorm:"autoIncrement"`
	Name string `gorm:"not null" json:"name"`
	UniqueName string `gorm:"unique;not null"`
	Description string `json:"description`
	OvenTemp int `json:"ovenTemp"`
	EstimatedTime int `json:"estimatedTime"`
}

func (_ Recipe) StructName() string {
	return "Recipe"
}