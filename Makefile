up:
	docker-compose up -d

dev:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up

prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down:
	docker-compose down

logs:
	docker-compose logs -f
