# Prediction Market Demo — Technical Guide

## Public Repository Scope

This repository is a Vue 3 frontend demonstration for Polymarket-style prediction market development. Market prices, positions, and balances are sample data. The public code does not implement live trading, fund custody, order matching, or blockchain settlement.

## Project Layout

| Path | Purpose |
| --- | --- |
| `src/main.js` | Application startup and routing setup |
| `src/App.vue` | Shared application shell |
| `src/data.js` | Sample prediction market data |
| `src/views/Home.vue` | Event browsing interface |
| `src/views/Detail.vue` | Event detail and outcome order interface |
| `src/views/Mine.vue` | Portfolio demonstration |
| `public/favicon.svg` | Demo favicon |
| `screenshots/` | Reference images of the demo |
| `vite.config.js` | Frontend development and build configuration |

## Local Development

```bash
npm ci
npm run dev
```

Use the URL printed by Vite. The development server uses port 5173 and is configured to accept network connections for mobile preview; use it only on a trusted development network.

## Build and Preview

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. For a static deployment, configure your hosting service to serve the built assets and provide an SPA fallback if required by your routing setup.

## Custom Prediction Market Development

A separately scoped platform can cover event management, authenticated accounts, outcome trading, order matching, wallets, settlement, and an admin dashboard. These components require their own implementation, integration, and validation; they are not included in this frontend demo.

For a white-label prediction market or source-code delivery, confirm the branding, supported market types, data sources, API contracts, deployment environment, and deliverables before implementation.

See [README.md](README.md#contact) for development enquiries.
