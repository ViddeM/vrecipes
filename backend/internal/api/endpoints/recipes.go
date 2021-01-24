package endpoints

import (
	"github.com/gin-gonic/gin"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/process"
	"log"
)

func Recipes(c *gin.Context) {
	recipes, err := process.GetRecipes()
	if err != nil {
		log.Printf("Error: Failed to receive recipes due to %s\n", err)
		c.JSON(500, common2.Error("Failed to retrieve recipes"))
		return
	}

	c.JSON(200, common2.Success(recipes))
}