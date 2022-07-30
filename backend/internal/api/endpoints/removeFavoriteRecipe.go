package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func RemoveFavoriteRecipe(c *gin.Context) {
	recipe, err := validateRecipeId(c)
	if err != nil {
		log.Printf("Failed to validate tag id: %v\n", err)
		return
	}

	user, err := getSessionUser(c)
	if err != nil {
		return
	}

	err = process.DeleteFavoriteRecipe(recipe.ID, user.ID)
	if err != nil {
		log.Printf("Failed to remove recipe as favorite: %v\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRemoveFavoriteRecipe),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success("Tag deleted"))
}
