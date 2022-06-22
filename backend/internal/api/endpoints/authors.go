package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
	"net/http"
)

func Authors(c *gin.Context) {
	recipes, err := process.GetAllAuthors()
	if err != nil {
		log.Printf("Error: Failed to retrieve recipes due to %s\n", err)
		c.JSON(
			http.StatusInternalServerError,
			common.Error(common.ResponseFailedToRetrieveRecipes),
		)
		return
	}

	c.JSON(http.StatusOK, common.Success(recipes))
}
