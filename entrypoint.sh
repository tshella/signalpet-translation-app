#!/bin/bash

set -euo pipefail

echo "🚀 Starting LibreTranslate with hybrid model fallback..."

# === Ensure fallback model directory exists
MODEL_DIR="/app/models"
VENV_PY="/app/venv/bin/python3"

mkdir -p "$MODEL_DIR"

# === Try online model update
echo "🌐 Attempting to fetch models from the internet..."
if $VENV_PY -c "import argostranslate.package.update" &>/dev/null; then
    if $VENV_PY -m argostranslate.package.update; then
        echo "✅ Online models updated."
    else
        echo "⚠️ Online model update failed."
    fi
else
    echo "⚠️ 'argostranslate.package.update' module not available — skipping online fetch."
fi

# === Install offline models (if any)
if compgen -G "$MODEL_DIR/*.argosmodel" > /dev/null; then
    echo "📦 Installing local models from $MODEL_DIR"
    $VENV_PY -m argostranslate.package install $MODEL_DIR/*.argosmodel || {
        echo "❌ Failed to install local models"
        exit 1
    }
else
    echo "⚠️ No .argosmodel files found in $MODEL_DIR"
fi

# === Debugging: where is libretranslate?
echo "🔍 Checking LibreTranslate binary location..."
which libretranslate || true
ls -lah $(which libretranslate || echo "/app") || true

# === Start LibreTranslate
echo "✅ Starting LibreTranslate server..."
exec /app/venv/bin/libretranslate
