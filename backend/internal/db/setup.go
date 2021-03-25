package db

import (
	"encoding/json"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/process"
	"io/ioutil"
	"log"
	"os"
)

type RecipeJson struct {
	tables.Recipe
	Ingredients []RecipeIngredientJson `json:"ingredients"`
	Steps       []RecipeStepJson       `json:"steps"`
	Image string `json:"image"`
}

type RecipeIngredientJson struct {
	Name string `json:"name"`
	Amount float32 `json:"amount"`
	Unit string `json:"unit"`
}

type RecipeStepJson string

type DefaultJson struct {
	Recipes []RecipeJson `json:"recipes"`
}

func setupDb() {
	loadFromDefaults()
}

func loadFromDefaults() {
	defaultsFile, err := os.Open("internal/db/defaults/defaults.json")
	if err != nil {
		log.Printf("Failed to load db defaults, err: %s", err)
		return
	}

	defer defaultsFile.Close()

	byteVal, err := ioutil.ReadAll(defaultsFile)
	if err != nil {
		log.Fatalf("Unable to read db defaults, err: %s", err)
	}

	var defaultDb DefaultJson
	err = json.Unmarshal(byteVal, &defaultDb)
	if err != nil {
		log.Fatalf("Unable to parse json %s, due to err: %s", string(byteVal), err)
	}

	for _, recipeJson := range defaultDb.Recipes {
		recipe, err := process.CreateRecipe(recipeJson.Name, recipeJson.Description, recipeJson.OvenTemp, recipeJson.EstimatedTime)
		if err != nil {
			log.Printf("Failed to create default recipe %+v, due to err: %s\n", recipeJson, err)
		}

		for num, step := range recipeJson.Steps {
			_, err := process.CreateRecipeStep(string(step), uint16(num), recipe.ID)
			if err != nil {
				log.Printf("Failed to create default recipe step %s, due to err: %s\n", step, err)
			}
		}

		for _, ingredient := range recipeJson.Ingredients {
			_, err = process.CreateRecipeIngredient(ingredient.Name, ingredient.Unit, ingredient.Amount, recipe.ID)
			if err != nil {
				log.Printf("Failed to create default recipe ingredient %+v, due to err: %s\n", ingredient, err)
			}
		}

		_, err = process.CreateRecipeImage(recipeJson.Image, recipe.ID)
		if err != nil {
			log.Printf("Failed to create default recipe image %s, due to err: %s\n", recipeJson.Image, err)
		}
	}
}
