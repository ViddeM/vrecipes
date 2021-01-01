package common

import (
	"fmt"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"gorm.io/gorm"
	"log"
)

var db *gorm.DB

func Init(database *gorm.DB) {
	db = database

	createTables()
}

// Get a reference to the database, should only ever be used within the db package and its subpackages
func GetDB() *gorm.DB {
	return db
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

func createTable(model NamedStruct) {
	err := db.AutoMigrate(model)
	if err != nil {
		log.Fatal(fmt.Sprintf("Failed to migrate table %s", model.StructName()))
	} else {
		log.Println(fmt.Sprintf("Successfully migrated table %s", model.StructName()))
	}
}

func RunTransaction(transaction func(*gorm.DB) error) error {
	err := db.Transaction(transaction)
	if err != nil {
		log.Printf("Database transaction failed: %s\n", err)
	}
	return err
}