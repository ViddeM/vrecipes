package db

import (
	"fmt"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"log"
	"os"
)

var db *gorm.DB

// TODO: Rename to 'init' when this package is used.
func Init() {
	envVars := common2.GetEnvVars()
	username := envVars.DbUser
	password := envVars.DbPassword
	dbName := envVars.DbName
	dbHost := envVars.DbHost

	dbUri := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, username, dbName, password) //Build connection string

	conn, err := gorm.Open(postgres.Open(dbUri), &gorm.Config{
		Logger: logger.New(
			log.New(os.Stdout, "\r\n", log.LstdFlags),
			logger.Config{
				Colorful:      true,
				LogLevel:      logger.Error, // Change to .Info for better debugging
			},
		),
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})

	if err != nil {
		log.Fatal(fmt.Sprintf("Failed to connect to database, err: %s", err))
	}

	db = conn
	if envVars.ResetDb {
		resetDb()
	}
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
	createTable(tables.Image{})
	createTable(tables.Ingredient{})
	createTable(tables.Recipe{})
	createTable(tables.RecipeImage{})
	createTable(tables.RecipeIngredient{})
	createTable(tables.RecipeStep{})
	createTable(tables.Unit{})
}

func createTable(model common2.NamedStruct) {
	err := db.AutoMigrate(model)
	if err != nil {
		log.Fatal(fmt.Sprintf("Failed to migrate table %s", model.StructName()))
	} else {
		log.Println(fmt.Sprintf("Successfully migrated table %s", model.StructName()))
	}
}