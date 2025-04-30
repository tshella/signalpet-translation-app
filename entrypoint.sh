#!/bin/bash
set -e

echo "🚀 Starting LibreTranslate with hybrid model fallback..."

echo "🌐 Attempting to fetch models from the internet..."
if /app/venv/bin/python3 -m argostranslate.package.update; then
  echo "✅ Online models updated."
else
  echo "⚠️ Online fetch failed — fallback to local models."
fi

echo "📦 Installing any local models in /opt/models"
if compgen -G "/opt/models/*.argosmodel" > /dev/null; then
  /app/venv/bin/python3 -m argostranslate.package.install /opt/models/*.argosmodel || true
else
  echo "⚠️ No local .argosmodel files found."
fi

echo "✅ Starting LibreTranslate server..."
exec /app/venv/bin/libretranslate
