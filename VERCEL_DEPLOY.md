# Deploying to Vercel

This project is a TanStack Start (SSR) app. On Vercel it builds via Nitro's
`vercel` preset and outputs the Build Output API at `.vercel/output`, which
Vercel auto-detects — no `vercel.json` required.

## One-time setup in Vercel

1. Import the repo into Vercel.
2. Framework Preset: **Other** (Vercel auto-detects the Build Output API).
3. Build Command: `vite build` (default).
4. Output Directory: leave blank.
5. Install Command: `bun install` (or `npm install`).
6. Node.js Version: 20.x or newer.

## Environment variables

Vercel sets `VERCEL=1` automatically during builds — `vite.config.ts` reads
that to switch Nitro to the `vercel` preset, so you don't need to set
`NITRO_PRESET` yourself.

Add any `VITE_*` variables your app needs (none are required by default).

## Local check

```
VERCEL=1 bun run build
```

Should produce a `.vercel/output/` directory. Deploy via `vercel deploy`
or push to the connected git branch.