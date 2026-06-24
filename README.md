# Energy Dashboard

Smart battery controller dashboard for real-time energy management in Groningen, NL. Displays charge/discharge decisions based on electricity prices and solar radiation forecasts.

## Features

- **Verdict Card** — Real-time CHARGE / DISCHARGE / HOLD decision with context
- **Price Chart** — Hourly electricity price forecast (€/MWh) with highlighted current, cheapest, and most expensive hours
- **Solar Chart** — Solar radiation forecast (W/m²) for the upcoming hours
- **Status Footer** — Online/offline indicator, last update timestamp, and API docs link
- **Auto-polling** — Data refreshes every 5 minutes
- **Error handling** — Graceful error state with retry button

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Recharts 3](https://recharts.org/) — Charts library
- [OxLint](https://oxc.rs/docs/guide/usage/linter) — Linter

## Getting Started

### Prerequisites

- Node.js 18+
- A running backend API (see [API](#api) below)

### Installation

```bash
git clone https://github.com/<your-user>/energy-dashboard.git
cd energy-dashboard
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
VITE_API_BASE_URL=http://localhost:8000
```

Or point to the production backend:

```
VITE_API_BASE_URL=https://battery-brain-production.up.railway.app
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
  api/
    client.ts          # API client with timeout and abort controller
    types.ts           # TypeScript interfaces for API responses
  components/
    VerdictCard.tsx    # CHARGE/DISCHARGE/HOLD decision card
    PriceChart.tsx     # Bar chart for electricity prices
    SolarChart.tsx     # Area chart for solar radiation
    StatusFooter.tsx   # Online status and last update
    ErrorState.tsx     # Error display with retry
    LoadingSkeleton.tsx # Loading placeholder
  App.tsx              # Main app with data fetching and polling
  main.tsx             # React entry point
  index.css            # Tailwind CSS import
```

## API

The dashboard consumes a REST API with the following endpoints:

| Endpoint              | Method | Description                          |
| --------------------- | ------ | ------------------------------------ |
| `/health`             | GET    | Health check (status, version, time) |
| `/api/v1/decision`    | GET    | Battery decision + price forecast    |
| `/api/v1/forecast`    | GET    | Solar radiation forecast             |
| `/docs`               | GET    | API documentation (Swagger/ReDoc)    |

**Default base URL:** `http://localhost:8000`

**Production:** `https://battery-brain-production.up.railway.app`

## License

MIT
