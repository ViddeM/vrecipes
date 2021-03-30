package api

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints"
	"github.com/viddem/vrecipes/backend/internal/api/endpoints/authentication"
	"github.com/viddem/vrecipes/backend/internal/common"
	"log"
)

var router *gin.Engine

func Init() {
	log.Println("Initializing GIN api")
	router  = gin.Default()
	authentication.Init()

	envVars := common.GetEnvVars()
	store := cookie.NewStore([]byte(envVars.Secret))
	router.Use(sessions.Sessions("authentication", store))

	api := router.Group("/api")
	{
		authRequired := api.Group("")
		{
			authRequired.Use(authentication.CheckAuth())

			authRequired.Static("/images", envVars.ImageFolder)

			authRequired.GET("/health", endpoints.HealthCheck)
			authRequired.POST("/recipes", endpoints.NewRecipe)
			authRequired.PUT("/recipes/:id", endpoints.EditRecipe)
			authRequired.PUT("/images", endpoints.ImageUpload)
			authRequired.GET("/recipes", endpoints.Recipes)
			authRequired.GET("/recipes/:uniqueName", endpoints.Recipe)
			authRequired.DELETE("/recipes/:id", endpoints.RemoveRecipe)
			authRequired.GET("/me", authentication.Me)
		}



		auth := api.Group("/auth")
		{
			auth.POST("/logout", authentication.Logout)

			github := auth.Group("/github")
			{
				github.GET("", authentication.GithubInitAuth)
				github.GET("/callback", authentication.GithubCallback)
			}

			google := auth.Group("/google")
			{
				google.GET("", authentication.GoogleInitAuth)
				google.GET("/callback", authentication.GoogleCallback)
			}

			facebook := auth.Group("/facebook")
			{
				facebook.GET("", authentication.FacebookInitAuth)
				facebook.GET("/callback", authentication.FacebookCallback)
			}

			microsoft := auth.Group("/microsoft")
			{
				microsoft.GET("", authentication.MicrosoftInitAuth)
				microsoft.GET("/callback", authentication.MicrosoftCallback)
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

