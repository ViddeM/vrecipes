package db

import (
	"encoding/json"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"github.com/viddem/vrecipes/backend/internal/db/models"
	"io/ioutil"
	"log"
	"os"
)

type RecipeJson struct {
	models.Recipe
	Ingredients []models.RecipeIngredient `json:"ingredients"`
	Steps       []models.RecipeStep       `json:"steps"`
}

type DefaultJson struct {
	Recipes []RecipeJson `json:"recipes"`
}

func setupDb() {
	resetDb()
	loadFromDefaults()
}

func resetDb() {
	db := common.GetDB()
	db.Exec("DROP SCHEMA public CASCADE")
	db.Exec("CREATE SCHEMA public")
}

func loadFromDefaults() {
	defaultsFile, err := os.Open("internal/db/defaults/defaults.json")
	if err != nil {
		log.Fatalf("Failed to load db defaults, err: %s", err)
	}

	defer defaultsFile.Close()

	byteVal, err := ioutil.ReadAll(defaultsFile)
	if err != nil {
		log.Fatalf("Unable to read db defaults, err: %s", err)
	}

	var defaultDb DefaultJson
	err = json.Unmarshal(byteVal, &defaultDb)
	if err != nil {
		log.Fatalf("Unable to parse json %v", byteVal)
	}

	for _, recipeJson := range defaultDb.Recipes {

	}
}