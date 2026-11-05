# Portfolio

Personal portfolio of Andrés Torres, presenting real software engineering projects, experience, and a downloadable CV in English and Spanish.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: Hand-written CSS in `src/app/globals.css`, on Tailwind CSS 4 with a few utilities on the error and not-found pages
- **Animation**: CSS transitions and keyframes, triggered by an IntersectionObserver
- **i18n**: `next-intl` request config with JSON dictionaries, and the locale stored in a cookie rather than the URL
- **Design system**: The Evidence Folio, one light theme documented in `DESIGN.md`

## Project Structure

```
src/
├── app/
│   ├── api/cv/           # CV download endpoint
│   ├── error.tsx         # Localized error boundary
│   ├── not-found.tsx     # Localized 404 page
│   ├── layout.tsx        # Metadata, font, and footer
│   ├── page.tsx          # The single page
│   └── globals.css       # All site styles and tokens
├── components/
│   ├── layout/           # SiteNav, SiteFooter, LangSwitch, ExternalLink, ErrorCopyProvider
│   ├── motion/           # RevealObserver, LedgerRowAnchor
│   └── sections/         # Hero, Work, Experience, Skills, About, Contact
├── content/              # en.json, es.json, and the test that keeps them in step
├── i18n/request.ts       # Reads the locale cookie for next-intl
├── lib/                  # Dictionary loader, locale action, and contact details
├── types/i18n.ts         # Dictionary type
└── proxy.ts              # Sets the locale cookie from Accept-Language on first visit
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
- `npm test` — Run the tests with the Node.js test runner

## Key Features

- **Internationalization**: English and Spanish on one URL, detected on first visit and switched from the navigation
- **Responsive Design**: One light theme, with the layout changing at 600, 768, 900, 1100, and 1200px
- **Type Safety**: Strict TypeScript
- **Animation**: A masked headline on load and short section reveals, all gated on script and the reduced-motion preference
- **CV Download**: `/api/cv` serves the PDF in `public/` as an attachment, with a readable message if it is missing
- **SEO**: Sitemap and robots.txt generation

## Code Style

- Strict TypeScript types
- Path alias `@/*` for `./src/*`
- Functional components with typed props
- Plain CSS classes with CSS custom properties
- All user-facing page text externalized in `src/content/{locale}.json`, with identical keys in both files

## Architecture Decisions

- **Proxy**: Located in `src/proxy.ts`, the Next.js 16 name for middleware
- **Routing**: A single route; the language comes from the `NEXT_LOCALE` cookie, not a path segment
- **Components**: Server Components by default, Client Components marked with `"use client"`
- **Content Management**: JSON dictionaries loaded with the `getDictionary()` helper
