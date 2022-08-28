package redis

import (
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/viddem/vrecipes/backend/internal/common"
	"log"
	"time"
)

const exportDataPrefix = "exportData"
const exportDataTTLMinutes = 15

func InsertExportDataJson(id uuid.UUID, exportData string) error {
	key := fmt.Sprintf("%s:%s", exportDataPrefix, id)
	err := rdb.Set(context.Background(), key, exportData, exportDataTTLMinutes*time.Minute).Err()
	if err != nil {
		log.Printf("Failed to insert export data into redis, err: %v", err)
		return common.ErrRedis
	}
	return nil
}

func GetExportDataJson(id uuid.UUID) (string, error) {
	key := fmt.Sprintf("%s:%s", exportDataPrefix, id)
	val, err := rdb.Get(context.Background(), key).Result()
	if err != nil {
		log.Printf("Failed to retrieve export data from redis, err: %v\n", err)
		return "", common.ErrExportDataNotFound
	}

	return val, nil
}

func DeleteExportData(id uuid.UUID) error {
	key := fmt.Sprintf("%s:%s", exportDataPrefix, id)
	err := rdb.Del(context.Background(), key).Err()
	return err
}
