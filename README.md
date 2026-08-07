# MindVerse

> **Why is it trending? Find out — in seconds.**

MindVerse is an AI-powered trend intelligence tool. Search any person, company, event, meme, or technology, and eight specialized AI agents work in parallel to explain exactly why it's trending right now.

---

## What It Does

- **Trend Feed** — Curated trending topics across Technology, Business, Sports, Entertainment, Politics, Science, Gaming, India, and Global categories
- **Search Any Trend** — Ask "Why is X trending?" and get a complete AI-driven breakdown
- **8-Agent Pipeline** — Discovery ? Research ? Timeline ? Social Pulse ? Sentiment ? Meme Decoder ? Prediction ? Summary
- **Interactive Timeline** — Day-by-day chronological event sequence you can expand
- **Sentiment Analysis** — Donut chart showing public reaction polarity across positive, neutral, negative, and mixed
- **Meme Decoder** — Cultural and internet humor context around the trend
- **Explanation Modes** — ELI10 (simple), General, and Expert Analyst modes
- **Bookmarks & History** — Save and revisit trends, search history drawer

---

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** with custom dark space theme
- **Framer Motion** — Page transitions and card animations
- **Recharts** — Sentiment visualization charts
- **Prisma + PostgreSQL** — Persistent bookmarks/history (with in-memory fallback for zero-config local dev)
- **Web Audio API** — Programmatic Sci-Fi sound effects

---

## Local Development

`bash
# 1. Clone
git clone https://github.com/deep1190/MindVerse.git
cd MindVerse

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# (Optional) Add a PostgreSQL DATABASE_URL to .env
# If left blank, the app uses in-memory storage automatically

# 4. Run dev server
npm run dev
`

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

See [.env.example](./.env.example) for all available variables.

| Variable | Required | Description |
|---|---|---|
| DATABASE_URL | Optional | PostgreSQL connection string. Falls back to in-memory store if not set. |

---

## Deployment

Deployed on **Vercel**. Set DATABASE_URL as a Vercel environment variable pointing to a cloud PostgreSQL instance (Neon or Supabase recommended).

Build command: 
pm run build  
Output: .next (auto-detected by Vercel)

---

## Routes

| Path | Description |
|---|---|
| / | Homepage — trending feed + search |
| /trend/[id] | Full trend analysis page |
