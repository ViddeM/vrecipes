package endpoints

import (
	"github.com/gin-gonic/gin"
	"log"
)

func EditRecipe(c *gin.Context) {
	recipeId := c.Param("recipeId")
	log.Printf("Not implemented, param %s\n", recipeId)
}