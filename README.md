# VIRAT — Sportswear & Cricket

**Performance meets everyday style.**

VIRAT is a modern, cricket-first sportswear ecommerce website designed to bring performance-inspired clothing, cricket essentials, and everyday athletic wear together in one shopping experience.

The project features a full-stack architecture combining a high-performance React + Vite storefront and an Express + TypeScript API server with database resilience and configurable feature gating.

---

## Architecture Overview

The repository is organized into a cohesive monorepo structure:

```text
virat/
├── public/                  # Public static assets & approved product photography
│   └── images/products/     # 38 optimized WebP product assets
├── src/                     # Storefront React application
│   ├── assets/              # Icons, badges, and brand media
│   ├── components/          # Reusable UI, layout, and admin components
│   ├── context/             # React context (CartContext, AdminAuthContext)
│   ├── pages/               # Page components (Home, AllProducts, ProductPage, Cart, Checkout, Admin)
│   ├── services/            # API integration layer (api.ts) with resilient offline fallback
│   ├── App.tsx              # Client routes
│   └── main.tsx             # Frontend entry point
├── server/                  # Backend Express API server
│   ├── src/
│   │   ├── config/          # Database (db.ts), memory store (memoryStore.ts), env (env.ts)
│   │   ├── controllers/     # Product, order, contact, and admin controllers
│   │   ├── middleware/      # Auth, error handling, and feature gate (featureGate.ts)
│   │   ├── models/          # Mongoose models (Product, Order, Admin, ContactMessage)
│   │   ├── routes/          # Express route definitions
│   │   └── index.ts         # Server entry point & graceful shutdown
│   ├── tests/               # Automated test suites (21 unit & integration tests)
│   ├── .env.example         # Environment template
│   └── package.json
├── index.html
├── package.json             # Frontend dependencies & workspace scripts
└── README.md
```

---

## Key Features

### Storefront & Catalog
- **15 Approved Client Products:** Curated across 8 product families (caps, track pants, training shorts, pro match shorts, geometric tees, sleeveless vests, pique polos, and athletic track jackets).
- **Price-Unconfirmed Safeguard:** Products pending commercial pricing confirmation by the client display a prominent "Price Unconfirmed / Coming Soon" badge and have online purchasing disabled.
- **Client Fallback & Resilience:** When the backend is offline or backend features are gated off, the storefront seamlessly serves the static catalog without error banners or blocking spinners.

### Backend Resilience & Safety
- **Fail-Fast Production Persistence:** In production (`NODE_ENV=production`), the backend strictly requires a live MongoDB connection. In-memory fallback is completely prohibited, and disconnection prevents receiving unsafe transactional traffic.
- **Development In-Memory Fallback:** In local development, an in-memory storage fallback allows frontend and UI developers to work uninterrupted even when MongoDB is not running locally.
- **Operational Health Probes:**
  - `GET /api/health`: Real-time liveness probe reporting service status, database connectivity, and feature gate state.
  - `GET /api/ready`: Readiness probe indicating whether the server is prepared to safely persist customer orders.

### Backend Feature Gate (`BACKEND_FEATURES_ENABLED`)
The server provides a centralized feature gate designed for controlled, safe rollout:
- **Default State (`false`):**
  - Read-only endpoints (`/api/health`, `/api/ready`, `/api/products`) remain fully open.
  - State-mutating endpoints (`/api/orders`, `/api/contact`, `/api/admin/*`) return `HTTP 503 Service Unavailable` with code `BACKEND_FEATURES_DISABLED`.
- **Enabled State (`true`):** All transactional order processing, contact inquiry submissions, and administrative endpoints are fully active.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Frontend Setup
From the repository root:
```bash
# Install frontend dependencies
npm install

# Run frontend development server
npm run dev

# Run frontend linting
npm run lint

# Build frontend production bundle
npm run build
```

### 2. Backend Setup
From the repository root or the `server/` directory:
```bash
# Install server dependencies
npm --prefix server install

# Configure environment variables
cp server/.env.example server/.env

# Run server in development mode (with tsx hot-reloading)
npm --prefix server run dev

# Run server automated test suite
npm --prefix server run test

# Build server TypeScript bundle
npm --prefix server run build
```

---

## Environment Configuration

Configuration is managed via `server/.env` (based on `server/.env.example`):

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `5000` | HTTP port for the Express API server |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) |
| `BACKEND_FEATURES_ENABLED` | `false` | Feature gate for transactional routes (`orders`, `contact`, `admin`) |
| `ALLOW_IN_MEMORY_FALLBACK` | `true` (dev) / `false` (prod) | Allows volatile memory storage when MongoDB is unavailable |
| `MONGODB_URI` | `mongodb://localhost:27017/virat_store` | MongoDB connection string |
| `CLIENT_URL` | `http://localhost:5173` | Allowed CORS origin for the storefront |
| `JWT_SECRET` | *(development default)* | Secret key for signing admin authentication tokens |
| `INITIAL_ADMIN_EMAIL` | `admin@viratsports.com` | Default admin email for bootstrap initialization |
| `INITIAL_ADMIN_PASSWORD` | *(development default)* | Default admin password for bootstrap initialization |

---

## Quality Assurance & Verification

The project includes automated verification across both frontend and backend:
- **Frontend Type & Bundle Verification:** `tsc -b && vite build` (zero errors, clean asset bundling).
- **Frontend Code Quality:** `eslint .` (zero errors).
- **Backend Test Suite:** 21 automated tests covering:
  - Production database safety & fast failure during outages.
  - Development in-memory fallback lifecycle and disconnection isolation.
  - Backend feature gate boolean parsing, public route access, and transactional route blocking.
  - Order pricing integrity (authoritative server pricing; zero-price rejection).
  - Product ID consistency across MongoDB hex ObjectIds and slug identifiers.

---

## License & Ownership

This project and its assets were developed specifically for the **VIRAT** brand. All rights reserved.