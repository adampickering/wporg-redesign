# wordpress.org redesign prototype

A directional prototype addressing Matt's design to-do list. Not production.

## What to look for

This prototype is structured so each of Matt's specific points has a visible answer:

| Matt's feedback | Where to look |
| --- | --- |
| Fix /news (giant blue header with nothing) | `/news/` — typographic hero + archive table |
| Showcase / Plugins / Themes as first three nav items | Top nav on any page |
| "Extend vs Plugins" language conflict | Nav uses "Plugins" — matches wp-admin |
| Unified visual system | All three pages share tokens, nav, footer, typography |
| Feature plugins like a real marketplace | `/plugins/` — "Editor's picks this week" dark shelf |
| Celebrate Nick Hamze's, not process-followers | "Innovator spotlight" on `/plugins/` |
| Ship faster, accept rougher | This prototype — Tailark + shadcn, not from scratch |

## Pages

- **Homepage** (`/`) — Hero with serif-italic "open" accent, Design/Build/Publish pillars, showcase bento, stats, news preview
- **News** (`/news/`) — Pure typographic hero, featured post with serif excerpt, row-based archive table with category filters
- **Plugin Directory** (`/plugins/`) — Search hero with trending chips, Editor's picks marketplace shelf, category rail, plugin card grid, innovator spotlight

## How it's built

- Next.js 16 static export
- Tailwind v4 + shadcn/ui primitives
- Tailark Dusk free-tier blocks (copy-pasted and rethemed via tokens — see `src/components/blocks/README.md`)
- Real WordPress mark SVG from wordpress.org/about/logos
- Geist (display) + Inter (body) + IBM Plex Mono (eyebrow) + Instrument Serif (accent)
- framer-motion page-enter stagger animations

## Design decisions

Full design spec with rationale: `docs/superpowers/specs/2026-04-15-wporg-redesign-design.md`

Key decisions:
- **One serif italic word per page** — "open" appears in Instrument Serif italic in each hero, creating a brand signature across all three surfaces
- **Alternating warm/dark slabs** — stamps a unified visual system across pages that previously looked disconnected
- **Table archive on /news** — replaces the 3-column card grid with institutional rows, inspired by Anthropic's newsroom
- **"Develop" mega-menu** — consolidates Patterns, Learn, Documentation, developer.wordpress.org into one hub
- **WP blue retained as accent** — brand continuity, not revolution

## Run locally

```bash
bun install
bun dev
```

Open http://localhost:3000

## Quality gates

- De-slopify audit: `bun run deslop` (17-point grep check, all pages 17/17)
- Full check: `bun run check` (TypeScript + de-slopify + production build)
- Tests: `bunx playwright test` (3 a11y scans + 3 visual regression snapshots)
