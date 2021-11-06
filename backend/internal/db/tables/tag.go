package tables

import "github.com/google/uuid"

type Tag struct {
	ID          uuid.UUID
	Name        string
	Description string
	ColorRed    uint8
	ColorGreen  uint8
	ColorBlue   uint8
	CreatedBy   uuid.UUID
}

func (_ Tag) StructName() string {
	return "Tag"
}
