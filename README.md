# PriceSense

AI-Powered Pricing Intelligence Platform for Local Businesses.

PriceSense helps restaurants, cloud kitchens, and SMBs compete smarter by providing real-time competitor insights, revenue forecasts, dynamic pricing recommendations, and a WhatsApp AI assistant.

## Features

- **Competitor Radar** — Continuously scan a 5km radius for price changes and competitor activity
- **AI Recommendations** — Confidence-scored pricing moves with predicted revenue impact
- **Revenue Forecasts** — 30-day projections based on your menu, traffic, and local demand
- **WhatsApp Assistant** — Daily AI digest delivered to WhatsApp. Ask questions in plain language.
- **Dynamic Pricing** — Auto-tune prices by hour, day, weather, and demand spikes
- **Market Alerts** — Instant notifications for competitor launches, discounts, and stock-outs

## Tech Stack

- **Framework**: TanStack Start (React 19 + TypeScript)
- **Routing**: TanStack Router (file-based routing)
- **Data**: TanStack React Query
- **UI**: TailwindCSS v4 + Radix UI components + Framer Motion
- **Deployment**: Cloudflare Workers

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pricesenseintelligence-main

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```
pricesenseintelligence-main/
├── src/
│   ├── components/
│   │   ├── site/          # Site-specific components
│   │   └── ui/            # Reusable UI components (shadcn-style)
│   ├── routes/           # TanStack Router file-based routes
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities
│   ├── router.tsx        # Router configuration
│   ├── server.ts         # SSR entry point
│   └── start.ts          # App start configuration
├── public/               # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── wrangler.jsonc       # Cloudflare Workers config
```

## Routes

- `/` — Landing page
- `/dashboard` — Main dashboard
- `/assistant` — WhatsApp AI assistant
- `/radar` — Competitor radar map
- `/pricing` — Pricing plans
- `/onboarding` — User onboarding
- `/login` — Authentication

## Deployment

The project is deployed to Cloudflare Workers using Wrangler.

```bash
# Build for production
npm run build

# Preview Cloudflare deployment
npm run preview
```

## License

Private — All rights reserved.# PriceSense-AI
