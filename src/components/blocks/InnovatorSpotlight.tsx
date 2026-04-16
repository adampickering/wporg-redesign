// Pulled from https://tailark.com/dusk/testimonials (testimonials-5 — 3-column card grid).
// Testimonials-5 uses lg:grid-cols-3 Card layout with quote + author metadata per card.
// Repurposed: quote = plugin author's design philosophy; author = name + plugin = plugin name.
// Adapted: avatar removed (not needed for innovator format); quote gets font-serif for editorial warmth.
// No icons, no "use client" — pure server component.

import { Card, CardContent } from "@/components/ui/card";
import { PLUGINS } from "@/lib/content";

export function InnovatorSpotlight() {
	const { innovators } = PLUGINS;

	return (
		<section
			className="py-[clamp(96px,10vw,160px)] bg-background"
			aria-label="Innovator spotlight"
		>
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section header */}
				<div className="text-center mb-12 md:mb-16 space-y-4">
					<p className="eyebrow">{innovators.eyebrow}</p>
					<h2 className="font-display text-balance mx-auto max-w-[28ch]">
						{innovators.headline}
					</h2>
				</div>

				{/* 3-column card grid — adapted from testimonials-5 structure */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{innovators.items.map((item) => (
						<Card
							key={item.author}
							className={[
								"bg-card border-border rounded-card",
								"shadow-card",
								// shadow growth only — no translateY
								"hover:shadow-card-hover",
								"transition-[box-shadow]",
								"duration-[200ms]",
								"[transition-timing-function:var(--ease-ui)]",
							].join(" ")}
						>
							<CardContent className="flex flex-col gap-6 p-6 h-full">
								{/* Quote — font-serif for editorial warmth, not italic per spec */}
								<blockquote className="grow">
									<p
										className="font-serif text-[18px] leading-[1.45] text-pretty text-foreground"
										style={{ fontStyle: "normal" }}
									>
										&ldquo;{item.quote}&rdquo;
									</p>
								</blockquote>

								{/* Author attribution — hairline separator, name + plugin */}
								<footer className="pt-4 border-t border-border">
									<cite className="not-italic flex flex-col gap-0.5">
										<span className="font-display text-[14px] font-medium leading-snug">
											{item.author}
										</span>
										<span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
											{item.plugin}
										</span>
									</cite>
								</footer>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
