package commands

import (
	"context"
	"github.com/jackc/pgx/v4/pgxpool"
)

var dbPool *pgxpool.Pool
var ctx context.Context

func Init(conn *pgxpool.Pool, context *context.Context) {
	dbPool = conn
	ctx = *context
}

func getDb() (*pgxpool.Conn, error) {
	data, err := dbPool.Acquire(ctx)
	return data, err
}