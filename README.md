# Habit Tracker

A full-stack habit tracking application built with **React**, **Vite**, and a **Spring Boot** backend.

Track daily habits, monitor streaks, visualize progress with charts, and manage your profile — all in a clean, responsive UI.

## Tech Stack

**Frontend** — React 19, Vite, Mantine v8, Tailwind CSS v4, TanStack Query, Recharts, Zod

**Backend** — Spring Boot (Dockerized), PostgreSQL, Redis, JWT Auth

## Requirements

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) v18+
- [Docker](https://www.docker.com/)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/ShenolShengov/react-habit-tracker.git
cd react-habit-tracker
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=habit_tracker_db
JWT_SECRET=your-256-bit-secret
```

Generate a JWT secret (at least 256 bits) at [jwtsecrets.com](https://jwtsecrets.com/).

### 3. Run the full app (single command)

```bash
docker compose up -d
```

This builds the frontend image and starts everything: Frontend on `:5173`, API on `:8080`, PostgreSQL on `:5432`, and Redis on `:6379`.

Open [http://localhost:5173](http://localhost:5173).

To stop:

```bash
docker compose down
```

### 3b. Development mode (alternative)

If you prefer hot reload during development, start only the backend services and run the frontend with Vite:

```bash
docker compose -f compose-dev.yml up -d   # backend only
npm run dev                                 # frontend with hot reload
```

> **Apple Silicon:** If the backend fails to start, add `platform: linux/arm64` to the `app` service in the compose file.

For more backend details, see the [backend repository](https://github.com/hyuseinleshov/habit-tracker-api).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Features

- Create, edit, and delete habits
- Daily check-ins with streak tracking
- Dashboard with stats overview and weekly chart
- Calendar view of check-in history
- Monthly check-in breakdown charts
- User profile management
- Admin panel for user management
- JWT authentication with automatic token refresh
- Fully responsive (mobile + desktop)

## Project Structure

```
src/
├── api/            # Axios instance and endpoint definitions
├── components/     # UI components (dashboard, habits, home, etc.)
├── config/         # dayjs setup
├── guards/         # Route guards (Auth, Guest, Admin)
├── hooks/          # TanStack Query hooks
├── layouts/        # Guest, Auth, and Dashboard layouts
├── schemas/        # Zod validation schemas
├── service/        # API service functions
└── store/          # Auth context (JWT state management)
```

## License

This project is open-source and free to use.
