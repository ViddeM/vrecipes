package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func RemoveRecipe(c *gin.Context) {
	recipe, err := validateRecipeId(c)
	if err != nil {
		log.Printf("Failed to validate recipe id: %v\n", err)
		return
	}

	err = validateUserAuthorized(c, recipe.CreatedBy)
	if err != nil {
		log.Printf("Failed to authorize user: %v\n", err)
		c.JSON(http.StatusForbidden, common.Error(common.ResponseIncorrectUser))
		return
	}

	err = process.DeleteRecipe(recipe)
	if err != nil {
		log.Printf("Failed to delete recipe: %v\n", err)
		c.JSON(http.StatusInternalServerError, common.Error(common.ResponseFailedToDeleteRecipe))
		return
	}

	c.JSON(http.StatusOK, common.Success("Recipe deleted"))
}
