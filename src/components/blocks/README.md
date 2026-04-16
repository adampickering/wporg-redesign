# Tailark Dusk blocks

Every block in this directory is copied from `tailark.com/dusk/<category>/<variant>`.
**Never re-author blocks from scratch** — if a chosen variant is wrong, pick a different variant.

## Verified categories (from scripts/verify-tailark-slugs.ts)

Verified against tailark.com/blocks on 2026-04-15. Corrections from the spec's original expected list:

| Spec name             | Real Dusk slug   | Note                                                              |
| --------------------- | ---------------- | ----------------------------------------------------------------- |
| header-section        | —                | No header category in Dusk. Navigation is shadcn-only (spec §8.3) |
| hero-section          | `hero-section`   | Confirmed                                                         |
| features-section      | `features`       | Slug is `features`, not `features-section`                        |
| logo-cloud            | `logo-cloud`     | Confirmed                                                         |
| stats-section         | `stats`          | Slug is `stats`, not `stats-section`                              |
| blog-section          | `content`        | No blog category in Dusk; `content` is the closest match          |
| testimonials-section  | `testimonials`   | Slug is `testimonials`, not `testimonials-section`                |
| call-to-action        | `call-to-action` | Confirmed                                                         |
| footer-section        | `footer`         | Slug is `footer`, not `footer-section`                            |

Verified slugs (all return 200):

- dusk/hero-section
- dusk/features
- dusk/logo-cloud
- dusk/stats
- dusk/content
- dusk/testimonials
- dusk/call-to-action
- dusk/footer

## Block log

| Component              | Source URL                                         | Variant rationale              |
| ---------------------- | -------------------------------------------------- | ------------------------------ |
| `Footer`               | https://tailark.com/dusk/footer (footer-2)         | 4-column sitemap grid (md:grid-cols-5 with logo in col-span-2), bottom copyright bar — closest match to spec. Surface retheemed to dark-slab; social icons removed; language hint added. |
| `HomepageHero`         | https://tailark.com/dusk/hero-section (hero-section-7) | Centered headline + subtext + dual CTAs + panel slot — cleanest centered structure without external deps (Swiper/InfiniteSlider stripped). Nav header excluded (handled by SiteChrome). |
| `Pillars`              | https://tailark.com/dusk/features/one | Three-pillar Design/Build/Publish story, rethemed to dark slab, Phosphor icons (Palette/Cube/Broadcast). |
| `LogoCloud`            | https://tailark.com/dusk/logo-cloud (logo-cloud-1) | Centered headline + flex-wrap logo row. SVG imports stripped, replaced with text wordmark placeholders. Light bg-background surface sandwiched below dark Pillars slab. |
| `Stats`                | https://tailark.com/dusk/stats (stats-1) | Divider-separated grid with centered eyebrow. Adapted from 3-col to 4-col (grid-cols-2 md:grid-cols-4) for the four WordPress scale stats. Rethemed to dark slab; fluid clamp() value size; tabular-nums on stat values. |
