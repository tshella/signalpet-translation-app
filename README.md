# 🌐 SIGNAL Translation App

A real-time veterinary report UI with multilingual support, live translation powered by [LibreTranslate](https://libretranslate.com), and a modern developer experience using **Vite**, **Zustand**, **Docker**, and **PNPM**.

**Author**: Manaka Anthony Raphasha

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
- [🚧 Future Improvements](#🚧-future-improvements)

---

## 📖 Overview

**SIGNAL** is a multilingual veterinary reporting UI designed to provide clear, beautiful, and translatable reports for clients and professionals across the globe. Text is translated dynamically at runtime using **LibreTranslate** — an open-source, self-hosted translation API.

### 👥 Built for:

- **Veterinarians & Clinics** 🏥 who want to provide reports in multiple languages.
- **Developers & Teams** 👨‍💻 who want a modern, production-ready i18n app.

Languages supported out of the box:
- 🇬🇧 English
- 🇩🇪 German
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇵🇹 Portuguese

---

## 🖼️ Architecture

```text
                    ┌────────────────────────────┐
                    │        Frontend UI         │
                    │   React + Vite + Zustand   │
                    └────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │  LibreTranslate Container   │
                    │   with Hybrid Model Loader  │
                    └────────────────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────┐
                    │        Entrypoint.sh        │
                    │ Auto install models + start │
                    └────────────────────────────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │     NGINX (Prod)   │
                       └───────────────────┘
                                 │
                                 ▼
                     http://localhost or IP

🌍 Features

    ✅ Live translation on language switch

    ✅ Beautiful and responsive UI

    ✅ Zustand for global language state management

    ✅ translate="yes" for declarative translation

    ✅ Real-time feedback with react-hot-toast

    ✅ Automated setup via make setup

    ✅ Local + fallback Argos translation models

    ✅ Clean Docker dev/prod separation

    ✅ CI/CD ready with GitHub Actions

🚀 Getting Started (For Everyone)

make setup

This will:

    Fix permissions on downloaded models

    Install frontend dependencies with PNPM

    Build and start Docker containers

    Verify LibreTranslate and translation is working

👉 Open your browser to: http://localhost:5173
🔧 Developer Setup
📦 Requirements

    Docker

    PNPM

    Node.js ≥ 18

🛠 Manual Dev Run

pnpm install
pnpm run dev

Open: http://localhost:5173
🛠️ Commands & Makefile
Command	Description
make setup	One-click install + boot + verify translation
make dev	Start dev env with hot reload
make prod	Run in production with NGINX
make down	Stop and remove containers
make logs	Show live logs
make status	See container status
make test	Run frontend unit tests via Vitest
make ci	Run CI-like steps: install, build, test
make nuke	💣 Remove all volumes/images (hard reset)
📦 Docker Compose Setup
🧪 Development

make dev

    Frontend: http://localhost:5173

    API: http://localhost:5000/translate

🏗 Production

make prod

    Served via NGINX at: http://localhost

✅ Running Tests & CI
🔬 Local Tests

make test

🧪 Simulate CI

make ci

Runs: install → build → test
🧬 GitHub Actions

CI triggered on push to main
File: .github/workflows/ci.yml
📸 Screenshots
Language Switcher	English Report	French Translation
Add your images under frontend/docs and link here		
📄 License

MIT License.

    Fork, enhance, and build your own SIGNAL-powered translation apps!

🚧 Future Improvements
Feature	Status
🌒 Dark mode	⏳ In planning
🔄 Language spinner	✅ Done
🌍 GitHub Pages deploy	⏳ Planned
🔐 API key / rate limiting	⏳ Planned
🧪 Full e2e testing	⏳ Upcoming
💡 Final Notes

    Everything runs in Docker — no need to install Node or Python.

    Translations are cached for performance.

    Zustand is used for global language state.

    Entrypoint handles hybrid model loading (online + offline).

    Clean builds with make nuke && make setup

❤️ Built for scalable, multilingual healthcare tools.