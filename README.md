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
                    │    REST API for Language    │
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

    ✅ Clean Docker development/production separation

    ✅ CI/CD via GitHub Actions

🚀 Getting Started (For Everyone)

No installation needed. Just run:

make setup

🔧 This will:

    Stop any running containers

    Install frontend dependencies with pnpm

    Build Docker images

    Launch your development environment

Then visit 👉 http://localhost:5173
🔧 Developer Setup
📦 Requirements

    Docker

    PNPM

    Node.js ≥ 18

🛠 Manual Setup

pnpm install
pnpm run dev

Then open http://localhost:5173
🛠️ Commands & Makefile
Command	Description
make setup	Full clean install + boot the dev environment
make dev	Launch the app in development mode
make prod	Build and run production with NGINX
make down	Stop and remove all containers
make logs	Follow Docker logs
make status	Check running containers
make test	Run Vitest unit tests
make ci	Simulate CI (build + test)
make nuke	💣 Remove containers, volumes, and images
📦 Docker Compose Setup
🧪 Development

make dev

    Frontend served at: http://localhost:5173

    LibreTranslate API: http://localhost:5000

🏗️ Production

make prod

App is bundled and served via NGINX at:

👉 http://localhost
✅ Running Tests & CI
🔬 Local Tests

make test

🧪 CI Simulation

make ci

    Includes install, build, and test steps.

🧬 GitHub Actions

CI pipeline is triggered on push to main.

File: .github/workflows/ci.yml
📸 Screenshots
Language Selector	English Report	Translated Report (French)
	
	

    Add screenshots under frontend/docs and link here.

📄 License

MIT License.
Feel free to fork and build your own SIGNAL-powered translation apps!
🚧 Future Improvements
Feature	Status
🌒 Dark mode	⏳ In planning
🔄 Language progress spinner	✅ Done
🌍 GitHub Pages deploy	⏳ Planned
🔐 API key / rate limit UI	⏳ Planned
🧪 Full e2e testing setup	⏳ Upcoming
💡 Final Notes

    Everything runs inside Docker. No need to install Node or dependencies manually.

    Translations are cached locally to reduce repeated API calls.

    Zustand is used for central language state.

❤️ Built for scalable, multilingual healthcare tools.


---

Let me know if you want me to:
- Add badges (coverage, Docker pulls, etc.)
- Generate the actual screenshots (EN, FR, Language Selector)
- Create a `CONTRIBUTING.md` or GitHub Pages deployment workflow
