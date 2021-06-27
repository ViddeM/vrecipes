package tables

import "github.com/google/uuid"

type RecipeBook struct {
	ID         uuid.UUID
	Name       string
	UniqueName string
	Author     string
	CreatedBy  uuid.UUID
	Deleted    bool
}
