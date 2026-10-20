# NG Yoga Studio Indore

Landing site for **NG Yoga Studio** — _Fit Body • Calm Mind • Strong Soul_. Prem Plaza, Ashok Nagar, Indore.

Marketing single-page app with batch schedules, pricing tiers, a scroll-driven asana choreography section, a trial booking modal, and a Three.js animated background.

Originally scaffolded from [Google AI Studio](https://ai.studio/apps/84cd0f59-a7b5-4959-8d9f-540f843ff5a9).

## Stack

- [Next.js 15](https://nextjs.org) (App Router, standalone output)
- React 19 + TypeScript 5.9
- Tailwind CSS 4 + `tw-animate-css`
- [Motion](https://motion.dev) — scroll and entrance animations
- Three.js — WebGL background (`components/YogaBackgroundMotion.tsx`)
- `canvas-confetti`, `lucide-react`, `class-variance-authority`

## Getting started

**Prerequisites:** [Bun](https://bun.sh) ≥ 1.1 (npm works too — delete `bun.lock` if you switch)

```bash
bun install
bun run dev
```

Open http://localhost:3000.

### Environment

No env vars are required to run locally. Copy `.env.example` to `.env.local` only if you deploy with the AI Studio Gemini integration:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API access (injected by AI Studio at runtime) |
| `APP_URL` | Public URL of the deployed app (injected by AI Studio) |

## Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Dev server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `bun run clean` | Clear the Next.js build cache |

## Project structure

```
app/
  layout.tsx          Fonts, metadata, SEO
  page.tsx            Landing page (single route)
  globals.css         Tailwind theme + design tokens
components/
  BatchScheduleSection.tsx        Batch timings table
  EnrollmentPsychologySection.tsx Social-proof / enrollment section
  StickyAsanaChoreography.tsx     Scroll-driven asana sequence
  SandTransitionImage.tsx         Section transition art
  TrialBookingModal.tsx           Booking form modal
  YogaBackgroundMotion.tsx        Three.js background (modes: three-pure / three-hybrid / classic)
hooks/
  use-mobile.ts      Mobile breakpoint hook
lib/
  studio-data.ts     All content, batches, pricing, media URLs
  utils.ts           cn() classname helper
```

## Customizing content

All copy, batch timings, pricing, and media URLs live in **`lib/studio-data.ts`**. To swap in your own studio photos or videos, point the constants (`HERO_VIDEO_URL`, `ASANA_FLOW_VIDEO_URL`, `FOUNDER_PORTRAIT_URL`, `PRACTICES_DATA`) at files in `/public`. No component edits needed.

## Deployment

Builds as a Next.js standalone output (`output: 'standalone'` in `next.config.ts`), so it deploys to any Node host, Docker, or Vercel as-is.
