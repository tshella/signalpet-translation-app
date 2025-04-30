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

# Step 2: Ensure model permissions are correct
chmod -R 755 argos-models-packages

# Step 3: Start Docker services
echo -e "${CYAN}🚀 Starting Docker services...${RESET}"
docker compose up -d --build || { echo -e "${RED}❌ Docker services failed to start.${RESET}"; exit 1; }

# Step 4: Tail LibreTranslate logs
echo -e "${CYAN}📡 Streaming logs from LibreTranslate...${RESET}"
docker compose logs -f libretranslate &

# Step 5: Wait for LibreTranslate to respond
TIMEOUT=180
ELAPSED=0
INTERVAL=5

echo -e "${CYAN}⏳ Waiting for LibreTranslate to respond at / ...${RESET}"
until curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/ | grep -q "200"; do
  if [ "$ELAPSED" -ge "$TIMEOUT" ]; then
    echo -e "${RED}❌ LibreTranslate failed to respond after ${TIMEOUT} seconds.${RESET}"
    docker compose logs --tail=20 libretranslate
    exit 1
  fi
  echo "⌛ Still waiting... ($ELAPSED/$TIMEOUT sec)"
  sleep $INTERVAL
  ((ELAPSED+=INTERVAL))
done

echo -e "${GREEN}✅ LibreTranslate is up and responding at /${RESET}"

# Step 6: Verify translation works
echo -e "${CYAN}🔍 Verifying translation from English to French...${RESET}"
RESPONSE=$(curl -s -X POST http://localhost:5000/translate \
  -H "Content-Type: application/json" \
  -d '{"q": "Hello", "source": "en", "target": "fr", "format": "text"}')

if echo "$RESPONSE" | grep -qi "Bonjour"; then
  echo -e "${GREEN}✅ Translation verified successfully: '$RESPONSE'${RESET}"
else
  echo -e "${RED}❌ Translation failed or returned unexpected result: '$RESPONSE'${RESET}"
  exit 1
fi

echo -e "${GREEN}🟢 Setup complete and LibreTranslate is fully functional!${RESET}"
