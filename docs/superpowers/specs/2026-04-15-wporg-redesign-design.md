# wordpress.org redesign — design spec

**Date:** 2026-04-15
**Status:** Draft for review
**Scope:** 3-page prototype (Homepage, News, Plugin Directory)
**Target:** Directional proof for internal review with Matt Mullenweg. Not production.

---

## 1. Problem

Matt's feedback on the current wordpress.org surfaces can be summarized in one sentence: *the site representing the project feels like a dozen disconnected properties, and the most visible surfaces (/news especially) ship with defaults nobody would accept in core.*

Specific issues this spec addresses:

- **/news has a giant empty blue header** with just a date underneath. Called out by name.
- **IA is wrong.** The first three top-level links should be Showcase, Plugins, Themes — currently News sits in front of them.
- **Language conflict.** The nav says "Extend"; wp-admin says "Plugins." Pick one, use it everywhere.
- **No unified visual system.** Clicking around produces radically different designs and nav on pages meant to represent one project.
- **Featured plugins are committee-driven and rarely updated.** The surface reads like a catalog, not a marketplace.
- **Nick Hamze's are buried.** There's no recognition system for standout contributors; the existing "People of WordPress" column is the only vector.

This spec does not attempt to fix everything on Matt's list — it fixes the visible front door (three pages) in a way that establishes a system the rest of the site could adopt.

## 2. Non-goals

