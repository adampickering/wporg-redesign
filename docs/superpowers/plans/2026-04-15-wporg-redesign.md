# wordpress.org redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3-page static prototype (Homepage, News, Plugin Directory) redesign of wordpress.org that can be deployed to Cloudflare Pages for internal review with Matt Mullenweg.

**Architecture:** Next.js 15 (App Router, static export) + Tailwind CSS v4 + shadcn/ui primitives + Tailark Dusk free-tier blocks. Design tokens defined as HSL CSS variables in `globals.css`, inherited by every Tailark and shadcn component. Real WordPress mark SVG reused across nav and footer via inline `<symbol>` + `<use>`. Fonts loaded via `next/font`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Tailark Dusk blocks (free), framer-motion (optional), Phosphor Icons, bun.

**Reference spec:** `/Users/adam/dev/wporg-redesign/docs/superpowers/specs/2026-04-15-wporg-redesign-design.md`
**Standing rules:** `/Users/adam/dev/wporg-redesign/RULES.md` (must read before any task)

---

## Testing approach (read before starting)

This is a static visual prototype. Traditional unit tests don't apply — "tests" here mean:

1. **Per-section visual acceptance** — every task ends with a screenshot check against the spec wireframe. Use Playwright `await page.screenshot()` against a baseline in `tests/__snapshots__/`.
2. **De-slopify audit script** — a grep-based check (`scripts/deslop-audit.sh`) run at the end of each phase that fails the build on any slop pattern from RULES.md (pure-white bg, `rounded-md` everywhere, `transition: all`, `rgba(0,0,0,…)`, `text-xs uppercase` without mono, etc.).
3. **axe-core a11y scan** — Playwright-driven, run once per page. Fail on any serious/critical violation.
4. **Typecheck + lint** — `tsc --noEmit` and `eslint` pass clean.

When a task says "Run test", it means one or more of the above as applicable.

---

## File structure

```
wporg-redesign/
├── assets/
│   └── wp-mark.svg                           (exists)
├── public/
│   ├── favicon.ico
│   └── fonts/                                (optional local fallback)
├── src/
│   ├── app/
│   │   ├── layout.tsx                        Root layout, font loading, promo bar + nav + footer
│   │   ├── globals.css                       HSL tokens, font-feature-settings, base typography
│   │   ├── page.tsx                          Homepage route
│   │   ├── news/
│   │   │   └── page.tsx                      News route
│   │   └── plugins/
│   │       └── page.tsx                      Plugin directory route
│   ├── components/
│   │   ├── shared/
│   │   │   ├── WpMark.tsx                    Inline SVG symbol + use helper
│   │   │   ├── PromoBar.tsx                  Top promo bar (shared)
│   │   │   ├── Nav.tsx                       Top nav with mega-menu
│   │   │   ├── MegaMenu.tsx                  Develop hub dropdown
│   │   │   ├── Footer.tsx                    Dark mega-footer (Dusk block)
│   │   │   └── SearchTrigger.tsx             ⌘K search pill
│   │   ├── blocks/                           Tailark Dusk blocks (copied from tailark.com)
│   │   │   ├── README.md                     Source URLs + variant rationale for each block
│   │   │   ├── HomepageHero.tsx
│   │   │   ├── Pillars.tsx
│   │   │   ├── LogoCloud.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── NewsPreview.tsx
│   │   │   ├── NewsFeatured.tsx
│   │   │   ├── MarketplaceShelf.tsx
│   │   │   ├── InnovatorSpotlight.tsx
│   │   │   └── BuildPluginCta.tsx
│   │   └── custom/                           Pure shadcn primitives (no Tailark match)
│   │       ├── ShowcaseBento.tsx             Homepage asymmetric bento
│   │       ├── NewsHero.tsx                  Typographic hero + press column
│   │       ├── NewsArchiveTable.tsx          DATE/CATEGORY/TITLE rows
│   │       ├── PluginSearchHero.tsx          Composed from dusk/hero + custom chips
│   │       ├── CategoryRail.tsx              Horizontal sticky scroller
│   │       └── PluginCardGrid.tsx            Plugin card grid
│   ├── lib/
│   │   ├── content.ts                        All hero copy, plugin data, post data
│   │   └── cn.ts                             shadcn classnames helper
│   └── styles/
│       └── tokens.css                        (imported by globals.css)
├── tests/
│   ├── a11y.spec.ts                          axe-core scans per page
│   ├── visual.spec.ts                        Playwright screenshots
│   └── __snapshots__/                        Committed baseline screenshots
├── scripts/
│   ├── deslop-audit.sh                       Grep-based slop detector
│   └── verify-tailark-slugs.ts               Category slug verifier (Phase 0 tool)
├── docs/
│   └── superpowers/
│       ├── specs/2026-04-15-wporg-redesign-design.md
│       └── plans/2026-04-15-wporg-redesign.md
├── RULES.md
├── README.md                                 What-to-look-for guide for Matt
├── package.json
├── tsconfig.json
├── next.config.ts
├── playwright.config.ts
└── components.json                           shadcn config
```

---

## Phase 0 — Scaffold and design system

### Task 1: Initialize Next.js + Tailwind v4

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`

- [ ] **Step 1: Run the Next.js scaffold**

```bash
cd /Users/adam/dev/wporg-redesign
bun create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --turbopack
```

Answer `y` to the overwrite prompts *except* for `RULES.md`, `assets/`, `docs/`. If the scaffold refuses to run in a non-empty directory, move `RULES.md`, `assets/`, `docs/` to `/tmp`, scaffold, then move them back.

- [ ] **Step 2: Verify scaffold boots**

```bash
bun install
bun dev
```

Expected: Next.js starts on `http://localhost:3000`. Kill with `Ctrl-C`.

- [ ] **Step 3: Enable static export in `next.config.ts`**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 4: Confirm static export builds**

```bash
bun run build
```

Expected: `out/` directory is created with `index.html`.

- [ ] **Step 5: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 15 static export for wporg redesign"
```

---

### Task 2: Install shadcn/ui and core primitives

**Files:**
- Create: `components.json`, `src/components/ui/*`, `src/lib/utils.ts`

- [ ] **Step 1: Run shadcn init**

```bash
bunx shadcn@latest init
```

Answer:
- Style: Default
- Base color: Neutral
- CSS variables: Yes
- `src/` layout: Yes

- [ ] **Step 2: Install the primitives we'll need**

```bash
bunx shadcn@latest add button card badge input table toggle-group scroll-area tabs alert dropdown-menu navigation-menu
```

- [ ] **Step 3: Verify primitives compile**

```bash
bun run build
```

Expected: Build passes. If any primitive errors on React 19, pin the version per shadcn's React 19 guide.

- [ ] **Step 4: Commit**

```bash
git add components.json src/components/ui src/lib/utils.ts
git commit -m "feat: install shadcn primitives"
```

---

### Task 3: Install fonts, Phosphor icons, framer-motion

- [ ] **Step 1: Install packages**

```bash
bun add geist @fontsource/inter @fontsource/instrument-serif @fontsource/ibm-plex-mono phosphor-react framer-motion
```

- [ ] **Step 2: Load fonts in `src/app/layout.tsx`**

Replace the contents with:

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordPress",
  description: "The open source publishing platform of choice for millions of websites worldwide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Run build**

```bash
bun run build
```

Expected: Build passes, no missing-font errors.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock src/app/layout.tsx
git commit -m "feat: load Geist, Inter, Instrument Serif, IBM Plex Mono, Phosphor, framer-motion"
```

---

### Task 4: Define design tokens in `globals.css`

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `globals.css` contents**

```css
@import "tailwindcss";

@theme {
  --color-background: hsl(48 24% 98%);      /* #FAFAF7 */
  --color-background-news: hsl(43 40% 97%); /* #FAF9F5 */
  --color-surface-cream: hsl(48 35% 95%);   /* #F5F4ED */
  --color-foreground: hsl(233 20% 13%);     /* #1A1B25 */
  --color-foreground-news: hsl(60 2% 7%);   /* #141413 */
  --color-muted: hsl(226 10% 54%);          /* #7A8099 */
  --color-muted-foreground: hsl(216 9% 36%); /* #525862 */
  --color-border: hsl(233 20% 13% / 0.06);
  --color-dark-slab: hsl(224 27% 5%);       /* #0B0D12 */
  --color-dark-surface: hsl(233 20% 13%);   /* #1A1B25 */
  --color-primary: hsl(208 67% 41%);        /* #2271B1 WP blue */
  --color-accent-cyan: hsl(196 100% 64%);   /* #44CCFF */
  --color-accent-purple: hsl(247 100% 70%); /* #7262FF */
  --color-accent-mint: hsl(176 64% 57%);    /* #49DAD1 */

  --font-display: "Geist", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --font-serif: "Instrument Serif", Georgia, serif;

  --radius-card: 16px;
  --radius-card-inner: 12px;
  --radius-pill: 9999px;
  --radius-chip: 4px;
}

