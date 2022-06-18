mock: mock_data/mockdata.sql
	mkdir -p backend/static/images/
	cp mock_data/*.png backend/static/images/
	cp mock_data/*.jpg backend/static/images/
	docker exec -i vrecipes-db-1 psql -U vrecipes vrecipes < mock_data/mockdata.sql

clear-db:
	echo 'DROP SCHEMA public CASCADE; CREATE SCHEMA public' | docker exec -i vrecipes-db-1 psql -U vrecipes vrecipes
