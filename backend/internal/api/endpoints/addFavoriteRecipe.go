package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func AddFavoriteRecipe(c *gin.Context) {
	recipe, err := validateRecipeId(c)
	if err != nil {
		log.Printf("Failed to validate edit tag json: %v\n", err)
		c.JSON(
			http.StatusBadRequest,
			common.Error(common.ResponseMalformedRecipeId),
		)
		return
	}

	user, err := getSessionUser(c)
	if err != nil {
		return
	}

	err = process.CreateFavoriteRecipe(recipe.ID, user.ID)
	if err != nil {
		log.Printf("Failed to add recipe as favorite: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToAddFavoriteRecipe),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success("recipe added as favorite"))
}
