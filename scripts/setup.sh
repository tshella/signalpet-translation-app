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

# Step 2: Ensure correct permissions on models
chmod -R 755 argos-models-packages

# Step 3: Start Docker services
echo -e "${CYAN}🚀 Starting Docker services...${RESET}"
docker compose up -d --build || { echo -e "${RED}❌ Failed to start Docker containers.${RESET}"; exit 1; }

# Step 4: Wait for LibreTranslate
echo -e "${CYAN}📡 Streaming logs from LibreTranslate while checking status...${RESET}"
docker compose logs -f libretranslate &
LOG_PID=$!

echo -e "${CYAN}⏳ Waiting for LibreTranslate to start responding on /health...${RESET}"
TIMEOUT=180
RETRY_INTERVAL=5
ELAPSED=0

until curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/health | grep -q "200"; do
  if [ "$ELAPSED" -ge "$TIMEOUT" ]; then
    echo -e "${RED}❌ LibreTranslate failed to respond after $TIMEOUT seconds.${RESET}"
    kill "$LOG_PID"
    exit 1
  fi
  echo "⌛ Still waiting... ($ELAPSED/$TIMEOUT sec)"
  docker compose logs --tail=10 libretranslate
  sleep "$RETRY_INTERVAL"
  ((ELAPSED+=RETRY_INTERVAL))
done

kill "$LOG_PID"
echo -e "${GREEN}✅ LibreTranslate is healthy and responding!${RESET}"
