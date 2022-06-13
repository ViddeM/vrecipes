package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/process"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"log"
	"net/http"
)

type NewRecipeBookResponse struct {
	RecipeBookUniqueName string `json:"recipeBookUniqueName"`
}

func NewRecipeBook(c *gin.Context) {
	recipeBook, err := validateRecipeBook(c)
	if err != nil {
		log.Printf("Failed to validate new recipebook json: %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	user, err := getSessionUser(c)
	if err != nil {
		log.Printf("Failed to retrieve user from context: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseInvalidUserId),
		)
		return
	}

	uniqueName, err := process.CreateNewRecipeBook(recipeBook, user)
	if err != nil {
		if errors.Is(err, common.ErrNameTaken) {
			log.Printf("Tried to create duplicate recipebook")
			c.JSON(
				http.StatusUnprocessableEntity,
				common.Error(common.ResponseRecipeBookNameExists),
			)
			return
		}

		log.Printf("Failed to create new recipebook: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToCreateRecipeBook),
		)
		return
	}

	c.JSON(
		http.StatusCreated, common.Success(
			NewRecipeBookResponse{
				RecipeBookUniqueName: uniqueName,
			},
		),
	)
}

func validateRecipeBook(c *gin.Context) (*models.NewRecipeBookJson, error) {
	var recipeBook models.NewRecipeBookJson
	err := c.BindJSON(&recipeBook)
	if err != nil {
		return nil, err
	}

	err = validation.ValidateRecipeBook(&recipeBook)
	return &recipeBook, err
}
