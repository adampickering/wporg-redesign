// Pulled from https://tailark.com/dusk/content (content-3 — 3-column article
// teaser card grid with eyebrow category, display title, and mono date).
// Content rewired to HOMEPAGE.latestNews from src/lib/content.ts.
// Light bg-background surface. No icons, no state, no "use client".

import { HOMEPAGE } from "@/lib/content";

export function NewsPreview() {
	const { latestNews } = HOMEPAGE;

	return (
		<section className="bg-background py-[clamp(96px,10vw,160px)]">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section header */}
				<p className="eyebrow mb-3">{latestNews.eyebrow}</p>
				<h2 className="font-display mb-10 text-foreground">{latestNews.headline}</h2>

				{/* 3-column card grid */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{latestNews.items.map((item) => (
						<a
							key={item.title}
							href={item.href}
							className={[
								// Card shell — cream surface, hairline ring via shadow, 16px radius
								"group block no-underline",
								"rounded-card bg-surface-cream p-6",
								// Resting layered tinted shadow
								"shadow-card",
								// Hover: grow shadow ring, no translateY
								"hover:shadow-card-hover",
								// Transition: box-shadow only, UI easing, 200ms
								"transition-shadow duration-[200ms]",
								"[transition-timing-function:var(--ease-ui)]",
							].join(" ")}
						>
							{/* Category eyebrow */}
							<p className="eyebrow mb-4">{item.category}</p>

							{/* Article title */}
							<h3
								className={[
									"font-display font-bold text-foreground text-balance",
									"text-[clamp(1.125rem,1.4vw,1.375rem)]",
									"tracking-[-0.02em] leading-[1.15]",
									// Subtle color shift on hover
									"transition-colors duration-[200ms]",
									"[transition-timing-function:var(--ease-ui)]",
									"group-hover:text-primary",
								].join(" ")}
							>
								{item.title}
							</h3>

							{/* Date — mono, tabular, muted */}
							<time
								className="tabular font-mono text-[12px] text-muted-foreground mt-4 block"
								dateTime={item.date}
							>
								{item.date}
							</time>
						</a>
					))}
				</div>

				{/* CTA: same underline-link style as ShowcaseBento */}
				<a
					href={latestNews.cta.href}
					className={[
						"inline-flex mt-8",
						"font-display text-[15px] font-medium",
						"text-foreground no-underline",
						// Underline via border-b — foreground token
						"border-b border-[color:var(--color-foreground)]",
						"pb-px",
						// Hover: fade, no translateY
						"transition-[border-color,opacity] duration-[200ms]",
						"[transition-timing-function:var(--ease-ui)]",
						"hover:opacity-60",
					].join(" ")}
				>
					{latestNews.cta.label}
				</a>
			</div>
		</section>
	);
}
