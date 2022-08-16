package tables

import "github.com/google/uuid"

type Recipe struct {
	ID            uuid.UUID
	Name          string
	UniqueName    string
	Description   string
	OvenTemp      int
	EstimatedTime int
	Deleted       bool
	CreatedBy     uuid.UUID
	Portions      int
}

func (_ Recipe) StructName() string {
	return "Recipe"
}
