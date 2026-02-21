# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

There are no tests in this project.

## Backend Setup

The backend is a dockerized Spring Boot API (`shenol10/habit-tracker-api-app:1.0.0`) backed by PostgreSQL and Redis. It must be running for the frontend to work.

```bash
docker compose up -d    # start backend (API on :8080, Postgres on :5432, Redis on :6379)
docker compose down     # stop backend
```

Required `.env` file in the project root:
```
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=habit_tracker_db
JWT_SECRET=<256-bit secret>
```

On Apple Silicon, if the backend fails to start, add `platform: linux/arm64` to the `app` service in `compose.yml`.

## Architecture

**Provider stack** (`src/main.jsx`): `QueryClientProvider` → `MantineProvider` → `AuthProvider` → `App`

**Auth** (`src/store/authContext.jsx`): JWT access tokens are stored in React state (not localStorage). On app load, `AuthProvider` attempts a token refresh via httpOnly cookie. Axios interceptors in `authContext` attach the `Authorization` header to every request and automatically retry with a refreshed token on 401 responses. The `useAuth()` hook exposes `user`, `isAuthenticated`, `login`, `register`, and `logout`.

**Routing** (`src/App.jsx`): Two route guard wrappers:
- `GuestGuard` — wraps public routes (`/`, `/login`, `/register`)
- `AuthGuard` — wraps protected routes (`/dashboard`, `/habits/create`, `/habits/edit/:id`, `/habits/details/:id`)

**Data fetching**: TanStack Query hooks live in `src/hooks/`. Services in `src/service/` call the axios instance from `src/api/api.js`. All API endpoints are centralized in `src/api/endpoints.js` (base URL: `http://localhost:8080/api`).

**UI**: Mantine v8 for components/forms, Tailwind CSS v4 for utility classes (via `@tailwindcss/vite` plugin), `@tabler/icons-react` for icons, Recharts/`@mantine/charts` for data visualization.

**Form validation**: Zod schemas in `src/schemas/`, integrated with Mantine forms via `mantine-form-zod-resolver`.

**Date handling**: `dayjs` with ISO week plugin configured in `src/config/dayjsSetup.js` — always import dayjs through this setup or ensure plugins are loaded.
