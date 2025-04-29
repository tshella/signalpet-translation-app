#!/bin/bash

CYAN='\033[1;36m'
GREEN='\033[0;32m'
RESET='\033[0m'

echo -e "${CYAN}🔧 Cleaning up any previous containers...${RESET}"
docker compose down -v --remove-orphans

echo -e "${CYAN}📦 Installing frontend dependencies with pnpm...${RESET}"
cd frontend && pnpm install && cd ..

echo -e "${CYAN}🐳 Building Docker containers for development...${RESET}"
docker compose -f docker-compose.yml -f docker-compose.override.yml build

echo -e "${CYAN}🚀 Launching development containers...${RESET}"
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

echo -e "${GREEN}✅ Dev environment is ready! Visit: http://localhost:5173${RESET}"
