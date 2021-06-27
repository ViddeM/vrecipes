package tables

import "github.com/google/uuid"

type Image struct {
	ID   uuid.UUID
	Name string
}

func (_ Image) StructName() string {
	return "Image"
}
