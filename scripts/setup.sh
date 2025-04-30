#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

echo -e "${CYAN}🔧 Starting setup process...${RESET}"

# Step 1: Install frontend dependencies
echo -e "${CYAN}📦 Installing frontend dependencies...${RESET}"
cd frontend || exit 1
pnpm install || { echo -e "${RED}❌ Failed to install dependencies.${RESET}"; exit 1; }
cd ..

# Step 2: Start Docker services
echo -e "${CYAN}🚀 Starting Docker services...${RESET}"
docker compose up -d || { echo -e "${RED}❌ Failed to start Docker containers.${RESET}"; exit 1; }

# Step 3: Live logs while waiting
echo -e "${CYAN}📡 Streaming logs from LibreTranslate while checking status...${RESET}"
docker compose logs --tail=20 -f libretranslate &
LOG_PID=$!

# Step 4: Wait for LibreTranslate to be responsive
echo -e "${CYAN}⏳ Waiting for LibreTranslate to start responding...${RESET}"
for i in {1..20}; do
  curl -s http://localhost:5000/health > /dev/null && {
    kill $LOG_PID
    echo -e "${GREEN}✅ LibreTranslate is running!${RESET}"
    exit 0
  }
  sleep 3
done

kill $LOG_PID
echo -e "${RED}❌ LibreTranslate failed to respond in time.${RESET}"
exit 1
