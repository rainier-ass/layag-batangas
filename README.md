# Layag Batangas

Layag Batangas is a Next.js tourism site for showcasing places to visit across Batangas. It includes a split hero section, featured destination cards powered by spot objects, travel stories, a login modal in the navbar, a footer, and an embedded Flowise chatbot.

## Features

- Hero section with left-aligned intro text and a 3-image slideshow
- Featured destinations section driven by `lib/spots.ts`
- Stories section with editorial-style cards
- Navbar with a login modal for email/password plus Gmail and Facebook sign-in actions
- Global footer with contact and quick links
- Flowise chatbot embedded in the shared layout

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

2. Run the development server:

```bash
npm run dev
```

3. Open the app:

```bash
http://localhost:3000
```

## Project Structure

- `app/layout.tsx` - shared app shell, fonts, navbar, footer, and chatbot embed
- `app/page.tsx` - homepage composition
- `app/sections/hero-section.tsx` - hero with slideshow
- `app/sections/featured-destionations.tsx` - featured destination cards
- `app/sections/stories-section.tsx` - stories layout
- `components/navbar.tsx` - navbar and login modal
- `app/components/footer.tsx` - footer component
- `lib/spots.ts` - destination objects

## Notes

- Images are loaded from the `public/` folder.
- The Flowise chatbot is initialized globally from the shared layout.
- The navbar CTA opens the login modal instead of navigating to a section.
