package api

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints"
)

var router *gin.Engine

func Init() {
	log.Println("Initializing GIN api")
	router  = gin.Default()

	api := router.Group("/api")
	{
		imagesFolder := os.Getenv("image_folder")
		log.Printf("Using images folder '%s'\n", imagesFolder)
		api.Static("/images", imagesFolder)

		api.GET("/health", endpoints.HealthCheck)
		api.POST("/recipes", endpoints.NewRecipe)
		api.PUT("/recipes/:id", endpoints.EditRecipe)
		api.PUT("/images", endpoints.ImageUpload)
		api.GET("/recipes", endpoints.Recipes)
		api.GET("/recipes/:uniqueName", endpoints.Recipe)
	}
}

func Start() {
	err := router.Run()
	if err != nil {
		log.Fatalf("Failed to start webserver due to err: %s\n", err)
	}
}

