package endpoints

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func EditRecipe(c *gin.Context) {
	recipeId := c.Param("recipeId")
	log.Printf("Edit recipe for recipe: '%s'\n", recipeId)
	c.String(http.StatusInternalServerError, "Not implemented")
}