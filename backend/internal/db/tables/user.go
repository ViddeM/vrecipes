package tables

import "github.com/google/uuid"

type User struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:"name"`
}

func (_ User) StructName() string {
	return "User"
}
