include backend/.env

.PHONY: mock clear-db clean reset new-migration run-migrations

POSTGRESQL_URL = 'postgres://$(db_user):$(db_password)@localhost:5432/$(db_name)?sslmode=disable' 
MIGRATION_PATH = 'backend/internal/db/migrations'
DB_DOCKER_NAME = 'vrecipes-db-1'

mock: mock_data/mockdata.sql
	mkdir -p backend/static/images/
	cp mock_data/*.png backend/static/images/
	cp mock_data/*.jpg backend/static/images/
	docker exec -i $(DB_DOCKER_NAME) psql -U $(db_name) $(db_user) < mock_data/mockdata.sql

clear-db:
	echo 'DROP SCHEMA public CASCADE; CREATE SCHEMA public' | docker exec -i $(DB_DOCKER_NAME) psql -U $(db_name) $(db_user)

clean: clear-db

new-migration:
	migrate -database ${POSTGRESQL_URL} -path $(MIGRATION_PATH) create -ext sql -dir $(MIGRATION_PATH) $(mig_name_arg) 

run-migrations:
	migrate -database $(POSTGRESQL_URL) -path $(MIGRATION_PATH) up 

reset: 
	make clean
	make run-migrations
	make mock