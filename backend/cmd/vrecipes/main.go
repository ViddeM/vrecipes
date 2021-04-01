package main

import (
	"github.com/viddem/vrecipes/backend/internal/api"
	"github.com/viddem/vrecipes/backend/internal/db"
	"log"
)

func main() {
	log.Println("==== Starting vrecipes golang backend =====")
	
	db.Init()
	defer db.Close()
	api.Init()
	api.Start()
}