// Pulled from https://tailark.com/dusk/hero-section (variant 7 — centered
// headline, subtext, dual CTAs, product panel slot below). Nav header stripped
// (handled by SiteChrome). Lucide + Swiper deps removed per project rules.
// Content rewired to HOMEPAGE.hero from src/lib/content.ts.

import { HOMEPAGE } from "@/lib/content";

export function HomepageHero() {
	const { hero } = HOMEPAGE;

	return (
		<section>
			<div className="relative py-[clamp(96px,10vw,160px)]">
				<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
					{/* ── Centered content column ─────────────────────────────── */}
					<div className="text-center sm:mx-auto sm:w-10/12 lg:mr-auto lg:mt-0 lg:w-4/5 lg:mx-auto">

						<p className="eyebrow mb-5">{hero.eyebrow}</p>

						{/* Display headline */}
						<h1 className="font-display">
							{hero.headlineBefore}
							<br />
							Still the{" "}
							<em className="serif-accent">{hero.headlineAccent}</em>
							{hero.headlineAfter}
						</h1>

						{/* Subtext */}
						<p className="font-body text-[18px] leading-[1.5] font-light text-muted-foreground max-w-[52ch] mx-auto mt-6">
							{hero.subtext}
						</p>

						{/* CTA pair */}
						<div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
							<a
								href={hero.primaryCta.href}
								className={[
									// Pill shape, dark fill
									"inline-flex items-center justify-center",
									"h-12 px-6 rounded-[9999px]",
									"bg-foreground text-[color:var(--color-background)]",
									"font-medium text-[15px] no-underline whitespace-nowrap",
									// Tinted layered shadow
									"shadow-[0_0_0_1px_hsl(234.55_17.46%_12.35%/0.9),0_2px_4px_hsl(234.55_17.46%_12.35%/0.12),inset_0_8px_18px_-8px_hsl(0_0%_100%/0.32)]",
									// Transitions — explicit properties only
									"transition-[shadow,scale] duration-[200ms]",
									"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
									// Press feedback — fast ease-out per spec
									"active:scale-[0.97] active:[transition-duration:75ms] active:[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
								].join(" ")}
							>
								{hero.primaryCta.label}
							</a>

							<a
								href={hero.secondaryCta.href}
								className={[
									// Pill shape, outlined
									"inline-flex items-center justify-center",
									"h-12 px-6 rounded-[9999px]",
									"bg-transparent",
									"border border-[hsl(234.55_17.46%_12.35%/0.18)]",
									"text-foreground",
									"font-medium text-[15px] no-underline whitespace-nowrap",
									// Transitions — explicit properties only
									"transition-[border-color,scale] duration-[200ms]",
									"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
									"hover:border-[hsl(234.55_17.46%_12.35%/0.32)]",
									// Press feedback — fast ease-out per spec
									"active:scale-[0.97] active:[transition-duration:75ms] active:[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
								].join(" ")}
							>
								{hero.secondaryCta.label}
							</a>
						</div>

						{/* ── Faux block editor panel ─────────────────────────── */}
						<div className="mt-10 bg-dark-slab rounded-[14px] p-3.5 border border-[hsl(233_20%_22%)]">
							<div className="bg-dark-surface rounded-[10px] min-h-[220px] grid grid-cols-[160px_1fr] overflow-hidden">
								{/* Fake sidebar */}
								<aside className="bg-[hsl(233_20%_10%)] p-3.5 border-r border-[hsl(233_20%_24%)]">
									<div className="h-2 rounded-full mb-2 w-3/5 bg-[hsl(233_20%_24%)]" />
									<div className="h-2 rounded-full mb-2 w-11/12 bg-[color:var(--color-accent-cyan)]" />
									<div className="h-2 rounded-full mb-2 w-1/2 bg-[hsl(233_20%_24%)]" />
									<div className="h-2 rounded-full mb-2 w-4/5 bg-[hsl(233_20%_24%)]" />
									<div className="h-2 rounded-full mb-2 w-2/5 bg-[hsl(233_20%_24%)]" />
								</aside>
								{/* Fake content */}
								<div className="p-4 space-y-2.5">
									<div className="h-2.5 rounded-full w-4/5 bg-[hsl(233_20%_24%)]" />
									<div className="h-2.5 rounded-full w-1/2 bg-gradient-to-r from-[color:var(--color-accent-purple)] to-[color:var(--color-accent-cyan)]" />
									<div className="h-2.5 rounded-full w-3/5 bg-[hsl(233_20%_24%)]" />
									<div className="h-2.5 rounded-full w-2/5 bg-[hsl(233_20%_24%)]" />
									<div className="h-2.5 rounded-full w-4/5 bg-[hsl(233_20%_24%)]" />
								</div>
							</div>
						</div>

						{/* ── Stats strip ─────────────────────────────────────── */}
						<div className="mt-10 pt-6 border-t border-border flex gap-8 flex-wrap justify-center">
							{hero.stats.map((s) => (
								<div key={s.label} className="text-left">
									<div className="tabular font-display text-[26px] font-medium tracking-[-0.02em] text-foreground">
										{s.value}
									</div>
									<div className="eyebrow mt-1">{s.label}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
