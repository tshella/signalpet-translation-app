#!/bin/bash

echo "🔧 Cleaning up any previous containers..."
docker compose down -v --remove-orphans

echo "📦 Installing frontend dependencies..."
cd frontend
pnpm install
cd ..

echo "🐳 Building Docker containers..."
docker compose -f docker-compose.yml -f docker-compose.override.yml build

echo "🚀 Launching development environment..."
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d

echo "✅ Dev environment is up! Visit http://localhost:5173"