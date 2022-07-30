package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func FavoriteRecipes(c *gin.Context) {

	user, err := getSessionUser(c)
	if err != nil {
		return
	}

	recipes, err := process.GetFavoriteRecipesJson(user.ID)
	if err != nil {
		log.Printf("Error: Failed to retrieve favorite recipes due to %s\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRetrieveRecipes),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(recipes))
}
