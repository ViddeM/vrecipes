package db

import (
	"context"
	"errors"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	common2 "github.com/viddem/vrecipes/backend/internal/common"
	"github.com/viddem/vrecipes/backend/internal/db/commands"
	"github.com/viddem/vrecipes/backend/internal/db/queries"
	"log"
)

var db *pgxpool.Pool
var ctx context.Context

func Init() {
	envVars := common2.GetEnvVars()
	username := envVars.DbUser
	password := envVars.DbPassword
	dbName := envVars.DbName
	dbHost := envVars.DbHost
	ctx = context.Background()

	dbUrl := fmt.Sprintf("postgresql://%s:%s@%s/%s?sslmode=disable", username, password, dbHost, dbName)
	config, err := pgxpool.ParseConfig(dbUrl)
	if err != nil {
		log.Fatalf("Failed to parse connection string: %v\n", err)
	}
	//config.ConnConfig.Logger = &logger{}
	//config.ConnConfig.LogLevel = pgx.LogLevelTrace

	conn, err := pgxpool.ConnectConfig(ctx, config)
	if err != nil {
		log.Fatalf("Failed to connect to db: %v\n", err)
	}
	db = conn

	log.Printf("Successfully created db connection\n")

	if envVars.ResetDb {
		resetDb()
	}

	commands.Init(db, &ctx)
	queries.Init(db, &ctx)

	runMigrations(dbUrl)

	setupDb()
	log.Println("Initialized database connection")
}

type logger struct{}

func (logger *logger) Log(ctx context.Context, level pgx.LogLevel, msg string, data map[string]interface{}) {
	log.Printf("Executing SQL: %s\n", msg)
	log.Printf("Data: %+v", data)
}

func resetDb() {
	tx, err := db.Begin(ctx)
	if err != nil {
		log.Fatalf("Failed to begin transaction: %v\n", err)
	}

	defer func() {
		err = tx.Rollback(ctx)
		log.Printf("Failed to rollback transaction: %v\n", err)
	}()

	_, err = tx.Exec(ctx, "DROP SCHEMA public CASCADE")
	if err != nil {
		log.Fatalf("Failed to drop schema public: %v\n", err)
	}
	_, err = tx.Exec(ctx, "CREATE SCHEMA public")
	if err != nil {
		log.Fatalf("Failed to create schema public: %v\n", err)
	}

	err = tx.Commit(ctx)
	if err != nil {
		log.Fatalf("Failed to commit transaction: %v\n", err)
	}
}

func runMigrations(dbUrl string) {
	m, err := migrate.New("file://internal/db/migrations", dbUrl)
	if err != nil {
		log.Fatalf("Failed to create migrations: %v\n", err)
	}

	err = m.Up()
	if err != nil && errors.Is(err, migrate.ErrNoChange) == false {
		log.Fatalf("Failed to run migrations: %v\n", err)
	}

	log.Printf("Successfully ran all migrations!\n")
}

func Close() {
	db.Close()
}