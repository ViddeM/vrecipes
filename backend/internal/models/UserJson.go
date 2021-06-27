package models

import "github.com/google/uuid"

type User struct {
	Id     uuid.UUID   `json:"id"`
	Name   string      `json:"name"`
	Emails []UserEmail `json:"emails"`
}

type UserEmail struct {
	Email    string `json:"email"`
	Provider string `json:"provider"`
}
