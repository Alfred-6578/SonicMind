# SonicMind Frontend

AI customer support chat. Public visitors chat against an admin-managed knowledge base.

## Stack
Next.js 16 · Tailwind 4 · Motion · Lenis · Geist · TypeScript

## Setup
```bash
git clone <repo>
cd sonicmind
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev
```

## Routes
- `/` public chat
- `/login` admin sign-in
- `/admin` documents (protected)

## Deploy
Vercel. Set NEXT_PUBLIC_API_URL in env. Deploy from main.
