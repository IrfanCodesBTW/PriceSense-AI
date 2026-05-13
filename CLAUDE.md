# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PriceSense is an AI-powered pricing intelligence platform for local businesses (restaurants, cloud kitchens, SMBs). It provides competitor radar, revenue forecasts, dynamic pricing, and a WhatsApp AI assistant.

## Tech Stack

- **Framework**: TanStack Start (React 19 + TypeScript)
- **Routing**: TanStack Router (file-based routing in `src/routes/`)
- **Data**: TanStack React Query
- **UI**: TailwindCSS v4 + Radix UI components + Framer Motion
- **Deployment**: Cloudflare Workers (Wrangler)

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

## Architecture

### Routes

Routes are defined in `src/routes/` as file-based routes. The route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually.

- `/` — Landing page (index.tsx)
- `/dashboard` — Main dashboard
- `/assistant` — WhatsApp AI assistant
- `/radar` — Competitor radar map
- `/pricing` — Pricing plans
- `/onboarding` — User onboarding
- `/login` — Authentication

### Components

- Site-specific components in `src/components/site/`
- Reusable UI components in `src/components/ui/` (shadcn/ui-style Radix wrappers)
- Uses `@` path alias (configured in tsconfig and vite config)

### Configuration

The project uses `@lovable.dev/vite-tanstack-config` which auto-configures:
- TanStack Start, React, TailwindCSS, Vite
- Cloudflare plugin (build only)
- Path aliases (`@` → `src`)
- TypeScript paths

Do NOT manually add these plugins in `vite.config.ts` — the Lovable config already includes them and duplication will break the build.

### Server Entry

SSR entry point is `src/server.ts`. The `vite.config.ts` redirects `tanstackStart.server.entry` to this file for Cloudflare builds.

## Important Notes

- The project is deployed to Cloudflare Workers — keep Cloudflare-compatible patterns in mind (no Node.js-specific APIs in client code)
- `src/routeTree.gen.ts` is auto-generated — changes to routes update this file automatically
- Environment variables with `VITE_` prefix are injected into the client