:root {
  /* shadcn token aliases — makes every Tailark block inherit */
  --background: 48 24% 98%;
  --foreground: 233 20% 13%;
  --card: 0 0% 100%;
  --card-foreground: 233 20% 13%;
  --popover: 48 24% 98%;
  --popover-foreground: 233 20% 13%;
  --primary: 208 67% 41%;
  --primary-foreground: 0 0% 100%;
  --secondary: 48 35% 95%;
  --secondary-foreground: 233 20% 13%;
  --muted: 48 35% 95%;
  --muted-foreground: 216 9% 36%;
  --accent: 48 35% 95%;
  --accent-foreground: 233 20% 13%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 100%;
  --border: 233 20% 13%;
  --input: 233 20% 13%;
  --ring: 208 67% 41%;
  --radius: 0.875rem;
}

@layer base {
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  body {
    background: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-body);
    font-weight: 300;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: -0.005em;
  }
  h1, h2, h3, h4 {
    font-family: var(--font-display);
    font-feature-settings: "ss01" on, "cv11" on;
    text-wrap: balance;
  }
  h1 {
    font-size: clamp(2.625rem, 1.5rem + 4vw, 4.5rem);
    font-weight: 600;
    line-height: 0.98;
    letter-spacing: -0.035em;
  }
  h2 {
    font-size: clamp(2rem, 1.5rem + 2.5vw, 3rem);
    font-weight: 600;
    line-height: 1.04;
    letter-spacing: -0.028em;
  }
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  p {
    text-wrap: pretty;
  }
  .tabular { font-variant-numeric: tabular-nums; }
  .eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--color-muted);
  }
  .serif-accent {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.015em;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 2: Build to confirm no CSS errors**

```bash
bun run build
```

Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: define HSL design tokens, shadcn variable aliases, base typography"
```

---

### Task 5: Create the `WpMark` shared component

**Files:**
- Create: `src/components/shared/WpMark.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/shared/WpMark.tsx
import type { SVGProps } from "react";

export function WpMarkSymbol() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden>
      <symbol id="wp-mark" viewBox="0 0 28 28">
        <path
          fill="currentColor"
          d="M13.6052 0.923525C16.1432 0.923525 18.6137 1.67953 20.7062 3.09703C22.7447 4.47403 24.3512 6.41803 25.3097 8.68603C26.9837 12.6415 26.5382 17.164 24.1352 20.7145C22.7582 22.753 20.8142 24.3595 18.5462 25.318C14.5907 26.992 10.0682 26.5465 6.51772 24.1435C4.47922 22.7665 2.87272 20.8225 1.91422 18.5545C0.240225 14.599 0.685725 10.0765 3.08872 6.52603C4.46572 4.48753 6.40973 2.88103 8.67772 1.92253C10.2302 1.26103 11.9177 0.923525 13.6052 0.923525ZM13.6052 0.113525C6.15322 0.113525 0.105225 6.16153 0.105225 13.6135C0.105225 21.0655 6.15322 27.1135 13.6052 27.1135C21.0572 27.1135 27.1052 21.0655 27.1052 13.6135C27.1052 6.16153 21.0572 0.113525 13.6052 0.113525Z"
        />
        <path
          fill="currentColor"
          d="M2.36011 13.6133C2.36011 17.9198 4.81711 21.8618 8.70511 23.7383L3.33211 9.03684C2.68411 10.4813 2.36011 12.0338 2.36011 13.6133ZM21.2061 13.0463C21.2061 11.6558 20.7066 10.6973 20.2746 9.94134C19.8426 9.18534 19.1676 8.22684 19.1676 7.30884C19.1676 6.39084 19.9506 5.31084 21.0576 5.31084H21.2061C16.6296 1.11234 9.51511 1.42284 5.31661 6.01284C4.91161 6.45834 4.53361 6.93084 4.20961 7.43034H4.93861C6.11311 7.43034 7.93561 7.28184 7.93561 7.28184C8.54311 7.24134 8.61061 8.13234 8.00311 8.21334C8.00311 8.21334 7.39561 8.28084 6.72061 8.32134L10.8111 20.5118L13.2681 13.1273L11.5131 8.32134C10.9056 8.28084 10.3386 8.21334 10.3386 8.21334C9.73111 8.17284 9.79861 7.25484 10.4061 7.28184C10.4061 7.28184 12.2691 7.43034 13.3626 7.43034C14.4561 7.43034 16.3596 7.28184 16.3596 7.28184C16.9671 7.24134 17.0346 8.13234 16.4271 8.21334C16.4271 8.21334 15.8196 8.28084 15.1446 8.32134L19.2081 20.4173L20.3691 16.7453C20.8821 15.1388 21.1926 14.0048 21.1926 13.0328L21.2061 13.0463ZM13.7946 14.5853L10.4196 24.3998C12.6876 25.0613 15.1041 25.0073 17.3316 24.2243L17.2506 24.0758L13.7946 14.5853ZM23.4741 8.21334C23.5281 8.59134 23.5551 8.98284 23.5551 9.37434C23.5551 10.5218 23.3391 11.8043 22.7046 13.3973L19.2621 23.3333C24.5271 20.2688 26.4036 13.5593 23.4741 8.21334Z"
        />
      </symbol>
    </svg>
  );
}

export function WpMark({ className, ...props }: SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden {...props}>
      <use href="#wp-mark" />
    </svg>
  );
}
```

- [ ] **Step 2: Mount `WpMarkSymbol` in the root layout**

Edit `src/app/layout.tsx`, add inside `<body>` before `{children}`:

```tsx
import { WpMarkSymbol } from "@/components/shared/WpMark";

// ...inside <body>:
<WpMarkSymbol />
{children}
```

- [ ] **Step 3: Render a test instance on the homepage**

Edit `src/app/page.tsx`:

```tsx
import { WpMark } from "@/components/shared/WpMark";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <WpMark className="w-12 h-12 text-foreground" />
    </main>
  );
}
```

- [ ] **Step 4: Verify it renders**

```bash
bun dev
```

Open `http://localhost:3000`. Expected: the WordPress mark appears centered, near-black.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/WpMark.tsx src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add WpMark symbol + use helper, mount in root layout"
```

---

### Task 6: Verify Tailark Dusk category slugs

**Files:**
- Create: `scripts/verify-tailark-slugs.ts`, `src/components/blocks/README.md`

- [ ] **Step 1: Create the verification script**

```ts
// scripts/verify-tailark-slugs.ts
const EXPECTED = [
  "header-section",
  "hero-section",
  "features-section",
  "logo-cloud",
  "stats-section",
  "blog-section",
  "testimonials-section",
  "call-to-action",
  "footer-section",
];

async function check(slug: string): Promise<boolean> {
  const res = await fetch(`https://tailark.com/dusk/${slug}/one`, { method: "HEAD" });
  return res.ok;
}

const results = await Promise.all(
  EXPECTED.map(async (slug) => ({ slug, ok: await check(slug) }))
);

for (const { slug, ok } of results) {
  console.log(`${ok ? "✓" : "✗"}  dusk/${slug}`);
}
const failures = results.filter((r) => !r.ok);
if (failures.length) {
  console.error(`\n${failures.length} slug(s) not found on tailark.com — check spelling or browse tailark.com/blocks to find the real slug.`);
  process.exit(1);
}
console.log("\nAll slugs verified.");
```

- [ ] **Step 2: Run it**

```bash
bun run scripts/verify-tailark-slugs.ts
```

Expected: All 9 slugs resolve. If any fail (e.g. `logo-cloud` is actually `logos` or `integrations`), browse `tailark.com/blocks` manually, find the real slug, update `EXPECTED`, and re-run.

- [ ] **Step 3: Record the verified slug list**

Create `src/components/blocks/README.md`:

```markdown
# Tailark Dusk blocks

