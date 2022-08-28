package process

import (
	"encoding/json"
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/redis"
	"io/ioutil"
	"log"
	"net/http"
)

type ExportData struct {
	Recipes     []ExportRecipe     `json:"recipes"`
	Tags        []ExportTag        `json:"tags"`
	RecipeBooks []ExportRecipeBook `json:"recipeBooks"`
}

type ExportRecipe struct {
	Name           string `json:"name"`
	UniqueName     string `json:"uniqueName"`
	Description    string `json:"description"`
	OvenTemp       int    `json:"ovenTemp"`
	EstimatedTime  int    `json:"estimatedTime"`
	Portions       int    `json:"portions"`
	PortionsSuffix string `json:"portionsSuffix"`

	Ingredients []ExportIngredient `json:"ingredients"`
	Steps       []ExportStep       `json:"steps"`
	ImageUrls   []string           `json:"imageUrls"`
}

type ExportIngredient struct {
	Number    int     `json:"number"`
	Name      string  `json:"name"`
	Unit      string  `json:"unit"`
	Amount    float32 `json:"amount"`
	IsHeading bool    `json:"isHeading"`
}

type ExportStep struct {
	Number      uint16 `json:"number"`
	Description string `json:"description"`
	IsHeading   bool   `json:"isHeading"`
}

type ExportTag struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ColorRed    uint8  `json:"colorRed"`
	ColorGreen  uint8  `json:"colorGreen"`
	ColorBlue   uint8  `json:"colorBlue"`
}

type ExportRecipeBook struct {
	Name              string   `json:"name"`
	UniqueName        string   `json:"uniqueName"`
	Author            string   `json:"author"`
	RecipeUniqueNames []string `json:"recipeUniqueNames"`
	Image             *string  `json:"image"`
}

func SetupExportData(recipeIds, tagIds, recipeBookIds []uuid.UUID) (*uuid.UUID, error) {
	var exportRecipes []ExportRecipe
	for _, recipeId := range recipeIds {
		exportRecipe, err := getExportRecipe(recipeId)
		if err != nil {
			log.Printf("Failed to get export recipe, err: %v\n", err)
			return nil, err
		}

		exportRecipes = append(exportRecipes, *exportRecipe)
	}

	var exportTags []ExportTag
	for _, tagId := range tagIds {
		exportTag, err := getExportTag(tagId)
		if err != nil {
			log.Printf("Failed to get export tag, err: %v\n", err)
			return nil, err
		}

		exportTags = append(exportTags, *exportTag)
	}

	var exportRecipeBooks []ExportRecipeBook
	for _, recipeBookId := range recipeBookIds {
		exportRecipeBook, err := getExportRecipeBook(recipeBookId, recipeIds)
		if err != nil {
			log.Printf("Failed to get export recipe book, err: %v\n", err)
			return nil, err
		}

		exportRecipeBooks = append(exportRecipeBooks, *exportRecipeBook)
	}

	exportData := ExportData{
		Recipes:     exportRecipes,
		Tags:        exportTags,
		RecipeBooks: exportRecipeBooks,
	}

	exportDataJson, err := json.Marshal(exportData)
	if err != nil {
		log.Printf("Failed to marshal export data to json, err: %v\n", err)
		return nil, err
	}

	exportId, err := uuid.NewUUID()
	if err != nil {
		log.Printf("Failed to generate export id, err: %v\n", err)
		return nil, err
	}

	err = redis.InsertExportDataJson(exportId, string(exportDataJson))
	if err != nil {
		log.Printf("Failed to insert export data to redis, err: %v\n", err)
		return nil, err
	}

	return &exportId, nil
}

