# ======== Color Helpers ========
GREEN  = \033[0;32m
RED    = \033[0;31m
CYAN   = \033[0;36m
BOLD   = \033[1m
RESET  = \033[0m

# ======== Core System Control ========

up:
	@echo "$(CYAN)🔧 Bootstrapping containers...$(RESET)"
	docker compose up -d
	@$(MAKE) banner
	@echo "$(GREEN)✅ Containers started!$(RESET)"

dev:
	@$(MAKE) banner
	docker compose -f docker-compose.yml -f docker-compose.override.yml up

prod:
	@$(MAKE) banner
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down:
	docker compose down

logs:
	docker compose logs -f

status:
	@echo "$(CYAN)📦 Service status:$(RESET)"
	docker compose ps

# ======== Developer Utilities ========

test:
	pnpm vitest run

ci:
	pnpm install
	pnpm run build
	pnpm run test

banner:
	@scripts/banner.sh

# ======== One-click Setup ========

setup:
	@chmod +x ./scripts/setup.sh
	@./scripts/setup.sh

# ======== Danger Zone: Full Reset ========

nuke:
	@echo "$(RED)💥 Nuking all containers, volumes, and images...$(RESET)"
	docker compose down -v --remove-orphans --rmi all
