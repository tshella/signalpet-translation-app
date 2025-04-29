#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Building Docker containers..."
docker-compose build

echo "Launching development environment..."
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
