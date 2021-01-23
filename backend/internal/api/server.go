package api

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints"
)

var router *gin.Engine

func init() {
	log.Println("Initializing GIN api")
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
	err := router.Run()
	if err != nil {
		log.Fatalf("Failed to start webserver due to err: %s\n", err)
	}
}

