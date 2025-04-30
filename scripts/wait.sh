#!/bin/bash

set -e

SERVICE_NAME="libretranslate"
URL="http://localhost:5000/health"
TIMEOUT=60
WAIT=3

echo "⏳ Waiting for LibreTranslate to become healthy..."
start_time=$(date +%s)

while true; do
  if docker compose ps | grep -q "$SERVICE_NAME" && curl -s --max-time 2 "$URL" | grep -q '"status":"ok"'; then
    echo "✅ LibreTranslate is healthy and ready!"
    exit 0
  fi

  current_time=$(date +%s)
  elapsed=$((current_time - start_time))

  if [ $elapsed -ge $TIMEOUT ]; then
    echo "❌ Timed out after $TIMEOUT seconds waiting for LibreTranslate"
    docker compose logs "$SERVICE_NAME" | tail -20
    exit 1
  fi

  echo "⌛ LibreTranslate not ready yet... (${elapsed}s elapsed)"
  sleep $WAIT
done
