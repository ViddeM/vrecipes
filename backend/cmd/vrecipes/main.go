package main

import (
	"github.com/joho/godotenv"
	"github.com/viddem/vrecipes/backend/internal/db"
	"github.com/viddem/vrecipes/backend/internal/api"
	"log"
)

func main() {
	log.Println("==== Starting vrecipes golang backend =====")

	loadDotEnvFile()
	db.Init()
	api.Start()
}

func loadDotEnvFile() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Unable to load .env file")
	} else {
		log.Println("Loaded environment variables from .env file")
	}
}