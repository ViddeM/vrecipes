package webserver

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/webserver/endpoints"
)

var router *gin.Engine

func init() {
	log.Println("Initializing GIN webserver")
	router  = gin.Default()

	api := router.Group("/api")
	{
		api.GET("/health", endpoints.HealthCheck)
		api.POST("/recipe/create", endpoints.NewRecipe)
		api.POST("/recipe/edit/:recipeId", endpoints.EditRecipe)
		api.PUT("/recipe/image/upload/", endpoints.ImageUpload)
		api.GET("/recipes", endpoints.Recipes)
		api.GET("/recipe/details/:uniqueName", endpoints.Recipe)
	}
}

func Start() {
	router.Run()
}

