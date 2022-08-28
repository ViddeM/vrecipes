package commands

import (
	"context"
	"errors"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
)

var dbPool *pgxpool.Pool
var ctx context.Context

func Init(conn *pgxpool.Pool, context *context.Context) {
	dbPool = conn
	ctx = *context
}

func BeginTransaction() (pgx.Tx, error) {
	tx, err := dbPool.Begin(ctx)
	if err != nil {
		log.Printf("Failed to initiate transaction, err: %v\n", err)
	}

	return tx, err
}

func RollbackTransaction(tx pgx.Tx) {
	err := tx.Rollback(ctx)
	if err != nil && !errors.Is(err, pgx.ErrTxClosed) {
		// We ignore ErrTxClosed errors as they are expected to be generated
		// by the deferred call to rollback on commit().
		log.Printf("Failed to rollback transaction, err: %v\n", err)
	}
}

func CommitTransaction(tx pgx.Tx) error {
	err := tx.Commit(ctx)
	if err != nil {
		log.Printf("Failed to commit transaction, err: %v\n", err)
	}

	return err
}