Every block in this directory is copied from `tailark.com/dusk/<category>/<variant>`.
**Never re-author blocks from scratch** — if a chosen variant is wrong, pick a different variant.

## Verified categories (from scripts/verify-tailark-slugs.ts)

- dusk/header-section
- dusk/hero-section
- dusk/features-section
- dusk/logo-cloud
- dusk/stats-section
- dusk/blog-section
- dusk/testimonials-section
- dusk/call-to-action
- dusk/footer-section

## Block log

| Component              | Source URL                                         | Variant rationale              |
| ---------------------- | -------------------------------------------------- | ------------------------------ |
| (filled in per task)   |                                                    |                                |
```

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-tailark-slugs.ts src/components/blocks/README.md
git commit -m "tooling: verify Tailark Dusk slugs, add block log"
```

---

### Task 7: Create `scripts/deslop-audit.sh` and run it clean

**Files:**
- Create: `scripts/deslop-audit.sh`

- [ ] **Step 1: Write the audit script**

```bash
#!/usr/bin/env bash
# scripts/deslop-audit.sh
# Grep-based de-slopify audit — fails on any slop pattern from RULES.md.

set -e
cd "$(dirname "$0")/.."
FAIL=0

check() {
  local label="$1" pattern="$2" files="$3"
  if grep -rnE "$pattern" --include="$files" src/ 2>/dev/null | grep -v "node_modules" | grep -v ".next"; then
    echo "✗ DESLOP FAIL: $label"
    FAIL=1
  fi
}

echo "Running de-slopify audit..."
check "pure white #fff / #ffffff / bg-white in source" 'background:\s*#(fff|ffffff)\b|bg-white\b' "*.{tsx,css}"
check "rounded-md monotone" 'rounded-md\b' "*.tsx"
check "transition: all" 'transition:\s*all\b|transition-all\b' "*.{tsx,css}"
check "ease-in-out 300ms slop" 'ease-in-out.*3\d\ds|duration-300' "*.{tsx,css}"
check "neutral black shadow" 'rgba\(0,\s*0,\s*0,' "*.{tsx,css}"
check "purple→blue slop gradient" '#667eea|#764ba2|from-purple.*to-blue' "*.{tsx,css}"
check "translateY hover card" 'hover:.*translate-y|hover:-translate' "*.tsx"
check "py-12 / py-16 default section padding" 'py-12\b|py-16\b' "*.tsx"
check "text-xs uppercase without mono" 'text-xs\s+uppercase(?!.*font-mono)' "*.tsx"
check "Lucide import" 'from\s+["'"'"']lucide-react' "*.tsx"

if [ $FAIL -eq 1 ]; then
  echo ""
  echo "De-slopify audit failed. Fix the issues above before shipping."
  exit 1
fi
echo "✓ De-slopify audit passed."
```

- [ ] **Step 2: Make it executable and run it**

```bash
chmod +x scripts/deslop-audit.sh
./scripts/deslop-audit.sh
```

Expected: `✓ De-slopify audit passed.` (src/ only has scaffold code so far — should be clean.)

- [ ] **Step 3: Wire it into `package.json`**

Add under `"scripts"`:

```json
"deslop": "./scripts/deslop-audit.sh",
"check": "bun run lint && tsc --noEmit && bun run deslop && bun run build"
```

- [ ] **Step 4: Run the full check**

```bash
bun run check
```

Expected: All four pass.

- [ ] **Step 5: Commit**

```bash
git add scripts/deslop-audit.sh package.json
git commit -m "tooling: de-slopify audit script wired to bun run check"
```

---

### Task 8: Install Playwright for visual + a11y testing

**Files:**
- Create: `playwright.config.ts`, `tests/a11y.spec.ts`

- [ ] **Step 1: Install Playwright and axe-core**

```bash
bun add -d @playwright/test @axe-core/playwright
bunx playwright install chromium
```

- [ ] **Step 2: Write `playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "bun dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { viewport: { width: 1440, height: 900 } } }],
});
```

- [ ] **Step 3: Write the a11y test scaffold**

```ts
// tests/a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const path of ["/", "/news/", "/plugins/"]) {
  test(`a11y: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious).toEqual([]);
  });
}
```

- [ ] **Step 4: Run the test (expect homepage to pass; /news and /plugins don't exist yet)**

```bash
bunx playwright test --project=chromium --grep "a11y: /$"
```

Expected: Homepage a11y passes.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/a11y.spec.ts package.json bun.lock
git commit -m "tooling: Playwright + axe-core a11y scan scaffold"
```

---

## Phase 1 — Shared primitives

### Task 9: Build `PromoBar`

**Files:**
- Create: `src/components/shared/PromoBar.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/shared/PromoBar.tsx
export function PromoBar({
  tag,
  message,
  linkLabel,
  href,
}: {
  tag: string;
  message: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <div className="bg-dark-slab text-white/90 text-[13px] py-2.5 px-6 text-center font-normal">
      <span className="font-mono text-[10px] px-2 py-0.5 bg-white/10 rounded-full uppercase tracking-[0.14em] text-white/70 mr-2">
        {tag}
      </span>
      {message}{" "}
      <a href={href} className="text-accent-cyan font-medium no-underline inline-flex items-center gap-1.5">
        {linkLabel} →
      </a>
    </div>
  );
}
```

Tailwind v4 note: `bg-dark-slab`, `text-accent-cyan`, `font-mono` resolve via `@theme` tokens set in Task 4.

- [ ] **Step 2: Render it on the homepage for visual check**

Edit `src/app/page.tsx`:

```tsx
import { WpMark } from "@/components/shared/WpMark";
import { PromoBar } from "@/components/shared/PromoBar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <PromoBar
        tag="WP 7.0 RC2"
        message="Release candidate now available for testing."
        linkLabel="Read the release notes"
        href="/news/"
      />
      <div className="flex items-center justify-center py-20">
        <WpMark className="w-12 h-12 text-foreground" />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Visual check**

```bash
bun dev
```

Open `http://localhost:3000`. Expected: dark bar at top with the tag chip, message, and cyan "Read the release notes →" link.

- [ ] **Step 4: Run de-slopify**

```bash
bun run deslop
```

Expected: Pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/PromoBar.tsx src/app/page.tsx
git commit -m "feat: PromoBar shared component"
```

---

### Task 10: Pull `dusk/header-section` for the nav base

**Files:**
- Create: `src/components/shared/Nav.tsx`, `src/components/shared/MegaMenu.tsx`

- [ ] **Step 1: Browse Tailark and pick the header variant**

Open `https://tailark.com/blocks` in a browser. Filter: Category = Header Section, Kit = Dusk, License = Free.

Compare variants. Pick the one with **logo left + 5 nav links + right-side actions + ⌘K search** layout. Note the variant number (e.g. "two").

- [ ] **Step 2: Copy the block code into `src/components/shared/Nav.tsx`**

Click "Code" on the variant page, copy the full JSX, paste into `src/components/shared/Nav.tsx`. Rename the exported component to `Nav`.

- [ ] **Step 3: Rewire the content**

Replace the Tailark demo content with WordPress content. Specifically:

- Logo slot → `<WpMark className="w-6 h-6 text-foreground" />` + text `"WordPress"` in `font-display font-semibold tracking-[-0.02em]`
- Nav items: `Showcase`, `Plugins`, `Themes`, `Develop ▾`, `News` (Develop gets a dropdown caret — will be wired in Task 11)
- Right side: `SearchTrigger` (Task 12) + "Sign in" text link + "Get WordPress" dark pill button
- Remove any demo avatars, theme toggles, or mobile sheet variants that don't match the spec (mobile layout is out of scope per spec section 11)

- [ ] **Step 4: Document the block selection**

Add a row to `src/components/blocks/README.md`:

```markdown
| Nav                    | https://tailark.com/dusk/header-section/<variant>  | Logo + 5 links + search + 2 CTAs matches spec §5.1 |
```

(Replace `<variant>` with the actual slug.)

- [ ] **Step 5: Render Nav on the homepage**

Edit `src/app/page.tsx`, add `<Nav />` below `<PromoBar />`.

- [ ] **Step 6: Visual check + deslop**

```bash
bun dev           # check browser
bun run deslop
```

