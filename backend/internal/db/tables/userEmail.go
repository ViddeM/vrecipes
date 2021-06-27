package tables

import "github.com/google/uuid"

type UserEmail struct {
	UserId   uuid.UUID
	Email    string
	Provider string
}
