package endpoints

import (
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/db/common"
	"github.com/viddem/vrecipes/backend/internal/process"
)

func Recipes(c *gin.Context) {
	recipes, err := process.GetRecipes()
	if err != nil {
		c.JSON(500, common.Error(err))
		return
	}

	c.JSON(200, common.Success(recipes))
}