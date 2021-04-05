package models

type User struct {
	Id uint64 `json:"id"`
	Name string `json:"name"`
	Emails []UserEmail `json:"emails"`
}

type UserEmail struct {
	Email string `json:"email"`
	Provider string `json:"provider"`
}