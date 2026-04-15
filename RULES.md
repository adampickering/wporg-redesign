# wporg-redesign — Standing Rules

Every mockup and every file in this project must satisfy every rule below. These are locked in per user instruction.

## Brand
- Always use the real WordPress mark SVG at `assets/wp-mark.svg`. Never invent a placeholder "W in a circle". Mark uses `fill="currentColor"` so it themes via CSS color.
- WP blue `#2271B1` is retained as brand anchor. Primary chip / dot color on light bg.

## Type system (locked)
- Display: **Geist** 500–600, tracking `-0.035em` on 48px+, line-height `0.98`–`1.04`
- Body: **Inter** weight **300**, tracking `-0.005em`, line-height `1.5`
- Mono: **IBM Plex Mono** (or Geist Mono) — eyebrows, labels, metadata, `0.14em` tracking uppercase 11px
- Serif accent: **Instrument Serif** italic — used **once per page maximum**, on a single humane word
- Fluid sizing via `clamp()` — no breakpoint snap
- Enable `font-feature-settings: "ss01" on, "cv11" on` and `font-variant-numeric: tabular-nums` on numerics

## Color
- Background: warm off-white `#FAFAF7` (never `#fff` or `#f9fafb`)
- Text primary: `#1A1B25` (never `#000`)
- Text secondary: `#525862`
- Text muted: `#7A8099`
- Hairline border: `rgba(26,27,37,0.06)` (never `#e5e7eb`)
- Dark slab bg: `#0B0D12` with surface `#1A1B25` / `#272835`
- Accents (secondary to WP blue): cyan `#44CCFF`, purple `#7262FF`, mint `#49DAD1`

## Radius architecture
- Pill `999px` for buttons, chips, search triggers
- `14–16px` for cards and panels
- `4–6px` for small tokens (kbd, tag badges)
- Never `rounded-md` monotone

## Shadows (tinted, stacked)
- Card resting: `0 0 0 1px rgba(26,27,37,0.06), 0 2px 6px -2px rgba(26,27,37,0.06), 0 16px 40px -8px rgba(26,27,37,0.05), inset 0 0.5px 0 rgba(255,255,255,0.6)`
- Card hover: grow the ring (0.06 → 0.10), deepen contact. No `translateY`.
- Button primary: `0 0 0 1px rgba(26,27,37,0.9), 0 2px 4px rgba(26,27,37,0.12), inset 0 8px 18px -8px rgba(255,255,255,0.32)`
- Never neutral black shadow `rgba(0,0,0,0.1)`

## Motion (from motion-and-micro-interactions)
- Easing: `cubic-bezier(.215,.61,.355,1)` for reveals, `cubic-bezier(.4,0,.2,1)` for UI state
- Durations: `75ms` press / `200ms` hover / `600ms` reveal
- Buttons: `:active { transform: scale(0.97); }`
- Cards: hover via shadow delta, not translate
- Respect `prefers-reduced-motion`

## Layout / spacing (from make-interfaces-feel-better + details skill)
- Section padding: `clamp(96px, 10vw, 160px)` vertical
- Grid: 12-col with `max-width: 1280px`
- Gutters: 8 / 16 / 24 / 40 / 80 scale
- Optical alignment on icon+text pairs; never rely on `align-items: center` alone

## Details (non-negotiable)
- Tabular numerics on all stats / pricing / percentages
- Hairline borders, never Tailwind defaults
- Eyebrow labels use real tracking, never just `uppercase text-xs`
- No `translateY` hover tells
- No `duration-300 ease-in-out`
- No `from-purple to-blue` hero gradients
- No single-layer `shadow-lg`
- No `rounded-md` everywhere
- No emoji unless requested
- No Lucide defaults — use Phosphor, custom inline, or minimal 1.5px stroke set

## Tooling
- Tailwind CSS (v4) + real Tailark components (free tier) copy-pasted and rethemed to this system
- No reinvention of Tailark from scratch
- No `scoped` styles — global Tailwind + design-token CSS variables
- Deploy target: Cloudflare Pages or GitHub Pages

## Audit before shipping each screen
Run through the de-slopify 17-point check. Fix every ❌. Score must be ≥ 16/18 before the screen is considered done.
