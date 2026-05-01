# SELOV ASX Portfolio — TypeScript Edition

Converted from HTML/JS to a fully modular TypeScript project.  
The HTML file is now only 10 lines — all logic lives in `.ts` files.

## Project Structure

```
selov-portfolio/
├── index.html              ← minimal 10-line shell (not opensourceable)
├── vercel.json             ← Vercel deployment config
├── vite.config.ts          ← Vite bundler config
├── tsconfig.json           ← TypeScript config
├── package.json
│
├── api/                    ← Vercel Serverless Functions
│   ├── chat.ts             ← /api/chat endpoint
│   └── health.ts           ← /api/health endpoint
│
├── src/                    ← All frontend TypeScript modules
│   ├── main.ts             ← Entry point — orchestrates everything
│   ├── types.ts            ← Shared interfaces
│   ├── data.ts             ← All portfolio content/data
│   ├── styles.ts           ← Injects all CSS programmatically
│   ├── dom.ts              ← Builds entire DOM tree from TS
│   ├── starfield.ts        ← Canvas starfield animation
│   ├── typewriter.ts       ← Typewriter subtitle effect
│   ├── counter.ts          ← Animated stat counters
│   ├── cursor.ts           ← Custom cursor tracking
│   ├── skills.ts           ← Skill card interactions
│   ├── music.ts            ← Background music player
│   ├── chat.ts             ← AI chat + support chat
│   └── nav.ts              ← Hamburger menu + scroll helpers
│
└── backend/                ← Standalone Express backend (for Render/Railway)
    ├── src/server.ts       ← TypeScript Express server
    ├── package.json
    └── tsconfig.json
```

## Deploy to Vercel (Recommended)

1. Push this folder to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite. Set:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy — the `/api/` routes are auto-handled by `api/chat.ts` and `api/health.ts`

## Local Development

```bash
# Install dependencies
npm install

# Run Vite dev server (frontend only, API proxied to localhost:3000)
npm run dev

# In a separate terminal — run the backend
cd backend
npm install
npm run dev
```

## Deploy Backend to Render/Railway

If you prefer to keep the Express backend separate:

```bash
cd backend
npm install
npm run build
npm start
```

Set the environment variable `PORT` if needed.

## Customize Your Content

Edit `src/data.ts` to update:
- Skills list + proficiency levels
- Project links and descriptions
- Social media handles
- Stats numbers
- Typewriter phrases
- WhatsApp number
- Music source URL
