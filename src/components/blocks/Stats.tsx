// Pulled from https://tailark.com/dusk/stats (stats-1 — divider-separated grid
// with centered headline + stat grid). Adapted from 3-column to 4-column layout,
// rethemed to dark slab surface, content wired to HOMEPAGE.stats.

import { HOMEPAGE } from "@/lib/content";

export function Stats() {
	const { stats } = HOMEPAGE;

	return (
		<section className="bg-dark-slab">
			<div className="py-[clamp(96px,10vw,160px)]">
				<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
					{/* Section eyebrow */}
					<div className="mb-12 text-center md:mb-16">
						<p className="eyebrow text-white/60">{stats.eyebrow}</p>
					</div>

					{/* Stat grid — dividers between columns (stats-1 pattern) */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10 *:text-center">
						{stats.items.map((item) => (
							<div key={item.label} className="space-y-2 md:px-8">
								{/* Stat value */}
								<div
									className="tabular font-display text-[clamp(2.5rem,3vw,4rem)] font-semibold tracking-[-0.03em] text-white leading-none"
									aria-label={item.value}
								>
									{item.value}
								</div>
								{/* Stat label */}
								<p className="eyebrow text-white/60 mt-2">{item.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
