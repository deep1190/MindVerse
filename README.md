# MindVerse 🌌

> **Explore Intelligence. Understand the World.**

MindVerse is an AI-powered knowledge universe where users explore planets representing knowledge domains. The MVP launches **News Planet** — a multi-agent system that explains *why* anything is trending.

## Features

- 🪐 **3D Space Landing Page** — Orbiting planets with starfield particle canvas and warp-drive transitions
- 🔍 **Why Is It Trending Engine** — 8 specialized AI agents (Discovery, Research, Timeline, Social Pulse, Sentiment, Meme Decoder, Prediction, Summary)
- 📊 **Interactive Visualizations** — Recharts sentiment donut charts, expandable chronological timelines, live social pulse feeds
- 🧠 **Explanation Modes** — ELI10, General Citizen, and Expert Analyst
- 🔖 **Bookmarks & Search History** — Persistent via PostgreSQL (Prisma) with local fallback
- 🎵 **Programmatic Audio** — Sci-Fi sound effects via Web Audio API

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Framer Motion**
- **Recharts**
- **Prisma + PostgreSQL**

## Local Development

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy env template: `cp .env.example .env` and fill in `DATABASE_URL`
4. Run dev server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deployed on **Vercel**. Set `DATABASE_URL` in Vercel environment variables pointing to a cloud PostgreSQL instance (Neon recommended).

## Planets Roadmap

| Planet | Status |
|---|---|
| 🌍 News Planet | ✅ MVP Live |
| 🕵 Detective Planet | 🔜 Coming Soon |
| 📚 History Planet | 🔜 Coming Soon |
| 💡 Startup Planet | 🔜 Coming Soon |
| 🧠 Psychology Planet | 🔜 Coming Soon |