- Redesigning wp-admin
- Redesigning /about, /jobs, or any other surface outside the three prototype pages
- Shipping to production
- Building the plugin/theme review experience (Matt's biggest point) — out of scope for this prototype; addressed separately
- Backend changes, auth, search infrastructure, i18n
- Mobile-first deep responsive work (we'll hit ≥768px cleanly; phone layout is a follow-up)

## 3. Scope

Three pages, built as a static prototype and deployed to Cloudflare Pages (or GitHub Pages).

1. **Homepage** — `wordpress.org/`
2. **News** — `wordpress.org/news/`
3. **Plugin Directory** — `wordpress.org/plugins/`

The News page is the most visibly broken and the only one Matt named specifically. The Homepage is where the visual system is established. The Plugin Directory is where the "featured like a real marketplace" brief lives.

## 4. Design direction

**Reference:** Lightdash (lightdash.com) for the product-energy baseline across all three pages. The WordPress Foundation Newsroom page (anthropic.com/news) influenced the editorial-authority treatment specifically for /news.

**Core moves:**

- **Typographic conviction over decoration.** Display/body split, tight negative tracking on display, lighter body weight, mono eyebrows, one serif italic accent used consistently.
- **Alternating warm-off-white and near-black slabs.** Stops monotony and stamps the visual system across pages so they clearly belong together.
- **WP blue retained as anchor.** Demoted from primary surface color to accent — used for active states, primary link color, version indicators. Purple/cyan/mint from Lightdash introduced as secondary accents, used sparingly on dark slabs only.
- **Page-personality split.** Homepage and Directory stay sans-forward for product energy; News goes serif-accented for editorial authority. Intentional, not inconsistent.
- **One signature editorial move across all pages.** The word "open" appears in Instrument Serif italic once per page, in the hero: *"Still the **open** web"* / *"The **open** newsroom"* / *"A marketplace built in the **open**"*. Small repeated signature, outsized brand signal.

## 5. Information architecture

### 5.1 Navigation

Order (left to right): **Showcase, Plugins, Themes, Develop ▾, News**

- "Extend" is killed. "Plugins" is the word used in wp-admin and must match.
- "Develop" is a hub that consolidates four existing top-level destinations (Patterns, Learn, Documentation, developer.wordpress.org) into a single mega-menu with four columns: Learn / Documentation / Patterns / Contribute.
- News moves from slot 1 to slot 5 — still first-class, no longer a hero.
- About moves to the footer.
- Global ⌘K search added (client-side placeholder in the prototype; real backend is out of scope).

### 5.2 URL redirect plan (for the real rollout, not the prototype)

The prototype uses `/`, `/news`, `/plugins` directly. If this design were adopted, the existing `/documentation`, `/patterns`, `/learn`, `developer.wordpress.org` routes would remain authoritative; "Develop" would link out to them unchanged. This spec makes no claim on the developer-hub URL structure.

## 6. Design system

### 6.1 Typography

- **Display:** Geist, weight 500–600, line-height 0.92–1.04 on headings ≥28px, tracking `-0.035em` on 48px+, `-0.028em` at 28–48px
- **Body:** Inter, weight 300, line-height 1.5, tracking `-0.005em`
- **Mono / eyebrow / metadata:** IBM Plex Mono, weight 400, tracking `0.14em` uppercase at 10–11px
- **Serif accent:** Instrument Serif italic, weight 400 — used once per page on a single word in the hero
- Fluid sizing via `clamp()` throughout — no breakpoint snaps
- `font-feature-settings: "ss01" on, "cv11" on` on display headings
- `font-variant-numeric: tabular-nums` on stats, dates, counts, percentages
- `text-wrap: balance` on headings, `text-wrap: pretty` on body paragraphs

### 6.2 Color tokens

All surfaces use HSL values exposed as shadcn CSS variables so every Tailark block inherits via `bg-background`, `text-foreground`, etc.

| Token                  | Value        | Use                                        |
| ---------------------- | ------------ | ------------------------------------------ |
| `--background`         | `#FAFAF7`    | Homepage + Directory surface               |
| `--background-news`    | `#FAF9F5`    | News page surface (slightly warmer)        |
| `--surface-cream`      | `#F5F4ED`    | News featured card inner                   |
| `--foreground`         | `#1A1B25`    | Primary text, Homepage/Directory           |
| `--foreground-news`    | `#141413`    | Primary text, News                         |
| `--muted-foreground`   | `#525862`    | Secondary body text                        |
| `--muted`              | `#7A8099`    | Mono eyebrows, muted metadata              |
| `--border`             | `rgba(26,27,37,0.06)` | Hairline borders                    |
| `--dark-slab`          | `#0B0D12`    | Dark alternating slabs, promo bar, footer  |
| `--dark-surface`       | `#1A1B25`    | Dark cards, buttons                        |
| `--primary`            | `#2271B1`    | WP blue — active states, links, version    |
| `--accent-cyan`        | `#44CCFF`    | Dark-slab accent (secondary)               |
| `--accent-purple`      | `#7262FF`    | Dark-slab accent (secondary)               |
| `--accent-mint`        | `#49DAD1`    | Dark-slab accent (secondary)               |

### 6.3 Radius architecture

- `999px` — pill buttons, chips, search triggers, category filters
- `14–16px` — cards, featured panels, content containers
- `10–12px` — nested containers (concentric with 4–6px inner padding)
- `4–6px` — small tokens (kbd, tag badges)
- Never `rounded-md` monotone.

Concentric rule: outer radius = inner radius + padding, recomputed per nested element.

### 6.4 Shadows (tinted, layered)

All shadows tinted with `rgba(26,27,37, α)` — never neutral black.

- **Card resting:**
  `0 0 0 1px rgba(26,27,37,0.06), 0 2px 6px -2px rgba(26,27,37,0.06), 0 16px 40px -8px rgba(26,27,37,0.05), inset 0 0.5px 0 rgba(255,255,255,0.6)`
- **Card hover:** grow ring to `0.10`, deepen contact. No `translateY`.
- **Primary button:**
  `0 0 0 1px rgba(26,27,37,0.9), 0 2px 4px rgba(26,27,37,0.12), inset 0 8px 18px -8px rgba(255,255,255,0.32)`

### 6.5 Motion

- **Easing:** `cubic-bezier(.215,.61,.355,1)` for reveals; `cubic-bezier(.4,0,.2,1)` for state changes
- **Durations:** 75ms press / 200ms hover / 600ms reveal
- **Buttons:** `:active { scale: 0.96; }` — interruptible via CSS transitions
- **Cards:** hover shadow delta only, no `translateY`
- **Staggered page enter:** header + hero + featured + archive, 100ms stagger, `opacity + translateY(12px) + blur(4px)` → `0`. Implemented with Motion (framer-motion) if available, plain CSS otherwise
- **Never `transition: all`** — always specify exact properties
- Respects `prefers-reduced-motion`

### 6.6 Spacing

- Section padding: `clamp(96px, 10vw, 160px)` vertical
- Grid: 12-col, max-width 1280px, horizontal padding `clamp(24px, 4vw, 48px)`
- Gutter scale: 8 / 16 / 24 / 40 / 80
- Minimum hit area: 40×40px on all interactive elements

### 6.7 Brand asset

- Real WordPress mark from `assets/wp-mark.svg` — 28×28 viewBox, two paths, `fill="currentColor"` so it themes via CSS color
- Used as `<symbol>` + `<use href="#wp-mark">` for sprite reuse across the nav, footer, and page-marker slots

## 7. Page layouts

Full wireframes in `.superpowers/brainstorm/38127-1776275098/content/layout-shape.html` and `news-page-v2.html`. Section-level summary below.

### 7.1 Homepage (`/`)

1. **Promo bar** — version chip, one-line release message, cyan link. Dark slab.
2. **Navigation** — W mark + wordmark, 5 nav items with Develop dropdown, ⌘K search, Sign in text, Get WordPress pill
3. **Hero** — mono eyebrow → chipped display headline with serif italic on "open" → body subhead → two pill CTAs → product panel (faux block editor) → stats strip (43% / 60K+ / 13K+ / 200+, tabular numerics)
4. **Design / Build / Publish pillars** — three-column dark slab
5. **Customer logo strip** — monochrome, marquee on mobile
6. **Showcase bento** — asymmetric 5–7 item bento
7. **Stats dark slab** — larger stats reinforcing the scale message
8. **News preview** — three teaser cards from /news
9. **Footer** — dark mega-footer with sitemap columns

### 7.2 News (`/news`)

1. **Promo bar + Navigation** — reused from homepage, News active
2. **Typographic hero** — "The *open* newsroom." at ~6.5rem, no image, no subtitle, no CTA. Press column on the right (Press inquiries, Community events, Brand assets, RSS feed) with hairline dividers
3. **Featured post** — cream-surface card, image-left (gradient-lit placeholder for no-image case), type-right with mono metadata → Geist display title → Instrument Serif excerpt → "Read the release notes →"
4. **Archive table** — DATE / CATEGORY / TITLE rows with hairline dividers, tabular numeric dates, mono category column, Geist title column. Category filter pills above. "See all posts →" link below
5. **Footer** — reused

### 7.3 Plugin Directory (`/plugins`)

1. **Promo bar + Navigation** — reused, Plugins active
2. **Search hero** — tagline *"A marketplace built in the **open**"* (Instrument Serif italic on "open", consistent with homepage and news), big centered search below, "60,000+ plugins" subhead, trending chip row (AI / SEO / Analytics / Forms / WooCommerce)
3. **"Editor's picks this week" marketplace shelf** — dark slab, hand-curated rotation of 3–5 plugins. This is where Matt's "featured like a real marketplace" brief lives. Explicitly designed for weekly human curation
4. **Category nav rail** — horizontal scroller, icon + label + count, sticky on scroll
5. **Plugin card grid** — 3-col responsive, each card: icon, name, one-line pitch, rating, active installs, tested-with badge, tabular numerics on stats
6. **Innovator spotlight** — secondary shelf highlighting new/under-the-radar plugins (Matt's "celebrate the Nick Hamze's" surfaced in product form)
7. **"Build a plugin →" CTA card** — bridges to developer docs, signals two-way marketplace
8. **Footer** — reused

## 8. Component source map

Kit committed: **Tailark Dusk** (free tier). Zero Pro dependencies.

21 sections total: **6 direct Tailark, 7 composed Tailark, 8 shadcn primitives.**

### 8.1 Theming strategy

Tailark and shadcn share the same token system (shadcn CSS variables referenced via Tailwind semantic utilities). The full retheming of every Tailark block happens at the token layer in `src/app/globals.css` — one file overrides `--background`, `--foreground`, `--primary`, `--muted-foreground`, `--border`, `--radius`, and the font stack. No per-block retheming.

### 8.2 Workflow (non-negotiable)

1. Browse to `tailark.com/dusk/<category>/<variant>`, open block detail, copy JSX into `src/components/blocks/<Name>.tsx`
2. Run as-is against the themed tokens
3. Override any hard-coded color inline to its semantic token equivalent
4. If a variant is wrong, pick a different variant — never re-author
5. For sections marked shadcn-only, build from shadcn primitives (`Card`, `Table`, `Badge`, `Input`, `Button`, `ToggleGroup`, `ScrollArea`, `Tabs`, `Alert`)

### 8.3 Explicit shadcn-primitive sections (no Tailark)

These sections are deliberately custom because no Tailark variant matches the design intent and forcing one would undermine the section:

- **News typographic hero + press column** — the editorial move depends on minimalism; any Tailark hero block has too much structure
- **News archive table** — Tailark's blog blocks are all card-grid; the row-based archive is the signature move
- **Homepage showcase bento** — Tailark feature variants don't match the asymmetric ratio we want
- **Directory category nav rail** — horizontal scroller with sticky-on-scroll behavior, not a Tailark pattern
- **Directory plugin card grid** — card density and stats layout don't match any Tailark variant; shadcn `Card` composition is cleaner
- **Promo bar** — shadcn `Alert` + custom layout

### 8.4 Tailark block selections

Exact `/dusk/<category>/<variant>` paths to be resolved when pulling each block. Variant numbers are finalized during the build phase after visually comparing the available options per category. The category names below are the **expected** Dusk taxonomy based on Tailark's documentation — only `hero-section` was confirmed in the live DOM exploration. The first step of the implementation plan is to navigate `tailark.com/dusk/<category>` for each of these and confirm the exact slug; any name mismatches get corrected in the plan before pulling blocks.

Expected categories:

- `dusk/header-section/*` — navigation
- `dusk/hero-section/*` — homepage hero, directory search hero (confirmed)
- `dusk/features-section/*` — pillars, marketplace shelf
- `dusk/logo-cloud/*` — customer strip
- `dusk/stats-section/*` — stats slab
- `dusk/blog-section/*` — news preview, featured post
- `dusk/testimonials-section/*` — innovator spotlight
- `dusk/call-to-action/*` — "Build a plugin" CTA
- `dusk/footer-section/*` — footer

## 9. Tech stack

- **Framework:** Next.js 15 (App Router) — because shadcn and Tailark both assume it and the prototype has no dynamic backend
- **Styling:** Tailwind CSS v4 + shadcn CSS variables
- **Components:** Tailark Dusk blocks + shadcn/ui primitives
- **Fonts:** Geist (display), Inter (body), IBM Plex Mono (eyebrow), Instrument Serif (accent) — all free, loaded via Google Fonts or local `.woff2`
- **Motion:** framer-motion (optional — plain CSS fallback is acceptable)
- **Icons:** Phosphor (1.5px stroke, Bold/Fill weights available). Not Lucide defaults.
- **Package manager:** bun
- **Deploy:** Cloudflare Pages (primary) or GitHub Pages (fallback)

## 10. Success criteria

The prototype is considered done when:

1. All three pages render at ≥768px width with full visual fidelity to the approved mockups
2. Navigation works between the three pages (client-side, no backend)
3. The real WP mark SVG is used in every mark slot
4. The de-slopify 17-point audit scores ≥16/18 on each page
5. `prefers-reduced-motion` disables all enter animations
6. Tabular numerics are active on every stat, date, count, and percentage
7. No `translateY` on card hover, no `transition: all`, no single-layer shadows, no `rounded-md` everywhere, no Lucide defaults — all de-slop rules enforced
8. The prototype deploys cleanly to the chosen host and a review URL is ready to share
9. Every Tailark block used is documented in `src/components/blocks/README.md` with its source URL, the variant selected, and the rationale for selection
10. A short "what to look for" README explains to the reviewer (Matt) which specific moves address which points from his feedback — so the review isn't a guessing game

## 11. Out of scope (and why)

- **Mobile-first phone layouts** — the prototype is for desktop review; phone comes after directional approval
- **Real search backend** — ⌘K is a visual-only placeholder; plumbing a live search index is a separate project
- **Dark mode** — the design uses dark slabs as a compositional device, not as a user-togglable theme. Page-level dark mode is a follow-up
- **Plugin/theme review experience redesign** — Matt's biggest point. Deserves its own full spec; this prototype shows the *directory*, not the review UI
- **Jobs page, /about MariaDB fix** — basic hygiene; not systemic design work
- **i18n** — English-only prototype; the production site's translation infrastructure is untouched
- **Auth, account, WordPress.com sign-in** — out of scope

## 12. Open questions

None blocking implementation. Two worth flagging for the reviewer:

1. **"Develop" hub consolidation.** This spec collapses four existing top-level destinations (Patterns, Learn, Documentation, developer.wordpress.org) into one mega-menu. If the reviewer prefers to keep them split, the rest of the design is unaffected — only the nav changes.
2. **WP blue as chip vs accent.** The current design uses WP blue as primary link/active color and for the version indicator dot, but not as a chip or surface color. If stronger brand retention is wanted, a blue chip can be introduced in the hero — see mockup iteration for the chipped-headline variant.

## 13. Reference files

- Standing design rules: `/Users/adam/dev/wporg-redesign/RULES.md`
- Wireframes: `.superpowers/brainstorm/38127-1776275098/content/layout-shape.html`, `news-page-v2.html`
- Shopping list: `.superpowers/brainstorm/38127-1776275098/content/tailark-shopping-list.html`
- WP mark: `assets/wp-mark.svg`

---

**Next step:** Review and approve this spec, then `superpowers:writing-plans` produces the implementation plan (Next.js scaffolding, token setup, per-page build order, Tailark block acquisition, de-slop audit gates).
