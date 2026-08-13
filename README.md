# Faheem — Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-dev--faheem.vercel.app-success?style=for-the-badge)](https://dev-faheem.vercel.app/)

A production-ready React + Bootstrap portfolio with a dynamic light/dark theme and a "schematic" design language — a blueprint-style margin rail, mono-spaced technical labels, and case studies structured as Problem → Architecture → Result.

## 👨‍💻 About Me
**Faheem Ahmed** | Full-Stack Developer & Final-year Software Engineering Student
- 📧 **Email:** [faheem.webwork@gmail.com](mailto:faheem.webwork@gmail.com)
- 🔗 **LinkedIn:** [linkedin.com/in/mr-faheem](https://www.linkedin.com/in/mr-faheem/)
- 🐙 **GitHub:** [github.com/faheemcodes](https://github.com/faheemcodes/)
- 🌍 **Location:** Available for remote & on-site engagements

## 🛠️ Core Skills & Technologies

### 01 Frontend Engineering
Interfaces built for clarity and performance, from component architecture to interaction detail.
**Skills:** React, JavaScript, jQuery, Bootstrap, HTML5, CSS3

### 02 Backend & Database
Server-side systems and data layers engineered for reliability under real production load.
**Skills:** Laravel, PHP, MySQL

### 03 Automation & AI
Scripts, test harnesses, and AI-assisted workflows that remove repetitive work from the pipeline.
**Skills:** Python, Software Testing, AI Integration

## 🚀 Projects & Case Studies

### 1. SalonHub (Live)
**Multi-tenant marketplace and management portal for grooming services.**
- **Problem:** Independent salons had no shared platform to manage bookings, staff schedules, and customer relationships in real time, forcing fragmented, manual workflows across each location.
- **Architecture:** A multi-tenant React frontend consumes a Laravel API with tenant-isolated MySQL data, handling real-time booking states, staff availability, and role-based access per salon.
- **Result:** Salons run bookings, staff, and customers from a single portal, with each tenant fully isolated and able to scale independently as new locations come online.
- **Stack:** Laravel, MySQL, React, Bootstrap

### 2. Automated QA Dashboard (Internal Tool)
**Centralized testing suite linking Python automation to deployment QA.**
- **Problem:** Pre-deployment quality checks were manual and inconsistent, slowing releases and letting regressions slip through without a single source of truth for test status.
- **Architecture:** Python automation scripts execute test suites and report results into a Laravel backend, which aggregates pass/fail state into a live dashboard for release decisions.
- **Result:** Releases are gated on automated, repeatable checks instead of manual sign-off, with a clear historical record of test runs across every deployment.
- **Stack:** Python, Laravel, Software Testing, MySQL

### 3. AI-Driven Workflow Hub (In Development)
**Middleware platform integrating business tools through AI-assisted automation.**
- **Problem:** Teams relied on disconnected business tools with no shared automation layer, requiring repetitive manual handoffs between systems that should talk to each other.
- **Architecture:** Python microservices handle AI-driven task routing and tool integrations, coordinated through a Laravel core that manages workflow state and connected-tool credentials.
- **Result:** Routine cross-tool tasks are automated end-to-end, reducing manual handoffs and giving teams a single hub to monitor and trigger automated workflows.
- **Stack:** Python, Laravel, AI Integration, Microservices

## 🎓 Experience & Certifications
- **Software Engineering, Final-Year Student (2023 — Present)**
  Coursework and independent projects spanning full-stack development, database design, and software testing methodology, applied directly to production-style case studies.
- **Google AI Fundamentals** - Coursera

---

## 🏗️ Portfolio Tech Stack

- **React 18** (Create React App)
- **Bootstrap 5** (grid + utilities only — visual identity is custom CSS)
- **Google Fonts:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/data)
- Zero extra UI libraries — everything is hand-built and dependency-light

## 💻 Getting started

```bash
npm install
npm start
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
```

The output lands in `/build`, ready to deploy to Netlify, Vercel, GitHub Pages, or any static host.