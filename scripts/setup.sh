#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

echo -e "${CYAN}🔧 Starting setup process...${RESET}"

# Step 1: Install dependencies
echo -e "${CYAN}📦 Installing frontend dependencies...${RESET}"
cd frontend || exit 1
pnpm install || { echo -e "${RED}❌ Failed to install dependencies.${RESET}"; exit 1; }
cd ..

# Step 2: Start services
echo -e "${CYAN}🚀 Starting Docker services...${RESET}"
docker compose up -d

# Step 3: Wait for LibreTranslate to be healthy
echo -e "${CYAN}⏳ Waiting for LibreTranslate to be healthy...${RESET}"
SERVICE_NAME="libretranslate"
HEALTHY="unhealthy"
TIMEOUT=60
ELAPSED=0

while [ "$HEALTHY" != "healthy" ]; do
  HEALTHY=$(docker inspect -f '{{.State.Health.Status}}' signalpet-translation-app-libretranslate-1 2>/dev/null || echo "starting")
  if [ "$HEALTHY" == "healthy" ]; then
    echo -e "${GREEN}🟢 LibreTranslate is healthy and ready!${RESET}"
    break
  fi
  if [ "$HEALTHY" == "unhealthy" ] && [ $ELAPSED -ge $TIMEOUT ]; then
    echo -e "${RED}❌ LibreTranslate failed to become healthy in time.${RESET}"
    exit 1
  fi
  echo "⌛ LibreTranslate status: $HEALTHY"
  sleep 3
  ((ELAPSED+=3))
done

echo -e "${GREEN}✅ Setup complete. Happy coding!${RESET}"
