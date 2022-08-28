package main

import (
	"github.com/viddem/vrecipes/backend/internal/api"
	"github.com/viddem/vrecipes/backend/internal/db"
	"github.com/viddem/vrecipes/backend/redis"
	"log"
)

func main() {
	log.Println("==== Starting vrecipes golang backend =====")

	db.Init()
	defer db.Close()
	redis.Init()
	defer redis.Close()
	api.Init()
	api.Start()
}
