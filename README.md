# 🌐 SIGNAL Translation App

A real-time veterinary report UI with multilingual support, live translation powered by LibreTranslate, and a modern developer experience using **Vite**, **Zustand**, **Docker**, and **PNPM**.

Author: Manaka Anthony Raphasha
---

## 📚 Table of Contents

- [📖 Overview](#📖-overview)
- [🖼️ Architecture](#🖼️-architecture)
- [🌍 Features](#🌍-features)
- [🚀 Getting Started (For Everyone)](#🚀-getting-started-for-everyone)
- [🔧 Developer Setup](#🔧-developer-setup)
- [🛠️ Commands & Makefile](#🛠️-commands--makefile)
- [📦 Docker Compose Setup](#📦-docker-compose-setup)
- [✅ Running Tests & CI](#✅-running-tests--ci)
- [📸 Screenshots](#📸-screenshots)
- [📄 License](#📄-license)

---

## 📖 Overview

**SIGNAL** is a modern UI for rendering veterinary reports that can be translated live into different languages like 🇩🇪 German, 🇫🇷 French, 🇪🇸 Spanish, and 🇵🇹 Portuguese using [LibreTranslate](https://libretranslate.com/).

It’s built for:
- ✅ Clinics and Vets who want multilingual access
- ✅ Developers who need a real-time, i18n-ready, Dockerized frontend

---

## 🖼️ Architecture

+------------------------+ +---------------------------+ | Vite React Frontend | <----> | LibreTranslate Container | | (Zustand + Hooks) | | (REST API Translation) | +------------------------+ +---------------------------+ | | via Docker Compose | ┌──────────────┐ │ NGINX (prod)│ └──────────────┘


---

## 🌍 Features

✅ Multilingual report generation  
✅ Live translation via REST  
✅ Zustand-powered language state  
✅ Beautiful responsive UI  
✅ Makefile automation  
✅ GitHub Actions CI  
✅ Dev & Prod separation via Docker Compose  

---

## 🚀 Getting Started (For Everyone)

### 📦 No install needed! Just:

```bash
make setup

This will:

    Clean old containers

    Install dependencies

    Build Docker images

    Launch the dev environment

Then visit 👉 http://localhost:5173
🔧 Developer Setup
Prerequisites

    Docker

    PNPM

    Node.js ≥ 18

Manual dev setup

pnpm install
pnpm run dev

Then open: http://localhost:5173
🛠️ Commands & Makefile
Command	Description
make setup	Full clean install and dev bootup
make dev	Run the app in development mode
make prod	Build and run production version
make down	Stop and remove containers
make logs	View container logs
make status	View container status
make test	Run unit tests via Vitest
make ci	Simulate CI build and test pipeline
make nuke	💥 Destroys all containers & volumes
📦 Docker Compose Setup
🧪 Development

make dev

    Access frontend: http://localhost:5173

    LibreTranslate: http://localhost:5000

🏗️ Production

make prod

    App served via NGINX at http://localhost

✅ Running Tests & CI
Unit Tests (Vitest)

make test

Simulate CI pipeline

make ci

GitHub Actions

CI workflow auto-triggers on push to main via .github/workflows/ci.yml.
📸 Screenshots
Report UI (English)	Language Selector	Translated (French)
	
	

    Add your screenshots to frontend/docs and link here.

📄 License

MIT License. Feel free to fork and build your own SIGNAL-powered tools!
Made with ❤️ for open, multilingual healthcare tech.


---

## 🧩 Next steps you could add:

- Live translation progress spinner in UI?
- Dark mode toggle
- GitHub Pages deployment docs
- Rate-limit handling on LibreTranslate

Want me to generate the screenshots section or add a badge section