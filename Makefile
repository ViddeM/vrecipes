mock: mock_data/mockdata.sql
	docker exec -i vrecipes-db-1 psql -U vrecipes vrecipes < mock_data/mockdata.sql

clear-db:
	echo 'DROP SCHEMA public CASCADE; CREATE SCHEMA public' | docker exec -i vrecipes-db-1 psql -U vrecipes vrecipes
