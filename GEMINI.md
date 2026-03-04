# Portfolio - Gemini AI Context

## Project Overview
This project is a personal portfolio showcasing software engineering projects. It highlights skills in Clean Architecture, DDD, CQRS, and scalable backend systems. The application is built with **Next.js 16** utilizing the **App Router** and **React Server Components**, and features a glass-morphism UI design.

### Key Technologies
- **Framework**: Next.js 16
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animation**: Framer Motion
- **i18n**: Custom middleware-based routing (`/en`, `/es`)

## Building and Running
The project uses `npm` for package management.

- **Start Development Server**: `npm run dev` (starts on http://localhost:3000)
- **Create Production Build**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint Code**: `npm run lint`

## Architecture & Project Structure
- **Routing**: Handled via the `src/app/[lang]/` dynamic segment to support localized routes.
- **Middleware**: The middleware for locale detection is located at `src/proxy.ts` (not the standard root `middleware.ts`).
- **Components**:
  - Prefer **Server Components** by default.
  - Mark interactive components explicitly with `"use client"`.
  - Reusable UI elements are housed in `src/components/ui/`, while section-level components are in `src/components/sections/`.
- **API**: Contains a custom API route (`src/app/api/cv/route.ts`) for dynamic PDF serving.

## Development Conventions & Code Style
When modifying or adding code to this project, strictly adhere to the following conventions:

1.  **TypeScript**: Enforce strict types. Absolutely no `any` types. Functional components must use interface-based props.
2.  **Self-Documenting Code**: Prioritize readable code and descriptive naming over comments. Avoid writing comments.
3.  **Path Aliasing**: Use the `@/*` path alias when importing files from the `src/` directory.
4.  **Styling**: Utilize Tailwind utility classes alongside CSS custom properties.
5.  **Internationalization (i18n)**: All user-facing text must be externalized. Never hardcode strings in components. Add new strings to the respective JSON dictionaries in `src/content/en.json` and `src/content/es.json` and retrieve them using the `getDictionary()` helper.
