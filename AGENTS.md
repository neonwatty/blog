# Repository Guidelines

This document guides contributors working in this repository. Keep changes small, tested, and consistent with the existing codebase.

## Project Structure & Module Organization
- `app/` — Next.js App Router pages, layout, and global styles (`globals.css`).
- `components/` — Reusable React components (PascalCase files).
- `lib/` — Data and utilities (e.g., `posts.ts`, `slides.ts`, `analytics.ts`).
- `posts/` — Markdown content with frontmatter.
- `public/` — Static assets (images, icons, sitemap outputs).
- `types/` — Shared TypeScript types.
- `__tests__/` — Unit/integration tests; `tests/e2e/` — Playwright specs.
- `scripts/` — Content/build helpers (e.g., `generate-rss.js`, `generate-slideshow.js`).

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server.
- `npm run build` / `npm run start` — Production build and server.
- `npm run lint` / `lint:fix` — ESLint check/fix for `app`, `components`, `lib`, `types`.
- `npm run type-check` — TypeScript type checks.
- `npm run test` / `test:ci` — Jest unit tests (CI adds coverage in `coverage/`).
- `npm run test:e2e` — Playwright E2E (dev server auto-starts on `:3003`).
- `npm run generate:rss` / `generate:sitemap` — Generate feeds and sitemap.
- `npm run analyze` — Build with bundle analyzer.

## Coding Style & Naming Conventions
- Language: TypeScript + React. Indent 2 spaces; single quotes; prefer no semicolons.
- Components: PascalCase (`BlogCard.tsx`); functions/vars: camelCase; route folders: kebab-case with `page.tsx`.
- Linting: ESLint (`next/core-web-vitals`, TS) with local rule overrides; run `npm run lint` before pushing.
- Styling: Tailwind CSS; keep utility classes readable and grouped logically.

## Testing Guidelines
- Unit tests live in `__tests__/` using Jest + Testing Library. Name as `*.test.ts(x)`.
- E2E tests live in `tests/e2e/` using Playwright (`*.spec.ts`). Config in `playwright.config.ts`.
- Aim for solid coverage (≈70%+ lines). Generate with `npm run test:ci`.
- Write deterministic tests; avoid network and rely on fixtures/utilities.

## Commit & Pull Request Guidelines
- Commits: Prefer Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`). Keep messages imperative and scoped.
- PRs: Include a clear summary, linked issues, screenshots for UI changes, and notes on testing. Ensure `npm run lint`, `type-check`, and `test` pass.

## Security & Configuration Tips
- Use `.env.local` for local secrets (do not commit). Common vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`.
- Static generation is default; verify routes and content via `lib/posts.ts` and `lib/slides.ts` when adding features.

## Agent-Specific Notes
- Scope your edits to the task; avoid unrelated refactors. Follow this guide for files you touch and update docs if commands change.

