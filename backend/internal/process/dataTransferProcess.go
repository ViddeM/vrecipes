package process

import (
	"encoding/json"
	"errors"
	"github.com/georgysavva/scany/pgxscan"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"github.com/viddem/vrecipes/backend/redis"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
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
	TagNames    []string           `json:"tagNames"`
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
	var exportTags []ExportTag
	for _, tagId := range tagIds {
		exportTag, err := getExportTag(tagId)
		if err != nil {
			log.Printf("Failed to get export tag, err: %v\n", err)
			return nil, err
		}

		exportTags = append(exportTags, *exportTag)
	}

	var exportRecipes []ExportRecipe
	for _, recipeId := range recipeIds {
		exportRecipe, err := getExportRecipe(recipeId, tagIds)
		if err != nil {
			log.Printf("Failed to get export recipe, err: %v\n", err)
			return nil, err
		}

		exportRecipes = append(exportRecipes, *exportRecipe)
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

func getExportRecipe(recipeId uuid.UUID, includedTagIds []uuid.UUID) (*ExportRecipe, error) {
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

	tags, err := queries.GetTagsForRecipe(recipeId)
	if err != nil {
		log.Printf("Failed to get recipe tags, err: %v\n", err)
		return nil, err
	}

	var tagNames []string
	for _, tag := range tags {
		for _, includedTagID := range includedTagIds {
			if includedTagID == tag.ID {
				tagNames = append(tagNames, tag.Name)
			}
		}
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
		TagNames:       tagNames,
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
	tx, err := commands.BeginTransaction()
	if err != nil {
		return err
	}
	defer commands.RollbackTransaction(tx)

	importData, err := importDataFromUrl(url)
	if err != nil {
		log.Printf("Failed to import data from url, err: %v\n", err)
		return err
	}

	// Insert tags
	tagNameToIdMap := make(map[string]uuid.UUID)
	for _, tag := range importData.Tags {
		tag, err := commands.CreateTag(tx, tag.Name, tag.Description, tag.ColorRed, tag.ColorGreen, tag.ColorBlue, user.ID)
		if err != nil {
			return err
		}

		tagNameToIdMap[tag.Name] = tag.ID
	}

	// Insert recipes
	recipeUniqueNameToIdMap := make(map[string]uuid.UUID)
	for _, rec := range importData.Recipes {
		recipe, err := createRecipe(tx, rec.Name, rec.UniqueName, rec.Description, rec.PortionsSuffix, rec.OvenTemp, rec.EstimatedTime, rec.Portions, user.ID)
		if err != nil {
			return err
		}

		recipeUniqueNameToIdMap[rec.UniqueName] = recipe.ID

		for _, imageUrl := range rec.ImageUrls {
			file, err := downloadAndValidateImage(imageUrl)
			if err != nil {
				return err
			}

			image, err := uploadImage(tx, file)
			if err != nil {
				return err
			}

			_, err = connectImageToRecipe(tx, recipe.ID, image.ID)
			if err != nil {
				return err
			}
		}

		for _, ingredient := range rec.Ingredients {
			_, err = CreateRecipeIngredient(tx, ingredient.Name, ingredient.Unit, ingredient.Amount, ingredient.IsHeading, recipe.ID)
			if err != nil {
				return err
			}
		}

		for _, step := range rec.Steps {
			_, err = CreateRecipeStep(tx, step.Description, step.Number, recipe.ID, step.IsHeading)
			if err != nil {
				return err
			}
		}

		for _, tagName := range rec.TagNames {
			_, err = connectTagToRecipe(tx, recipe.ID, tagNameToIdMap[tagName])
			if err != nil {
				return err
			}
		}
	}

	// Insert recipe books
	for _, recBook := range importData.RecipeBooks {
		recipeBook, err := commands.CreateRecipeBook(tx, recBook.Name, recBook.UniqueName, recBook.Author, user.ID)
		if err != nil {
			return err
		}

		for _, recUniqueName := range recBook.RecipeUniqueNames {
			_, err = commands.CreateRecipeBookRecipe(tx, recipeBook.ID, recipeUniqueNameToIdMap[recUniqueName])
			if err != nil {
				return err
			}
		}

		if recBook.Image != nil {
			file, err := downloadAndValidateImage(*recBook.Image)
			if err != nil {
				return err
			}

			image, err := uploadImage(tx, file)

			var imageIds []uuid.UUID
			imageIds = append(imageIds, image.ID)
			err = connectImagesToRecipeBook(tx, recipeBook.ID, imageIds)
			if err != nil {
				return err
			}
		}
	}

	err = commands.CommitTransaction(tx)
	if err != nil {
		return err
	}

	return nil
}

func importDataFromUrl(url string) (*ExportData, error) {

	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Failed to retrieve import data from url, err: %v\n", err)
		return nil, err
	}

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		log.Printf("Non 2xx status code from import data request (%d, %s)\nBody: %v\n", resp.StatusCode, resp.Status, resp.Body)
		return nil, common.ErrImportDataResponseErr
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Failed to read response from import data response, err: %v\n", err)
		return nil, err
	}

	var genericResponse common.GenericResponse
	err = json.Unmarshal(body, &genericResponse)
	if err != nil {
		log.Printf("Failed to deserialize json to generic response in import data response, err: %v\n", err)
		return nil, err
	}

	if !genericResponse.Success {
		log.Printf("Error response from import data request, error: %v\n", genericResponse.Error)
		return nil, common.ErrImportDataResponseErr
	}

	var importData *ExportData
	err = json.Unmarshal([]byte(genericResponse.Data.(string)), &importData)
	if err != nil {
		log.Printf("Failed to deserialize data in import data response, err: %v\n", err)
		return nil, err
	}

	return importData, nil
}

var ErrInvalidImageImportUrl = errors.New("unexpected import url")

func downloadAndValidateImage(imageUrl string) (*validation.File, error) {
	response, err := http.Get(imageUrl)
	if err != nil {
		return nil, err
	}

	data, err := io.ReadAll(response.Body)
	urlSplit := strings.Split(imageUrl, "images/")
	if len(urlSplit) < 2 {
		return nil, ErrInvalidImageImportUrl
	}

	// The last part should be the filename
	fileName := urlSplit[len(urlSplit)-1]

	file, err := validation.ValidateImportFile(data, fileName, response.Header)
	if err != nil {
		return nil, err
	}

	return file, nil
}
