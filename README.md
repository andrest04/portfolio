# Portfolio

Personal portfolio showcasing software engineering projects with emphasis on Clean Architecture, DDD, CQRS, and scalable backend systems.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Animation**: Framer Motion
- **i18n**: Custom implementation with middleware-based routing (`/en`, `/es`)
- **Architecture**: Server-first with glass-morphism UI design

## Project Structure

```
src/
├── app/
│   ├── [lang]/           # Localized routes (en, es)
│   ├── api/cv/           # CV download endpoint
│   └── globals.css
├── components/
│   ├── layout/           # Navbar
│   ├── sections/         # Hero, Projects, About, Skills, Contact
│   └── ui/               # Reusable UI components (Button, Card, Input, etc.)
├── content/              # i18n JSON dictionaries (en.json, es.json)
├── lib/                  # Utilities and i18n helpers
└── proxy.ts              # Middleware for locale detection
```

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Available Scripts

- `npm run dev` — Start development server (localhost:3000)
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Key Features

- **Internationalization**: Automatic locale detection with `/en` and `/es` routes
- **Responsive Design**: Mobile-first approach with glass-morphism aesthetics
- **Type Safety**: Strict TypeScript with no `any` types
- **Animation**: Smooth transitions with Framer Motion
- **CV Download**: Dynamic PDF serving via API route
- **SEO**: Sitemap and robots.txt generation

## Code Style

- Self-documenting code (no comments)
- Strict TypeScript types
- Path alias `@/*` for `./src/*`
- Functional components with interface-based props
- Tailwind utility classes with CSS custom properties
- All user-facing text externalized in `src/content/{locale}.json`

## Architecture Decisions

- **Middleware**: Located in `src/proxy.ts` (not root `middleware.ts`)
- **Routing**: Localized with `[lang]` dynamic segment
- **Components**: Server Components by default, Client Components marked with `"use client"`
- **Content Management**: JSON-based i18n with `getDictionary()` helper
