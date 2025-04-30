#!/bin/bash

set -e

echo "🚀 Starting LibreTranslate with hybrid model fallback..."

# Attempt to update models online
echo "🌐 Attempting to fetch models from the internet..."
if /app/venv/bin/python3 -m argostranslate.package.update; then
  echo "✅ Online models updated."
else
  echo "⚠️ Online fetch failed — fallback to local models."
  if [ -n "$(ls /app/models/*.argosmodel 2>/dev/null)" ]; then
    echo "📦 Installing any local models in /app/models"
    /app/venv/bin/python3 -m argostranslate.package install /app/models/*.argosmodel
  else
    echo "⚠️ No local .argosmodel files found. Starting without custom models."
  fi
fi

echo "✅ Starting LibreTranslate server..."
exec libretranslate
