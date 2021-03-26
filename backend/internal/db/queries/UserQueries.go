package queries

import "github.com/viddem/vrecipes/backend/internal/db/tables"

func GetUser(id uint64) (*tables.User, error) {
	db := getDB()
	var user tables.User
	tx := db.Where(&tables.User{
		ID: id,
	}, "id").First(&user)

	return &user, tx.Error
}

func GetUserByEmail(email string) (*tables.User, error) {
	db := getDB()
	var user tables.User
	tx := db.Where(&tables.User{
		Email: email,
	}, "email").First(&user)
	return &user, tx.Error
}
