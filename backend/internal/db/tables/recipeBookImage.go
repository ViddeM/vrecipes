package tables

import "github.com/google/uuid"

type RecipeBookImage struct {
	RecipeBookId uuid.UUID
	ImageId      uuid.UUID
}
