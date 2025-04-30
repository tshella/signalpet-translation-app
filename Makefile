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
	@$(MAKE) wait-libretranslate
	@$(MAKE) banner
	@echo "$(GREEN)✅ Containers started!$(RESET)"

dev:
	@chmod +x scripts/*.sh
	@$(MAKE) banner
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
	@$(MAKE) wait-libretranslate
	@echo "$(GREEN)✅ Dev environment ready!$(RESET)"

prod:
	@chmod +x scripts/*.sh
	@$(MAKE) banner
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
	@$(MAKE) wait-libretranslate
	@echo "$(GREEN)✅ Production environment ready!$(RESET)"

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
	@chmod +x scripts/*.sh
	@scripts/setup.sh
	@$(MAKE) wait-libretranslate
	@echo "$(GREEN)🟢 Setup complete and LibreTranslate is healthy!$(RESET)"

wait-libretranslate:
	@echo "$(CYAN)⏳ Waiting for LibreTranslate to be healthy...$(RESET)"
	@until [ "`docker inspect -f {{.State.Health.Status}} signalpet-translation-app-libretranslate-1 2>/dev/null || echo unhealthy`" = "healthy" ]; do \
		echo "⌛ LibreTranslate not ready yet..."; \
		sleep 3; \
	done
	@echo "$(GREEN)🚀 LibreTranslate is healthy and ready!$(RESET)"

# ======== Danger Zone: Full Reset ========

nuke:
	@echo "$(RED)💥 Nuking all containers, volumes, and images...$(RESET)"
	docker compose down -v --remove-orphans --rmi all
