# Standing implementer briefing

This preamble is prepended to every implementer subagent prompt dispatched for the wporg-redesign project. Do not edit without user approval — changes here affect every downstream task.

---

## Context you must load before any code edit

Read these files in order. **You MUST read all of them — no skipping.**

1. **`/Users/adam/dev/wporg-redesign/RULES.md`** — standing design rules. Every mockup and file must satisfy every rule. Brand, type system, color tokens, radius architecture, shadows, motion, spacing, details. Non-negotiable.

2. **`/Users/adam/dev/wporg-redesign/docs/superpowers/specs/2026-04-15-wporg-redesign-design.md`** — full design spec. Problem, scope, direction, IA, design system, page layouts, component source map, success criteria, out-of-scope.

3. **The specific task text** — included in full in the prompt below. Do not read the plan file; use the task text provided.

## Skills you must load before any code edit

Load these by using the `Skill` tool (if available) or by Reading the path directly. These shape HOW you write every line of code on this project:

1. **`frontend-design:frontend-design`** — creative, polished frontend production standards. Load via Skill tool.

2. **`design-polish-suite`** (hub) and specifically:
   - `/Users/adam/.claude/skills/design-polish-suite/typography-that-sells/SKILL.md` — display/body split, tracking, line-height, mono eyebrows, serif accents
   - `/Users/adam/.claude/skills/design-polish-suite/de-slopify-audit/SKILL.md` — 17-point audit against AI-slop defaults

3. **`/Users/adam/.claude/skills/make-interfaces-feel-better/SKILL.md`** plus the four reference files in that directory:
   - `animations.md` — interruptible transitions, enter/exit staggers, icon animations, scale on press
   - `surfaces.md` — concentric border radius, optical alignment, shadows, image outlines, hit areas
   - `typography.md` — text wrapping, font smoothing, tabular numbers
   - `performance.md` — transition specificity, `will-change` usage

Apply all four skills as a stack to every component you touch. Taste is subtraction: if you can't justify a line of code against one of the skills or the spec, delete it.

## Tailark rules (absolute)

- When a task says "pull a Dusk block", **browse `tailark.com/dusk/<category>`, compare the numbered variants visually, pick one, click "Code", copy the JSX into the specified file, and rewire the content.**
- **Never re-author a Tailark block from scratch.** If the variant you picked is wrong, pick a different variant — do not hand-write a replacement.
- **Theme through tokens, not inline hex.** Retheming happens by overriding CSS variables in `src/app/globals.css`. Touch token definitions, not per-component colors.
- Record every block you pull in `src/components/blocks/README.md` — source URL, variant, one-line rationale.
- Only use Dusk. Zero Veil, Mist, or Quartz (Pro) imports.

## Standing rules summary (from `RULES.md`)

- Real WordPress mark SVG from `assets/wp-mark.svg`, rendered via `<WpMark>` symbol + use helper. Never invent a placeholder.
- Fonts: Geist display / Inter 300 body / IBM Plex Mono eyebrow / Instrument Serif italic accent (used once per page max)
- Warm off-white bg `#FAFAF7` (`#FAF9F5` on /news). Text `#1A1B25` (`#141413` on /news). Never `#fff`, never neutral black.
- Hairline borders `rgba(26,27,37,0.06)`. Never `#e5e7eb`, never `border-gray-200`.
- Pill buttons (999px), 14–16px cards, concentric inner radii.
- Tinted layered shadows. Never single-layer `shadow-lg`, never `rgba(0,0,0,0.1)`.
- Motion: `cubic-bezier(.215,.61,.355,1)` for reveals, `cubic-bezier(.4,0,.2,1)` for state. 75ms press / 200ms hover / 600ms reveal. `:active { scale: 0.96 }`. Never `translateY` on card hover. Never `transition: all`.
- Tabular numerics on all stats, dates, percentages, counts.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Respect `prefers-reduced-motion`.
- Minimum hit area 40×40px.
- Phosphor icons (1.5px stroke, Bold/Fill when needed). Never Lucide.

## Definition of done for any task

Before reporting DONE, your implementation must pass:

1. `bun run check` (lint + typecheck + deslop audit + production build) — exit 0
2. Any Playwright tests mentioned in the task — pass
3. You visually verified the change in `bun dev` against the spec wireframe (describe what you saw in the report)
4. You committed the change with a message following the existing repo style
5. You updated `src/components/blocks/README.md` if you pulled a Tailark block
6. Self-review ran through every skill's checklist, not just the spec

If any of those fail, report DONE_WITH_CONCERNS or BLOCKED with specifics. Never report DONE silently with known problems.
