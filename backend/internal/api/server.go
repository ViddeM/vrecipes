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
		api.POST("/recipes", endpoints.NewRecipe)
		api.PUT("/recipes/:id", endpoints.EditRecipe)
		api.POST("/images", endpoints.ImageUpload)
		api.GET("/recipes/", endpoints.Recipes)
		api.GET("/recipes/:uniqueName", endpoints.Recipe)
	}
}

func Start() {
	err := router.Run()
	if err != nil {
		log.Fatalf("Failed to start webserver due to err: %s\n", err)
	}
}

