package commands

import "gorm.io/gorm"

var db *gorm.DB

func Init(conn *gorm.DB) {
	db = conn
}

func getDB() *gorm.DB {
	return db
}
