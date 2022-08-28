package redis

import (
	"github.com/go-redis/redis/v8"
	"github.com/viddem/vrecipes/backend/internal/common"
	"log"
)

var rdb *redis.Client

func Init() {
	envVars := common.GetEnvVars()

	rdb = redis.NewClient(&redis.Options{Addr: envVars.RedisAddress, Password: "", DB: 0})
}

func Close() {
	err := rdb.Close()
	if err != nil {
		log.Printf("Failed to close redis DB, err: %v", err)
	}
}
