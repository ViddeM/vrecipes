package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/models"
	"github.com/viddem/vrecipes/backend/internal/process"
	"github.com/viddem/vrecipes/backend/internal/validation"
	"log"
	"net/http"
)

type EditRecipeJson struct {
	UniqueName string `json:"uniqueName"`
}

func EditRecipe(c *gin.Context) {
	recipeJson, err := validateEditRecipe(c)
	if err != nil {
		log.Printf("Failed to validate edit recipe json: %v\n", err)
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseInvalidJson))
		return
	}

	oldRecipe, err := validateRecipeId(c)
	if err != nil {
		log.Printf("Failed to validate recipe id: %v", err)
		return
	}

	err = validateUserAuthorized(c, oldRecipe.CreatedBy)
	if err != nil {
		log.Printf("User not authorized to edit recipe: %v\n", err)
		c.JSON(http.StatusForbidden, common.Error(common.ResponseIncorrectUser))
		return
	}

	uniqueName, err := process.EditRecipe(oldRecipe, recipeJson)
	if err != nil {
		log.Printf("Failed to edit recipe: %v\n", err)
		if errors.Is(err, common.ErrNameTaken) {
			c.JSON(http.StatusOK, common.Error(common.ResponseRecipeNameExist))
			return
		}

		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToEditRecipe))
		return
	}

	c.JSON(http.StatusOK, common.Success(EditRecipeJson{
		UniqueName: uniqueName,
	}))
}

func validateEditRecipe(c *gin.Context) (*models.EditRecipeJson, error) {
	var recipe models.EditRecipeJson
	err := c.ShouldBindJSON(&recipe)
	if err != nil {
		return nil, err
	}

	err = validation.ValidateRecipe(&recipe)
	return &recipe, err
}

func validateRecipeId(c *gin.Context) (*tables.Recipe, error) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, common.Error(common.ResponseMalformedRecipeId))
		return nil, err
	}

	recipe, err := queries.GetRecipeById(id)
	if err != nil {
		c.JSON(http.StatusNotFound, common.Error(common.ResponseRecipeNotFound))
		return nil, err
	}

	return recipe, nil
}
