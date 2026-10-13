# Layag Batangas

Layag Batangas is a Next.js tourism site for showcasing places to visit across Batangas. It includes a split hero section, featured destination cards powered by spot objects, travel stories, a trip planner, a footer, and a Gemini-powered travel assistant.

## Features

- Hero section with left-aligned intro text and a 3-image slideshow
- Featured destinations section driven by `lib/spots.ts`
- Stories section with editorial-style cards
- Navbar with access to the saved trip planner
- Global footer with contact and quick links
- Gemini-powered travel assistant with a local fallback when Gemini is unavailable

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui and Base UI primitives

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example` and add your Gemini API key:

```env
GEMINI_API_KEY=your_key_here
```

Keep this key server-side and do not commit `.env.local`.

3. Run the development server:

```bash
npm run dev
```

3. Open the app:

```bash
http://localhost:3000
```

## Project Structure

- `app/layout.tsx` - shared app shell, fonts, navbar, footer, and travel assistant
- `app/api/chat/route.ts` - server-side Gemini chat endpoint
- `app/page.tsx` - homepage composition
- `app/sections/hero-section.tsx` - hero with slideshow
- `app/sections/featured-destionations.tsx` - featured destination cards
- `app/sections/stories-section.tsx` - stories layout
- `components/navbar.tsx` - navbar and trip planner trigger
- `components/travel-assistant.tsx` - Gemini chat UI and offline fallback
- `app/components/footer.tsx` - footer component
- `lib/spots.ts` - destination objects

## Notes

- Images are loaded from the `public/` folder.
- Gemini receives the destination catalog from `lib/spots.ts` as its travel context.
- If `GEMINI_API_KEY` is unavailable, the assistant falls back to local destination responses.