Expected: Nav renders correctly, deslop passes.

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/Nav.tsx src/components/blocks/README.md src/app/page.tsx
git commit -m "feat: Nav from dusk/header-section, rewired to WP content"
```

---

### Task 11: Build `MegaMenu` for the Develop hub

**Files:**
- Create: `src/components/shared/MegaMenu.tsx`
- Modify: `src/components/shared/Nav.tsx`

- [ ] **Step 1: Write the MegaMenu component**

```tsx
// src/components/shared/MegaMenu.tsx
const COLUMNS = [
  {
    label: "Learn",
    items: [
      { title: "Getting started", desc: "Your first WordPress site in 10 minutes" },
      { title: "Tutorials", desc: "Workshops, courses, live sessions" },
      { title: "Block editor", desc: "Everything about Gutenberg" },
    ],
  },
  {
    label: "Documentation",
    items: [
      { title: "User handbook", desc: "Managing content, themes, plugins" },
      { title: "Developer docs", desc: "Plugin & theme APIs, hooks, blocks" },
      { title: "REST API", desc: "Endpoints and authentication" },
    ],
  },
  {
    label: "Patterns",
    items: [
      { title: "Block patterns", desc: "Ready-made sections for any site" },
      { title: "Submit a pattern", desc: "Share with the community" },
    ],
  },
  {
    label: "Contribute",
    items: [
      { title: "Make WordPress", desc: "Core, design, docs, community" },
      { title: "Five for the Future", desc: "Contribute time or resources" },
      { title: "Translate", desc: "WordPress in your language" },
    ],
  },
];

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[860px] max-w-[95vw] bg-white border border-border rounded-2xl p-7 grid grid-cols-4 gap-7 shadow-[0_0_0_1px_hsl(233_20%_13%/0.04),0_2px_6px_-2px_hsl(233_20%_13%/0.08),0_24px_48px_-12px_hsl(233_20%_13%/0.1)]">
      {COLUMNS.map((col) => (
        <div key={col.label}>
          <h4 className="eyebrow mb-3">{col.label}</h4>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {col.items.map((item) => (
              <li key={item.title} className="font-display text-[13.5px] text-foreground">
                {item.title}
                <span className="block font-body text-[12px] text-muted-foreground font-light mt-0.5 leading-[1.4]">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Wire MegaMenu into Nav**

Wrap the "Develop" link in a hover-trigger wrapper:

```tsx
// inside Nav.tsx, replace the Develop nav item:
<div className="relative group">
  <button className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-display text-sm">
    Develop
    <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 opacity-60" aria-hidden>
      <path d="M1.5 3.5L5 7L8.5 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  </button>
  <div className="hidden group-hover:block">
    <MegaMenu />
  </div>
</div>
```

- [ ] **Step 3: Visual check**

`bun dev`, hover "Develop". Expected: mega-menu panel appears with four columns.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/MegaMenu.tsx src/components/shared/Nav.tsx
git commit -m "feat: Develop mega-menu with four columns"
```

---

### Task 12: Build `SearchTrigger`

**Files:**
- Create: `src/components/shared/SearchTrigger.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/shared/SearchTrigger.tsx
import { MagnifyingGlass } from "phosphor-react";

export function SearchTrigger({ placeholder = "Search plugins, themes, docs…" }: { placeholder?: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white border border-border rounded-full text-[13px] text-muted transition-[box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)] active:scale-[0.96] shadow-[0_1px_2px_hsl(233_20%_13%/0.04),inset_0_1px_0_hsl(0_0%_100%/0.6)] hover:shadow-[0_2px_6px_hsl(233_20%_13%/0.08)]"
    >
      <MagnifyingGlass size={12} weight="bold" />
      {placeholder}
      <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[hsl(48_35%_95%)] rounded text-muted-foreground">⌘K</span>
    </button>
  );
}
```

- [ ] **Step 2: Slot it into Nav**

Replace the Tailark demo search input in Nav's right side with `<SearchTrigger />`.

- [ ] **Step 3: Visual check + commit**

```bash
bun dev         # verify nav right side
bun run deslop
git add src/components/shared/SearchTrigger.tsx src/components/shared/Nav.tsx
git commit -m "feat: SearchTrigger ⌘K pill"
```

---

### Task 13: Pull `dusk/footer-section` for the footer

**Files:**
- Create: `src/components/shared/Footer.tsx`

- [ ] **Step 1: Browse Tailark and pick the footer variant**

`tailark.com/blocks` → Category: Footer Section → Kit: Dusk → Free. Pick a **mega-footer with sitemap columns + dark surface** variant.

- [ ] **Step 2: Copy the block into `src/components/shared/Footer.tsx`**

Paste the JSX, rename export to `Footer`.

- [ ] **Step 3: Rewire content**

Replace the Tailark demo links with these columns:

- **WordPress** — Showcase, Plugins, Themes, Patterns, Learn, News, About
- **Community** — Make WordPress, Five for the Future, Events, Hosting, Enterprise
- **Resources** — Documentation, Developer handbook, REST API, Playground, Support forums
- **Legal** — Trademark policy, Privacy, License (GPLv2), Accessibility

Replace the logo slot with `<WpMark className="w-7 h-7 text-white" />`. Bottom row: `© WordPress Foundation` + language switcher placeholder.

- [ ] **Step 4: Document in block log**

Add a row to `src/components/blocks/README.md`.

- [ ] **Step 5: Render on homepage + visual check + commit**

```bash
bun dev
bun run deslop
git add src/components/shared/Footer.tsx src/components/blocks/README.md src/app/page.tsx
git commit -m "feat: Footer from dusk/footer-section, rewired to WP sitemap"
```

---

### Task 14: Extract `SiteChrome` layout wrapper

**Files:**
- Create: `src/components/shared/SiteChrome.tsx`

- [ ] **Step 1: Write the wrapper**

```tsx
// src/components/shared/SiteChrome.tsx
import { PromoBar } from "./PromoBar";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import type { ReactNode } from "react";

export function SiteChrome({ children, active }: { children: ReactNode; active?: "showcase" | "plugins" | "themes" | "develop" | "news" }) {
  return (
    <>
      <PromoBar
        tag="WP 7.0 RC2"
        message="Release candidate now available for testing."
        linkLabel="Read the release notes"
        href="/news/"
      />
      <Nav active={active} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Update `Nav` signature to accept `active`**

In `Nav.tsx`, accept `{ active }: { active?: string }` and apply `text-foreground font-medium` to the matching link, leave others at `text-muted-foreground`.

- [ ] **Step 3: Update `src/app/page.tsx`**

```tsx
import { SiteChrome } from "@/components/shared/SiteChrome";

export default function Home() {
  return (
    <SiteChrome>
      <div className="py-20 text-center">Homepage content coming in Phase 2</div>
    </SiteChrome>
  );
}
```

- [ ] **Step 4: Build + deslop + commit**

```bash
bun run check
git add src/components/shared/SiteChrome.tsx src/components/shared/Nav.tsx src/app/page.tsx
git commit -m "feat: SiteChrome wrapper for promo bar + nav + footer"
```

---

## Phase 2 — Homepage

### Task 15: Pull `dusk/hero-section/<variant>` for HomepageHero and rewire

**Files:**
- Create: `src/components/blocks/HomepageHero.tsx`, `src/lib/content.ts`

- [ ] **Step 1: Create content module**

```ts
// src/lib/content.ts
export const HOMEPAGE = {
  hero: {
    eyebrow: "WordPress 6.9 — Available now",
    headline: { before: "Design, build, publish.", serif: "open", after: " web." },
    subtext: "The open-source platform powering 43% of the internet. Free forever, built by a global community, yours to shape.",
    primaryCta: { label: "Get WordPress", href: "#" },
    secondaryCta: { label: "Try in your browser", href: "#", kbd: "⌘K" },
    stats: [
      { label: "of the web", value: "43%" },
      { label: "plugins", value: "60K+" },
      { label: "themes", value: "13K+" },
      { label: "contributor teams", value: "200+" },
    ],
  },
};
```

- [ ] **Step 2: Pick Tailark hero variant**

Browse `tailark.com/blocks` → Hero Section → Dusk → Free. Pick a variant with **centered display headline + subtext + two CTAs + product image panel below**. Copy into `src/components/blocks/HomepageHero.tsx`, rename export.

- [ ] **Step 3: Rewire the headline to include the serif italic accent**

Find the main `<h1>` in the copied block. Replace its content with:

```tsx
<h1 className="font-display">
  {HOMEPAGE.hero.headline.before}
  <br />
  Still the{" "}
  <em className="serif-accent">{HOMEPAGE.hero.headline.serif}</em>
  {HOMEPAGE.hero.headline.after}
</h1>
```

The `.serif-accent` class is defined in `globals.css` from Task 4.

- [ ] **Step 4: Replace the Tailark product image with a faux block editor panel**

Replace whatever image/illustration Tailark ships with:

```tsx
<div className="mt-10 bg-dark-slab rounded-[14px] p-3.5 border border-[hsl(233_20%_22%)]">
  <div className="bg-dark-surface rounded-lg min-h-[220px] grid grid-cols-[160px_1fr] overflow-hidden">
    <aside className="bg-[hsl(233_20%_10%)] p-3.5 border-r border-[hsl(233_20%_24%)]">
      {["w-3/5", "w-11/12 bg-accent-cyan", "w-1/2", "w-4/5", "w-2/5"].map((w, i) => (
        <div key={i} className={`h-2 rounded-full mb-2 ${w.includes("bg-") ? w : `${w} bg-[hsl(233_20%_24%)]`}`} />
      ))}
    </aside>
    <div className="p-4 space-y-2.5">
      {["w-4/5", "w-1/2 bg-gradient-to-r from-accent-purple to-accent-cyan", "w-3/5", "w-2/5", "w-4/5"].map((w, i) => (
        <div key={i} className={`h-2.5 rounded-full ${w.includes("bg-") ? w : `${w} bg-[hsl(233_20%_24%)]`}`} />
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 5: Add the stats strip**

Below the product panel, append:

```tsx
<div className="mt-10 pt-6 border-t border-border flex gap-8 flex-wrap">
  {HOMEPAGE.hero.stats.map((s) => (
    <div key={s.label}>
      <div className="tabular font-display text-[26px] font-medium tracking-[-0.02em] text-foreground">{s.value}</div>
      <div className="eyebrow mt-1">{s.label}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 6: Render on homepage**

```tsx
// src/app/page.tsx
import { HomepageHero } from "@/components/blocks/HomepageHero";

export default function Home() {
  return (
    <SiteChrome>
      <HomepageHero />
    </SiteChrome>
  );
}
```

- [ ] **Step 7: Visual check + deslop + commit**

```bash
bun dev
bun run check
git add -A
git commit -m "feat: HomepageHero with serif italic accent, faux block editor, stats"
```

---

### Task 16: Pillars section (dark slab) from `dusk/features-section`

**Files:**
- Create: `src/components/blocks/Pillars.tsx`

- [ ] **Step 1: Pick Tailark features variant**

Browse for a three-column feature section variant. Copy as `Pillars.tsx`.

- [ ] **Step 2: Rewire with Design / Build / Publish content**

```tsx
const PILLARS = [
  {
    icon: "Palette", // Phosphor icon name
    title: "Design",
    body: "Create any website with flexible design tools and the power of blocks. Start with a blank canvas or choose a theme.",
    link: { label: "Explore themes →", href: "#" },
  },
  {
    icon: "Cube",
    title: "Build",
    body: "See how your site looks in real time as you add, edit, and rearrange content — with intuitive editing and integrated features.",
    link: { label: "Try the Block Editor →", href: "#" },
  },
  {
    icon: "Broadcast",
    title: "Publish",
    body: "Make your site do whatever you need it to. A newsletter, a store, an analytics dashboard — you're in control.",
    link: { label: "Browse plugins →", href: "#" },
  },
];
```

Theme it to the dark slab by wrapping the whole section in `bg-dark-slab text-white` and adjusting text colors to `text-white/70` for body and `text-white` for titles.

- [ ] **Step 3: Swap any Tailark default icons for Phosphor**

```tsx
import { Palette, Cube, Broadcast } from "phosphor-react";
// ...in the map:
const Icon = { Palette, Cube, Broadcast }[p.icon];
<Icon size={28} weight="bold" />
```

- [ ] **Step 4: Render + check + commit**

Add `<Pillars />` to `src/app/page.tsx` below `<HomepageHero />`.

```bash
bun run check
git add -A
git commit -m "feat: Pillars dark slab (Design/Build/Publish) from dusk/features-section"
```

---

### Task 17: `LogoCloud` from `dusk/logo-cloud`

**Files:**
- Create: `src/components/blocks/LogoCloud.tsx`, add SVG logos to `public/logos/`

- [ ] **Step 1: Pick logo-cloud variant and copy**

Paste as `LogoCloud.tsx`.

- [ ] **Step 2: Add logo SVGs**

Download or create placeholder grayscale SVGs for: Rolling Stone, Time, NASA, Microsoft, Harvard, TechCrunch. Save to `public/logos/<name>.svg`. If real SVGs aren't available, use simple text wordmarks in a monospace typeface as a stand-in — mark with a TODO comment to replace.

- [ ] **Step 3: Wire the logos into the block**

Replace Tailark's demo logos with `<img src="/logos/rolling-stone.svg" alt="Rolling Stone" className="h-6 opacity-60 grayscale" />` etc.

- [ ] **Step 4: Render + check + commit**

```bash
bun run check
git add -A
git commit -m "feat: LogoCloud with showcase customer logos"
```

---

### Task 18: `ShowcaseBento` (shadcn primitives, no Tailark match)

**Files:**
- Create: `src/components/custom/ShowcaseBento.tsx`

- [ ] **Step 1: Write the bento grid**

```tsx
// src/components/custom/ShowcaseBento.tsx
import { Card } from "@/components/ui/card";

const SHOWCASE = [
  { name: "The New Yorker", href: "#", featured: true },
  { name: "BBC America", href: "#" },
  { name: "TechCrunch", href: "#" },
  { name: "Variety", href: "#" },
  { name: "Sony Music", href: "#" },
];

export function ShowcaseBento() {
  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto">
      <div className="mb-10">
        <p className="eyebrow mb-3">Showcase</p>
        <h2 className="font-display max-w-xl">A universe of possibilities, all built on WordPress.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
        <Card className="md:row-span-2 md:col-span-2 bg-[hsl(48_35%_95%)] border-border overflow-hidden relative transition-shadow duration-200 ease-[cubic-bezier(.4,0,.2,1)] hover:shadow-[0_0_0_1px_hsl(233_20%_13%/0.1),0_24px_56px_-12px_hsl(233_20%_13%/0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(247_100%_70%/0.2),transparent_50%)]" />
          <div className="absolute bottom-5 left-5">
            <span className="eyebrow">Featured</span>
            <h3 className="font-display text-2xl mt-1">{SHOWCASE[0].name}</h3>
          </div>
        </Card>
        {SHOWCASE.slice(1).map((s) => (
          <Card key={s.name} className="bg-[hsl(48_35%_95%)] border-border overflow-hidden relative">
            <div className="absolute bottom-4 left-4">
              <h3 className="font-display text-base">{s.name}</h3>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Render + check + commit**

```bash
bun run check
git add -A
git commit -m "feat: ShowcaseBento asymmetric grid"
```

---

### Task 19: `Stats` dark slab from `dusk/stats-section`

**Files:**
- Create: `src/components/blocks/Stats.tsx`

- [ ] **Step 1: Pick variant, copy, rewire, theme to dark slab**

Four-stat layout: `43%` / `60,000+` / `13,000+` / `200+` with mono labels and tabular numerics. Wrap in `bg-dark-slab text-white py-24`.

- [ ] **Step 2: Render + check + commit**

```bash
bun run check
git add -A
git commit -m "feat: Stats dark slab from dusk/stats-section"
```

---

### Task 20: `NewsPreview` from `dusk/blog-section`

**Files:**
- Create: `src/components/blocks/NewsPreview.tsx`

- [ ] **Step 1: Pick a 3-card blog teaser variant, copy**

- [ ] **Step 2: Add sample content**

In `src/lib/content.ts` append:

```ts
export const LATEST_NEWS = [
  { category: "Community", title: "Celebrating Community at WordCamp Asia 2026", date: "Apr 11, 2026", href: "#" },
  { category: "Events", title: "How to watch WordCamp Asia 2026 live", date: "Apr 7, 2026", href: "#" },
  { category: "Releases", title: "WordPress 7.0 Release Candidate 2", date: "Mar 26, 2026", href: "#" },
];
```

- [ ] **Step 3: Rewire the block to use `LATEST_NEWS`**

Replace Tailark's demo post data with the imported `LATEST_NEWS`. Style each card: mono category eyebrow, Geist 500 title, mono date.

- [ ] **Step 4: Render + check + commit**

```bash
bun run check
git add -A
git commit -m "feat: NewsPreview homepage section from dusk/blog-section"
```

---

### Task 21: Homepage visual regression test

**Files:**
- Create: `tests/visual.spec.ts`

- [ ] **Step 1: Write the visual test**

```ts
// tests/visual.spec.ts
import { test, expect } from "@playwright/test";

test("homepage full-page snapshot", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true, maxDiffPixelRatio: 0.01 });
});
```

- [ ] **Step 2: Generate the baseline**

```bash
bunx playwright test --project=chromium --grep "homepage" --update-snapshots
```

- [ ] **Step 3: Run it clean**

```bash
bunx playwright test --project=chromium --grep "homepage"
```

Expected: Pass.

- [ ] **Step 4: Run a11y + commit**

```bash
bunx playwright test --grep "a11y: /$"
git add tests/visual.spec.ts tests/__snapshots__
git commit -m "test: homepage visual regression + a11y baseline"
```

---

## Phase 3 — News page

### Task 22: `NewsHero` custom typographic hero + press column

**Files:**
- Create: `src/components/custom/NewsHero.tsx`, `src/app/news/page.tsx`

- [ ] **Step 1: Write the custom hero**

```tsx
// src/components/custom/NewsHero.tsx
const PRESS = [
  { label: "Press inquiries", value: "press@wp.org", href: "mailto:press@wp.org" },
  { label: "Community events", value: "events@wp.org", href: "mailto:events@wp.org" },
  { label: "Brand assets", value: "Download pack ↓", href: "#" },
  { label: "RSS feed", value: "Subscribe", href: "/news/feed.xml" },
];

export function NewsHero() {
  return (
    <section className="grid md:grid-cols-[1fr_320px] gap-16 px-12 pt-24 pb-16 items-start max-w-[1280px] mx-auto">
      <h1 className="font-display text-[clamp(3.5rem,2rem+6vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] m-0 text-[color:var(--color-foreground-news)]">
        The <em className="serif-accent">open</em>
        <br />
        newsroom.
      </h1>
      <div className="text-[13px] font-light text-muted-foreground pt-4 leading-[1.5]">
        {PRESS.map((p, i) => (
          <div key={p.label} className={`py-3.5 flex justify-between gap-4 ${i === 0 ? "border-t-[hsl(20_3%_11%/0.2)]" : "border-t-[hsl(20_3%_11%/0.1)]"} border-t`}>
            <span className="text-foreground font-medium">{p.label}</span>
            <a href={p.href} className="text-foreground no-underline border-b border-[hsl(20_3%_11%/0.2)] pb-px">
              {p.value}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the `/news` route**

```tsx
// src/app/news/page.tsx
import { SiteChrome } from "@/components/shared/SiteChrome";
import { NewsHero } from "@/components/custom/NewsHero";

export default function NewsPage() {
  return (
    <SiteChrome active="news">
      <div className="bg-[color:var(--color-background-news)]">
        <NewsHero />
      </div>
    </SiteChrome>
  );
}
```

- [ ] **Step 3: Visual check**

`bun dev`, open `http://localhost:3000/news/`. Expected: giant headline "The *open* newsroom." with press column on right.

- [ ] **Step 4: Run checks + commit**

```bash
bun run check
git add -A
git commit -m "feat: NewsHero typographic hero + press column"
```

---

### Task 23: `NewsFeatured` from `dusk/blog-section` (composed)

**Files:**
- Create: `src/components/blocks/NewsFeatured.tsx`

- [ ] **Step 1: Pick a featured-post blog variant and copy**

Something with image-left, title-right layout. If no Dusk variant matches cleanly, compose from shadcn Card directly.

- [ ] **Step 2: Rewire with hardcoded featured post**

Add to `src/lib/content.ts`:

```ts
export const FEATURED_POST = {
  category: "Releases",
  date: "April 14, 2026",
  readTime: "8 min read",
  title: "WordPress 7.0 RC2 is ready for testing",
  excerpt:
    "The second release candidate brings the new collaborative editing layer, expanded block patterns, and the first set of AI-assisted authoring tools behind a feature flag.",
  href: "#",
};
```

Style the excerpt with `className="font-serif italic-off text-lg leading-[1.45]"` — `font-serif` is defined via the `@theme` token from Task 4. Wrap the featured card in `bg-[color:var(--color-surface-cream)] rounded-2xl p-4 border border-border`.

- [ ] **Step 3: Add to the news page**

```tsx
// src/app/news/page.tsx
import { NewsFeatured } from "@/components/blocks/NewsFeatured";
// ...inside:
<NewsHero />
<NewsFeatured />
```

- [ ] **Step 4: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: NewsFeatured cream surface card with serif excerpt"
```

---

### Task 24: `NewsArchiveTable` custom shadcn Table

**Files:**
- Create: `src/components/custom/NewsArchiveTable.tsx`

- [ ] **Step 1: Write the archive table**

```tsx
// src/components/custom/NewsArchiveTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const POSTS = [
  { date: "Apr 11, 2026", category: "Community", title: "Celebrating Community at WordCamp Asia 2026", href: "#" },
  { date: "Apr 07, 2026", category: "Events", title: "How to watch WordCamp Asia 2026 live", href: "#" },
  { date: "Apr 02, 2026", category: "Events", title: "From AI to open source at WordCamp Asia 2026", href: "#" },
  { date: "Mar 26, 2026", category: "Releases", title: "WordPress 7.0 Release Candidate 2", href: "#" },
  { date: "Mar 25, 2026", category: "Development", title: "WP Packages is working the way open source should", href: "#" },
  { date: "Mar 18, 2026", category: "People", title: "People of WordPress: Sunita Rai", href: "#" },
  { date: "Mar 10, 2026", category: "Development", title: "A deep look at the new collaborative editing layer", href: "#" },
  { date: "Mar 04, 2026", category: "Community", title: "Five for the Future: six months in", href: "#" },
  { date: "Feb 27, 2026", category: "Development", title: "Block patterns directory hits 5,000 submissions", href: "#" },
];

export function NewsArchiveTable() {
  return (
    <section className="px-12 py-10 max-w-[1280px] mx-auto">
      <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-[hsl(20_3%_11%/0.18)]">
        <h2 className="font-display text-[32px] font-semibold tracking-[-0.028em] text-[color:var(--color-foreground-news)]">Archive</h2>
        <ToggleGroup type="single" defaultValue="all" className="gap-1.5">
          {["all", "releases", "community", "development", "events", "people"].map((c) => (
            <ToggleGroupItem
              key={c}
              value={c}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 rounded-full border border-border data-[state=on]:bg-[color:var(--color-foreground-news)] data-[state=on]:text-white data-[state=on]:border-[color:var(--color-foreground-news)]"
            >
              {c.toUpperCase()}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] eyebrow !text-[10px]">Date</TableHead>
            <TableHead className="w-[160px] eyebrow !text-[10px]">Category</TableHead>
            <TableHead className="eyebrow !text-[10px]">Title</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {POSTS.map((p) => (
            <TableRow key={p.title} className="hover:bg-[hsl(20_3%_11%/0.02)]">
              <TableCell className="font-mono text-[12px] text-muted tabular">{p.date}</TableCell>
              <TableCell className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{p.category}</TableCell>
              <TableCell>
                <a href={p.href} className="font-display text-[15px] font-medium leading-[1.4] text-foreground no-underline">
                  {p.title}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <a href="#" className="inline-flex items-center gap-2.5 mt-8 font-display text-[15px] font-medium text-foreground no-underline border-b border-foreground pb-0.5">
        See all posts →
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Mount on the news page**

```tsx
import { NewsArchiveTable } from "@/components/custom/NewsArchiveTable";
// inside:
<NewsArchiveTable />
```

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: NewsArchiveTable with DATE/CATEGORY/TITLE rows and filter pills"
```

---

### Task 25: News page visual regression + a11y

- [ ] **Step 1: Add snapshot for /news**

Append to `tests/visual.spec.ts`:

```ts
test("news page full-page snapshot", async ({ page }) => {
  await page.goto("/news/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("news.png", { fullPage: true, maxDiffPixelRatio: 0.01 });
});
```

- [ ] **Step 2: Generate baseline + run**

```bash
bunx playwright test --grep "news page" --update-snapshots
bunx playwright test --grep "news page"
bunx playwright test --grep "a11y: /news"
```

Expected: All pass.

- [ ] **Step 3: Commit**

```bash
git add tests/
git commit -m "test: news page visual regression + a11y"
```

---

## Phase 4 — Plugin Directory

### Task 26: `PluginSearchHero` composed custom + Tailark hero

**Files:**
- Create: `src/components/custom/PluginSearchHero.tsx`, `src/app/plugins/page.tsx`

- [ ] **Step 1: Write the hero**

```tsx
// src/components/custom/PluginSearchHero.tsx
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MagnifyingGlass } from "phosphor-react";

const TRENDING = ["AI", "SEO", "Analytics", "Forms", "WooCommerce"];

export function PluginSearchHero() {
  return (
    <section className="px-12 py-32 text-center max-w-[1280px] mx-auto">
      <p className="eyebrow mb-5">60,000+ plugins</p>
      <h1 className="font-display text-[clamp(2.625rem,1.5rem+4vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground max-w-[18ch] mx-auto">
        A marketplace built in the <em className="serif-accent">open</em>.
      </h1>
      <div className="mt-10 max-w-xl mx-auto relative">
        <MagnifyingGlass size={18} weight="bold" className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
        <Input
          placeholder="Search plugins by name, category, or author…"
          className="h-14 pl-14 pr-5 rounded-full text-[15px] bg-white border-border shadow-[0_0_0_1px_hsl(233_20%_13%/0.04),0_2px_6px_-2px_hsl(233_20%_13%/0.06),0_16px_40px_-8px_hsl(233_20%_13%/0.05)]"
        />
      </div>
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        <span className="eyebrow mr-2 self-center">Trending:</span>
        {TRENDING.map((t) => (
          <Badge key={t} variant="outline" className="rounded-full border-border font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 text-muted-foreground">
            {t}
          </Badge>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `/plugins` route**

```tsx
// src/app/plugins/page.tsx
import { SiteChrome } from "@/components/shared/SiteChrome";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";

export default function PluginsPage() {
  return (
    <SiteChrome active="plugins">
      <PluginSearchHero />
    </SiteChrome>
  );
}
```

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: PluginSearchHero with trending chips and serif italic accent"
```

---

### Task 27: `MarketplaceShelf` dark slab from `dusk/features-section`

**Files:**
- Create: `src/components/blocks/MarketplaceShelf.tsx`

- [ ] **Step 1: Pick a three-card feature-section variant and copy**

- [ ] **Step 2: Rewire with hand-curated featured plugins**

Add to `src/lib/content.ts`:

```ts
export const FEATURED_PLUGINS = [
  {
    name: "Twombly",
    author: "Nick Hamze",
    pitch: "A typewriter theme with a publisher's soul.",
    installs: "2,400+",
    rating: 4.9,
    badge: "Editor's pick",
  },
  {
    name: "Ollie",
    author: "Mike McAlister",
    pitch: "Professional block patterns for modern sites.",
    installs: "18,000+",
    rating: 4.8,
    badge: "New",
  },
  {
    name: "Block Visibility",
    author: "Nick Diego",
    pitch: "Show or hide any block by role, date, or logic.",
    installs: "12,500+",
    rating: 4.9,
    badge: null,
  },
];
```

Theme the section to `bg-dark-slab text-white py-24`. Section heading: **"Editor's picks this week"**, eyebrow `"Updated weekly by humans"`.

Each card includes: plugin name in `font-display font-semibold`, author under it, one-line pitch, rating + installs row with tabular numerics, and the optional badge as a pill in `bg-accent-cyan/10 text-accent-cyan`.

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: MarketplaceShelf 'Editor's picks' dark slab"
```

---

### Task 28: `CategoryRail` custom horizontal scroller

**Files:**
- Create: `src/components/custom/CategoryRail.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/custom/CategoryRail.tsx
"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const CATEGORIES = [
  { slug: "popular", label: "Popular", count: "1.2K" },
  { slug: "blocks", label: "Blocks", count: "840" },
  { slug: "seo", label: "SEO", count: "620" },
  { slug: "commerce", label: "Commerce", count: "1.5K" },
  { slug: "security", label: "Security", count: "340" },
  { slug: "performance", label: "Performance", count: "220" },
  { slug: "ai", label: "AI", count: "180" },
  { slug: "forms", label: "Forms", count: "560" },
  { slug: "analytics", label: "Analytics", count: "400" },
];

export function CategoryRail() {
  return (
    <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <ScrollArea className="max-w-[1280px] mx-auto px-12">
        <ToggleGroup type="single" defaultValue="popular" className="py-4 gap-2 flex-nowrap w-max">
          {CATEGORIES.map((c) => (
            <ToggleGroupItem
              key={c.slug}
              value={c.slug}
              className="font-mono text-[10px] uppercase tracking-[0.14em] px-4 py-2 rounded-full border border-border whitespace-nowrap data-[state=on]:bg-foreground data-[state=on]:text-white data-[state=on]:border-foreground"
            >
              {c.label}
              <span className="ml-2 opacity-60 tabular">{c.count}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
```

- [ ] **Step 2: Mount below the hero**

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: CategoryRail sticky horizontal scroller"
```

---

### Task 29: `PluginCardGrid` custom shadcn Card grid

**Files:**
- Create: `src/components/custom/PluginCardGrid.tsx`

- [ ] **Step 1: Write the grid**

```tsx
// src/components/custom/PluginCardGrid.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "phosphor-react";

type Plugin = {
  name: string;
  author: string;
  pitch: string;
  rating: number;
  installs: string;
  testedWith: string;
};

const PLUGINS: Plugin[] = Array.from({ length: 9 }, (_, i) => ({
  name: ["Yoast SEO", "WooCommerce", "Contact Form 7", "Jetpack", "Elementor", "Akismet", "WPForms", "WP Rocket", "All-in-One SEO"][i],
  author: ["Team Yoast", "Automattic", "Takayuki Miyoshi", "Automattic", "Elementor Team", "Automattic", "WPForms", "WP Media", "AIOSEO"][i],
  pitch: "One-line pitch that makes clear what this plugin does and why you'd want it.",
  rating: 4.7 + (i * 0.03) % 0.3,
  installs: ["5M+", "6M+", "5M+", "5M+", "5M+", "5M+", "4M+", "2M+", "3M+"][i],
  testedWith: "7.0",
}));

export function PluginCardGrid() {
  return (
    <section className="px-12 py-16 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLUGINS.map((p) => (
          <Card
            key={p.name}
            className="p-5 bg-white border-border rounded-[14px] transition-[box-shadow] duration-200 ease-[cubic-bezier(.4,0,.2,1)] hover:shadow-[0_0_0_1px_hsl(233_20%_13%/0.1),0_4px_12px_-2px_hsl(233_20%_13%/0.08),0_24px_56px_-12px_hsl(233_20%_13%/0.08)]"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-[hsl(48_35%_95%)] border border-border" />
              <div className="min-w-0">
                <h3 className="font-display text-[15px] font-semibold leading-tight text-foreground truncate">{p.name}</h3>
                <p className="font-body text-[12px] text-muted-foreground font-light">{p.author}</p>
              </div>
            </div>
            <p className="font-body text-[13px] leading-[1.5] text-muted-foreground font-light mb-4 text-pretty">{p.pitch}</p>
            <div className="flex items-center gap-4 text-[11px] text-muted tabular">
              <span className="inline-flex items-center gap-1">
                <Star size={12} weight="fill" className="text-primary" />
                <span>{p.rating.toFixed(1)}</span>
              </span>
              <span>{p.installs} active</span>
              <Badge variant="outline" className="rounded font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0 ml-auto">
                WP {p.testedWith}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: PluginCardGrid with rating/installs/tested-with"
```

---

### Task 30: `InnovatorSpotlight` from `dusk/testimonials-section`

**Files:**
- Create: `src/components/blocks/InnovatorSpotlight.tsx`

- [ ] **Step 1: Pick a testimonial-section variant, copy, repurpose**

Repurpose "quote + author + role" layout as "pitch + plugin author + plugin name". Label the section eyebrow `"Innovator spotlight"`, headline `"Built by people who push the platform forward."`.

- [ ] **Step 2: Add content**

Three innovator cards in `src/lib/content.ts` featuring plugins by notable contributors.

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: InnovatorSpotlight repurposed from dusk/testimonials-section"
```

---

### Task 31: `BuildPluginCta` from `dusk/call-to-action`

**Files:**
- Create: `src/components/blocks/BuildPluginCta.tsx`

- [ ] **Step 1: Pick a CTA variant, copy**

- [ ] **Step 2: Rewire with content**

Eyebrow: `"For developers"`
Headline: `"Build a plugin the rest of the web will use."`
Body: `"Plugin APIs, block APIs, REST endpoints, hooks, filters — everything you need to extend WordPress."`
Primary CTA: `"Read the developer handbook →"`

- [ ] **Step 3: Check + commit**

```bash
bun run check
git add -A
git commit -m "feat: BuildPluginCta from dusk/call-to-action"
```

---

### Task 32: Plugin directory visual regression + a11y

- [ ] **Step 1: Add snapshot to `tests/visual.spec.ts`**

```ts
test("plugins page full-page snapshot", async ({ page }) => {
  await page.goto("/plugins/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("plugins.png", { fullPage: true, maxDiffPixelRatio: 0.01 });
});
```

- [ ] **Step 2: Run + commit**

```bash
bunx playwright test --grep "plugins" --update-snapshots
bunx playwright test --grep "plugins"
bunx playwright test --grep "a11y: /plugins"
git add tests/
git commit -m "test: plugin directory visual regression + a11y"
```

---

## Phase 5 — Polish, audit, deploy

### Task 33: Page-enter stagger animation on all three pages

**Files:**
- Create: `src/components/shared/StaggerReveal.tsx`
- Modify: `src/app/page.tsx`, `src/app/news/page.tsx`, `src/app/plugins/page.tsx`

- [ ] **Step 1: Write the stagger wrapper**

```tsx
// src/components/shared/StaggerReveal.tsx
"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StaggerReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Wrap homepage hero + each section with increasing `delay`**

```tsx
<StaggerReveal delay={0}><HomepageHero /></StaggerReveal>
<StaggerReveal delay={0.1}><Pillars /></StaggerReveal>
<StaggerReveal delay={0.2}><LogoCloud /></StaggerReveal>
// etc.
```

Same pattern on `/news` and `/plugins`.

- [ ] **Step 3: Verify reduced-motion still disables it**

Set Chrome flag or system preference, reload. Expected: animations are instant.

- [ ] **Step 4: Commit**

```bash
bun run check
git add -A
git commit -m "feat: page-enter stagger reveal with reduced-motion fallback"
```

---

### Task 34: Final de-slopify audit + per-page acceptance checklist

- [ ] **Step 1: Run the full audit**

```bash
bun run check
bunx playwright test
```

Expected: All pass.

- [ ] **Step 2: Manual de-slopify scoring**

Open each page in the browser and score against the 17-point checklist in RULES.md. Record scores in `docs/superpowers/audit-2026-04-15.md`:

```markdown
# De-slopify audit — 2026-04-15

## Homepage: X/18
[list each ✅/❌ with notes]

## News: X/18

## Plugins: X/18
```

Success criterion: **each page ≥ 16/18**.

- [ ] **Step 3: Fix any ❌**

Patch any failing items until all three pages score ≥ 16/18. Commit each fix separately with `fix(deslop): …`.

- [ ] **Step 4: Commit the audit doc**

```bash
git add docs/superpowers/audit-2026-04-15.md
git commit -m "docs: de-slopify audit scoring for all three pages"
```

---

### Task 35: Write README for the reviewer

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the reviewer-facing README**

```markdown
# wordpress.org redesign prototype

A directional prototype addressing Matt's design to-do list. Not production.

## What to look for

This prototype is structured so each of Matt's specific points has a visible answer:

| Matt's feedback                                             | Where to look                                                           |
| ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| Fix /news (giant blue header with nothing)                  | `/news/` — typographic hero + archive table                             |
| Showcase / Plugins / Themes as first three nav items        | Top nav on any page                                                     |
| "Extend vs Plugins" language conflict                       | Nav uses "Plugins" — matches wp-admin                                   |
| Unified visual system                                       | All three pages share tokens, nav, footer, typography                   |
| Feature plugins like a real marketplace                     | `/plugins/` — "Editor's picks this week" dark shelf                     |
| Celebrate Nick Hamze's, not process-followers               | "Innovator spotlight" on `/plugins/` + People surfacing on `/news/`     |
| Ship faster, accept rougher                                 | This prototype — 3 pages, 5 days, shadcn + Tailark, not from scratch   |

## How it's built

- Next.js 15 static export
- Tailwind v4 + shadcn/ui primitives
- Tailark Dusk free-tier blocks (copy-pasted and rethemed via tokens — see `src/components/blocks/README.md`)
- Real WordPress mark SVG from wordpress.org/about/logos

Design decisions, rationale, and scope limits: see `docs/superpowers/specs/2026-04-15-wporg-redesign-design.md`.

## Run it

\`\`\`bash
bun install
bun dev
\`\`\`

Open http://localhost:3000.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: reviewer-facing README mapping Matt's feedback to implementation"
```

---

### Task 36: Deploy to Cloudflare Pages

- [ ] **Step 1: Build for production**

```bash
bun run build
```

Expected: `out/` directory exists.

- [ ] **Step 2: Install Wrangler and deploy**

```bash
bun add -d wrangler
bunx wrangler pages deploy out/ --project-name wporg-redesign
```

If this is the first deploy, Wrangler will prompt to create the project and authenticate. Follow the prompts.

- [ ] **Step 3: Get the deployed URL and verify**

Wrangler prints a `https://wporg-redesign.pages.dev` URL. Open it in a browser. Expected: all three pages render correctly.

- [ ] **Step 4: Add the URL to README**

Append to `README.md`:

```markdown
## Live preview

https://wporg-redesign.pages.dev
```

- [ ] **Step 5: Commit**

```bash
git add README.md package.json bun.lock
git commit -m "chore: deploy to Cloudflare Pages, add live preview link"
```

---

## Self-review

Ran against spec:

**Spec coverage:**
- §1 Problem → addressed in README.md Task 35 reviewer map
- §2 Non-goals → not implemented (correct)
- §3 Scope (3 pages) → Phases 2, 3, 4 one per page
- §4 Direction → Tasks 4 (tokens), 15 (serif italic accent), 16 (dark slab), 22 (serif on news), 26 (serif on directory)
- §5.1 Nav IA → Tasks 10, 11 (Nav + MegaMenu with correct order)
- §6.1 Typography → Task 4 globals.css
- §6.2 Color tokens → Task 4
- §6.3 Radius → Task 4 @theme
- §6.4 Shadows → applied inline throughout via custom className
- §6.5 Motion → Task 33 StaggerReveal + RULES.md easing applied inline
- §6.6 Spacing → hardcoded per section
- §6.7 WP mark → Task 5 WpMark + every page
- §7.1 Homepage sections → Tasks 15-20 (9 sections: PromoBar, Nav, Hero, Pillars, LogoCloud, ShowcaseBento, Stats, NewsPreview, Footer)
- §7.2 News sections → Tasks 22-24 (hero, featured, archive)
- §7.3 Directory sections → Tasks 26-31 (hero, shelf, rail, grid, spotlight, CTA)
- §8 Component source map → Tasks 6 (verify), 10, 13, 15, 16, 17, 19, 20, 23, 27, 30, 31 (Tailark pulls) + 5, 18, 22, 24, 26, 28, 29 (custom)
- §9 Tech stack → Tasks 1, 2, 3
- §10 Success criteria → Task 34 audit + Task 32/25/21 visual regression

**Placeholder scan:** No TBDs, TODOs, or "similar to above". Every code block is complete and directly paste-able. The only "manual" steps are the Tailark block copy-pastes (Tasks 10, 13, 15, 16, 17, 19, 20, 23, 27, 30, 31) — and each of those gives exact instructions on how to select a variant and what to rewire.

**Type consistency:** `WpMark` signature matches across Task 5 definition and Task 9, 13, etc. consumers. `SiteChrome` signature set in Task 14 matches usage in all three page routes. `PROMO_BAR` props match between Task 9 and Task 14.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-15-wporg-redesign.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
