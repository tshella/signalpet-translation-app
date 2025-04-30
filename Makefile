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
	@echo "\033[0;36m🔐 Setting permissions on argos-models-packages...\033[0m"
	sudo chown -R $(whoami):$(id -gn) argos-models-packages
	chmod -R 755 argos-models-packages
	chmod +x entrypoint.sh
	@scripts/setup.sh

wait-libretranslate:
	@echo "$(CYAN)⏳ Waiting for LibreTranslate to be healthy...$(RESET)"
	@timeout 180s bash -c '\
		while true; do \
			status=$$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/ || echo "down"); \
			if [ "$$status" = "200" ]; then \
				echo "$(GREEN)🚀 LibreTranslate is healthy and responding!$(RESET)"; \
				break; \
			else \
				echo "⌛ Still waiting... LibreTranslate status: $$status"; \
				sleep 5; \
			fi; \
		done'

# ======== Danger Zone: Full Reset ========

nuke:
	@echo "$(RED)💥 Nuking all containers, volumes, and images...$(RESET)"
	docker compose down -v --remove-orphans --rmi all
