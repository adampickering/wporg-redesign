import { Card } from "@/components/ui/card";
import { HOMEPAGE } from "@/lib/content";

// Per-card radial gradient accent — project accent HSLs at 12–15% opacity
// so they read as atmospheric tints, not solid fills.
const CARD_GRADIENTS: Record<number, string> = {
	0: "radial-gradient(circle at 30% 40%, hsl(246 100% 69% / 0.15) 0%, transparent 55%)",
	1: "radial-gradient(circle at 65% 30%, hsl(196 100% 63% / 0.12) 0%, transparent 55%)",
	2: "radial-gradient(circle at 40% 65%, hsl(176 66% 57% / 0.12) 0%, transparent 55%)",
	3: "radial-gradient(circle at 70% 60%, hsl(246 100% 69% / 0.10) 0%, transparent 55%)",
	4: "radial-gradient(circle at 25% 50%, hsl(196 100% 63% / 0.10) 0%, transparent 55%)",
};

export function ShowcaseBento() {
	const { showcaseBento } = HOMEPAGE;

	return (
		<section className="py-[clamp(96px,10vw,160px)]">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section header */}
				<p className="eyebrow mb-3">{showcaseBento.eyebrow}</p>
				<h2 className="font-display max-w-xl mb-10 text-foreground">
					{showcaseBento.headline}
				</h2>

				{/*
				  Bento grid layout:
				  - Mobile: single column
				  - md+: 3 columns, auto rows at 220px
				  - Featured card (index 0) spans 2 cols × 2 rows → 440px tall on md+
				  - Remaining 4 cards each fill one cell
				*/}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 [grid-auto-rows:220px]">
					{showcaseBento.sites.map((site, i) => (
						<Card
							key={site.name}
							className={[
								// Reset shadcn Card defaults that conflict with our system
								"py-0 gap-0",
								// Surface: cream token, not white
								"bg-[color:var(--color-surface-cream)]",
								// Border: hairline via shadow ring, not a hard border
								"ring-0",
								// Radius: 16px card radius from architecture
								"rounded-[var(--radius-card)]",
								// Layout
								"overflow-hidden relative",
								// Shadow: resting layered tinted shadow
								"shadow-card",
								// Hover: grow shadow ring + deepen contact, no translateY
								"hover:shadow-card-hover",
								// Transition: exact properties only, UI easing, 200ms
								"transition-shadow duration-[200ms] [transition-timing-function:var(--ease-ui)]",
								// Featured card spans 2 cols × 2 rows on md+
								i === 0 ? "md:col-span-2 md:row-span-2" : "",
							]
								.filter(Boolean)
								.join(" ")}
						>
							{/* Decorative radial gradient — atmospheric, not dominant */}
							<div
								aria-hidden="true"
								className="absolute inset-0 pointer-events-none"
								style={{ background: CARD_GRADIENTS[i] ?? "none" }}
							/>

							{/* Card label — bottom-left, outside gradient layer */}
							<div className="absolute bottom-5 left-5 z-10">
								{site.featured && (
									<span className="eyebrow block mb-1.5 text-muted-foreground">
										Featured
									</span>
								)}
								<h3
									className="font-display text-foreground leading-tight"
									style={{
										fontSize: site.featured ? "1.5rem" : "1rem",
										letterSpacing: site.featured ? "-0.028em" : "-0.015em",
									}}
								>
									{site.name}
								</h3>
							</div>
						</Card>
					))}
				</div>

				{/* CTA: text link with bottom border, not a button */}
				<a
					href={showcaseBento.cta.href}
					className={[
						"inline-flex mt-8",
						"font-display text-[15px] font-medium",
						"text-foreground no-underline",
						// Underline via border-b — hairline token color
						"border-b border-[color:var(--color-foreground)]",
						"pb-px",
						// Hover: fade the underline, no translateY
						"transition-[border-color,opacity] duration-[200ms]",
						"[transition-timing-function:var(--ease-ui)]",
						"hover:opacity-60",
					].join(" ")}
				>
					{showcaseBento.cta.label}
				</a>
			</div>
		</section>
	);
}
