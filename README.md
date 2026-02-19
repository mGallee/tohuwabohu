# Tohuwabohu Wien

Website for **Tohuwabohu** — a Vienna-based culture and music collective (_Kultur- und Musikverein_) creating immersive spaces where music and art collide.

🌐 **Live:** [tohuwabohu.wien](https://tohuwabohu.wien)

---

## Tech Stack

| Layer      | Technology                                            |
| ---------- | ----------------------------------------------------- |
| Framework  | [Next.js](https://nextjs.org/) (App Router)           |
| Language   | [TypeScript](https://www.typescriptlang.org/)         |
| CMS        | [Payload CMS](https://payloadcms.com/) (headless)     |
| Database   | [PostgreSQL 15](https://www.postgresql.org/)          |
| Styling    | [Tailwind CSS](https://tailwindcss.com/)              |
| Linting    | [ESLint](https://eslint.org/)                         |
| Formatting | [Prettier](https://prettier.io/)                      |
| CI/CD      | [GitHub Actions](https://github.com/features/actions) |

---

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [Docker](https://www.docker.com/) (for the local PostgreSQL database)

---

## Getting Started

### 1. Start the database

Spin up a local PostgreSQL instance using Docker:

```bash
docker compose up -d
```

This starts a `postgres:15` container with the following defaults:

| Setting  | Value            |
| -------- | ---------------- |
| Host     | `localhost:5432` |
| Database | `tohuwabohu`     |
| User     | `postgres`       |
| Password | `postgres`       |

### 2. Configure environment

Create a `.env.local` file in the project root and set the required environment variables (database connection, Payload secret, etc.).

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site and [http://localhost:3000/admin](http://localhost:3000/admin) to access the Payload CMS admin panel.

---

## Project Structure

The `src/` directory contains the Next.js App Router (`app/`) split into a `(frontend)` route group for the public site and a `(payload)` route group for the CMS admin and API. Payload CMS collection definitions live in `collections/`, shared UI in `components/`, database migrations in `migrations/`, seed scripts in `seed/`, and configuration in `payload.config.ts`.

---

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build for production         |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## Database

The project uses **PostgreSQL 15** managed via Docker Compose. Data is persisted in a named volume (`postgres_data`) so it survives container restarts.

```bash
# Start DB
docker compose up -d

# Stop DB
docker compose down

# Wipe DB (removes volume)
docker compose down -v
```

---

## CMS

Content is managed through [Payload CMS](https://payloadcms.com/), which runs embedded inside the Next.js app. The admin panel is available at `/admin` and connects directly to the PostgreSQL database.

---

## Deployment

The site is deployed via [Vercel](https://vercel.com/) and is live at [tohuwabohu.wien](https://tohuwabohu.wien). CI is handled via GitHub Actions (lint on push). In production, ensure `DATABASE_URI` and the other environment variables from `.env.local` are set in the deployment environment.
