package api

import (
	"github.com/gin-contrib/sessions"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints/authentication"
	"log"
	"os"

	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints"
)

var router *gin.Engine

func Init() {
	log.Println("Initializing GIN api")
	router  = gin.Default()
	authentication.Init()
	store := cookie.NewStore([]byte(os.Getenv("secret")))
	router.Use(sessions.Sessions("authentication", store))

	api := router.Group("/api")
	{
		authRequired := api.Group("")
		{
			authRequired.Use(authentication.CheckAuth())

			imagesFolder := os.Getenv("image_folder")
			log.Printf("Using images folder '%s'\n", imagesFolder)
			authRequired.Static("/images", imagesFolder)

			authRequired.GET("/health", endpoints.HealthCheck)
			authRequired.POST("/recipes", endpoints.NewRecipe)
			authRequired.PUT("/recipes/:id", endpoints.EditRecipe)
			authRequired.PUT("/images", endpoints.ImageUpload)
			authRequired.GET("/recipes", endpoints.Recipes)
			authRequired.GET("/recipes/:uniqueName", endpoints.Recipe)
			authRequired.DELETE("/recipes/:id", endpoints.RemoveRecipe)
		}



		auth := api.Group("/auth")
		{
			github := auth.Group("/github")
			{
				github.GET("", authentication.GithubInit)
				github.GET("/callback", authentication.GithubCallback)
			}
		}
	}
}

func Start() {
	err := router.Run()
	if err != nil {
		log.Fatalf("Failed to start webserver due to err: %s\n", err)
	}
}

