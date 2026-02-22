# Habit Tracker

A full-stack habit tracking application built with **React**, **Vite**, and a **Spring Boot** backend.

Track daily habits, monitor streaks, visualize progress with charts, and manage your profile — all in a clean, responsive UI.

## Tech Stack

**Frontend** — React 19, Vite, Mantine v8, Tailwind CSS v4, TanStack Query, Recharts, Zod

**Backend** — Spring Boot (Dockerized), PostgreSQL, Redis, JWT Auth — [backend repository](https://github.com/hyuseinleshov/habit-tracker-api)

## Quick Start (Docker only)

No need to clone the repository. Just [Docker](https://www.docker.com/) is required.

### 1. Create a project directory

```bash
mkdir habit-tracker && cd habit-tracker
```

### 2. Create a `.env` file

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=habit_tracker_db
JWT_SECRET=your-256-bit-secret
```

Generate a JWT secret (at least 256 bits) at [jwtsecrets.com](https://jwtsecrets.com/).

### 3. Create a `compose.yml` file

```yaml
services:
  postgres-db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - habit-tracker-network

  redis:
    image: redis:7-alpine
    restart: always
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - habit-tracker-network

  app:
    image: shenol10/habit-tracker-api-app:1.0.0
    restart: always
    ports:
      - "8080:8080"
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres-db:5432/${POSTGRES_DB}
      SPRING_DATA_REDIS_HOST: redis
      SPRING_DATA_REDIS_PORT: 6379
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres-db:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - habit-tracker-network

  frontend:
    image: shenol10/habit-tracker-frontend:1.0.0
    restart: always
    ports:
      - "5173:80"
    depends_on:
      - app
    networks:
      - habit-tracker-network

networks:
  habit-tracker-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
```

### 4. Start the app

```bash
docker compose up -d
```

Open [http://localhost:5173](http://localhost:5173).

> **Apple Silicon:** If the backend fails to start, add `platform: linux/arm64` to the `app` service in `compose.yml`.

## Development Setup

For local development with hot reload. Requires [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) v18+, and [Docker](https://www.docker.com/).

### 1. Clone and install

```bash
git clone https://github.com/ShenolShengov/react-habit-tracker.git
cd react-habit-tracker
npm install
```

### 2. Create a `.env` file in the project root

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=habit_tracker_db
JWT_SECRET=your-256-bit-secret
```

Generate a JWT secret (at least 256 bits) at [jwtsecrets.com](https://jwtsecrets.com/).

### 3. Start the backend

```bash
docker compose -f compose-dev.yml up -d
```

This starts the API on `:8080`, PostgreSQL on `:5432`, and Redis on `:6379`.

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

> **Apple Silicon:** If the backend fails to start, add `platform: linux/arm64` to the `app` service in `compose-dev.yml`.

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
