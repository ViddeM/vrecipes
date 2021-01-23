package db

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var db *gorm.DB

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

	db = conn
	resetDb()
	commands.Init(db)
	queries.Init(db)
	createTables()
	setupDb()
	log.Println("Initialized database connection")
}

func resetDb() {
	db.Exec("DROP SCHEMA public CASCADE")
	db.Exec("CREATE SCHEMA public")
}

func createTables() {
	createTable(models.Image{})
	createTable(models.Ingredient{})
	createTable(models.Recipe{})
	createTable(models.RecipeImage{})
	createTable(models.RecipeIngredient{})
	createTable(models.RecipeStep{})
	createTable(models.Unit{})
}

func createTable(model common.NamedStruct) {
	err := db.AutoMigrate(model)
	if err != nil {
		log.Fatal(fmt.Sprintf("Failed to migrate table %s", model.StructName()))
	} else {
		log.Println(fmt.Sprintf("Successfully migrated table %s", model.StructName()))
	}
}