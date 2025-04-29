# Start development environment (detached)
up:
	docker compose up -d

# Start development environment with override (e.g. hot reload, mounted volumes)
dev:
	docker compose -f docker-compose.yml -f docker-compose.override.yml up

# Start production environment (build and run NGINX-served app)
prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

# Stop all running containers
down:
	docker compose down

# Tail logs from all services
logs:
	docker compose logs -f

# Rebuild all containers from scratch
rebuild:
	docker compose -f docker-compose.yml -f docker-compose.override.yml build --no-cache

# Clean volumes and containers
clean:
	docker compose down -v --remove-orphans
