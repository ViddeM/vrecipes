package db

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

// TODO: Rename to 'init' when this package is used.
func Init() {
	username := os.Getenv("db_user")
	password := os.Getenv("db_password")
	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")

	dbUri := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, username, dbName, password) //Build connection string

	conn, err := gorm.Open(postgres.Open(dbUri), &gorm.Config{})

	if err != nil {
		log.Fatal(fmt.Sprintf("Failed to connect to database, err: %s", err))
	}

	common.Init(conn)

	setupDb()

	log.Println("Initialized database connection")
}