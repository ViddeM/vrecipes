package commands

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func CreateUser(user *tables.User) error {
	user.ID = 0 // Make sure the ID follows the serial
	db := getDB()
	tx := db.Create(user)
	return tx.Error
}
