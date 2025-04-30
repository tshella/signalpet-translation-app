#!/bin/bash
set -e

echo "🚀 Starting LibreTranslate with hybrid model fallback..."

echo "🌐 Attempting to fetch models from the internet..."
if ! /app/venv/bin/python3 -m argostranslate.package update; then
  echo "❌ Online model update failed. Falling back to local .argosmodel packages..."
  /app/venv/bin/python3 -m argostranslate.package install /opt/models/*.argosmodel || {
    echo "❌ Local model installation also failed!"
    exit 1
  }
else
  echo "✅ Online models updated."
fi

echo "✅ Starting LibreTranslate server..."
exec libretranslate