func getExportRecipe(recipeId uuid.UUID) (*ExportRecipe, error) {
	recipe, err := queries.GetRecipeById(recipeId)
	if err != nil {
		log.Printf("Failed to get recipe, err: %v\n", err)
		if pgxscan.NotFound(err) {
			return nil, common.ErrNoSuchRecipe
		}

		return nil, err
	}

	ingredients, err := queries.GetIngredientsForRecipe(recipeId)
	if err != nil {
		log.Printf("Failed to get recipe ingredients, err: %v\n", err)
		return nil, err
	}

	var exportIngredients []ExportIngredient
	for _, ing := range ingredients {
		exportIngredients = append(exportIngredients, ExportIngredient{
			Number:    ing.Number,
			Name:      ing.IngredientName,
			Unit:      ing.UnitName,
			Amount:    ing.Amount,
			IsHeading: ing.IsHeading,
		})
	}

	steps, err := queries.GetStepsForRecipe(recipeId)
	if err != nil {
		log.Printf("Failed to get recipe steps, err: %v\n", err)
		return nil, err
	}

	var exportSteps []ExportStep
	for _, step := range steps {
		exportSteps = append(exportSteps, ExportStep{
			Number:      step.Number,
			Description: step.Step,
			IsHeading:   step.IsHeading,
		})
	}

	images, err := queries.GetImagesForRecipe(recipeId)
	if err != nil {
		log.Printf("Failed to get recipe images, err: %v\n", err)
		return nil, err
	}

	var imageUrls []string
	for _, img := range images {
		imageUrls = append(imageUrls, imageToAddress(img.ID, img.Name))
	}

	return &ExportRecipe{
		Name:           recipe.Name,
		UniqueName:     recipe.UniqueName,
		Description:    recipe.Description,
		OvenTemp:       recipe.OvenTemp,
		EstimatedTime:  recipe.EstimatedTime,
		Portions:       recipe.Portions,
		PortionsSuffix: recipe.PortionsSuffix,
		Ingredients:    exportIngredients,
		Steps:          exportSteps,
		ImageUrls:      imageUrls,
	}, nil
}

func getExportTag(tagId uuid.UUID) (*ExportTag, error) {
	tag, err := queries.GetTagById(tagId)
	if err != nil {
		log.Printf("Failed to get tag, err: %v\n", err)
		if pgxscan.NotFound(err) {
			return nil, common.ErrNoSuchTag
		}

		return nil, err
	}

	return &ExportTag{
		Name:        tag.Name,
		Description: tag.Description,
		ColorRed:    tag.ColorRed,
		ColorGreen:  tag.ColorGreen,
		ColorBlue:   tag.ColorBlue,
	}, nil
}

func getExportRecipeBook(recipeBookId uuid.UUID, recipeIds []uuid.UUID) (*ExportRecipeBook, error) {
	recipeBook, err := queries.GetRecipeBookById(recipeBookId)
	if err != nil {
		log.Printf("Failed to get recipe book, err: %v\n", err)
		if pgxscan.NotFound(err) {
			return nil, common.ErrNoSuchRecipeBook
		}

		return nil, err
	}

	recipeBookRecipes, err := queries.GetRecipesForRecipeBook(recipeBookId)
	if err != nil {
		log.Printf("Failed to get recipes for book, err: %v\n", err)
		return nil, err
	}

	var includedRecipeUniqueNames []string
	for _, rec := range recipeBookRecipes {
		for _, recipeId := range recipeIds {
			if rec.ID == recipeId {
				includedRecipeUniqueNames = append(includedRecipeUniqueNames, rec.UniqueName)
				break
			}
		}
	}

	image, err := queries.GetImageForRecipeBook(recipeBookId)
	if err != nil && !pgxscan.NotFound(err) {
		log.Printf("Failed to get image for recipe book, err: %v\n", err)
		return nil, err
	}

	var imageUrl *string
	if image != nil {
		address := imageToAddress(image.ID, image.Name)
		imageUrl = &address
	}

	return &ExportRecipeBook{
		Name:              recipeBook.Name,
		UniqueName:        recipeBook.UniqueName,
		Author:            recipeBook.Author,
		RecipeUniqueNames: includedRecipeUniqueNames,
		Image:             imageUrl,
	}, nil
}

func GetExportDataById(id uuid.UUID) (*ExportData, error) {
	data, err := redis.GetExportDataJson(id)
	if err != nil {
		log.Printf("Failed to get export data from redis, err: %v\n", err)
		return nil, err
	}

	err = redis.DeleteExportData(id)
	if err != nil {
		log.Printf("Failed to delete export data from redis, err: %v\n", err)
		return nil, err
	}

	bytes := []byte(data)

	var exportData *ExportData
	err = json.Unmarshal(bytes, &exportData)
	if err != nil {
		log.Printf("Failed to deserialize json in redis, err: %v\n", err)
		return nil, err
	}

	return exportData, nil
}

func ImportData(url string, user *tables.User) error {
	importData, err := importDataFromUrl(url)
	if err != nil {
		log.Printf("Failed to import data from url, err: %v\n", err)
		return err
	}

	for _, rec := importData.Recipes {
		rec
	}
}
