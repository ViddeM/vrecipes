package endpoints

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/tables"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
	"strconv"
)

func EditRecipe(c *gin.Context) {
	recipe, err := validateRecipe(c)
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

	uniqueName, err := process.EditRecipe(oldRecipe, recipe)
	if err != nil {
		if errors.Is(err, common.ErrNameTaken) {
			c.JSON(http.StatusOK, common.Error(common.ResponseRecipeNameExist))
			return
		}

		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToEditRecipe))
		return
	}

	c.JSON(http.StatusOK, common.Success(NewRecipeResponse{uniqueName}))
}

func validateRecipeId(c *gin.Context) (*tables.Recipe, error) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
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
