#!/bin/bash

echo "📦 Installing Argos models..."

mkdir -p /home/libretranslate/.local/share/argos-translate/packages

for f in /app/argos-models/*.argosmodel; do
  if [ -f "$f" ]; then
    echo "🔧 Installing model: $f"
    argos-translate-cli --install "$f"
  fi
done
