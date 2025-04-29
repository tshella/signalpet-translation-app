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

banner:
	@scripts/banner.sh
