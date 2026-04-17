// Pulled from https://tailark.com/dusk/stats (stats-1 — divider-separated grid
// with centered headline + stat grid). Adapted from 3-column to 4-column layout,
// rethemed to dark slab surface, content wired to HOMEPAGE.stats.

import { HOMEPAGE } from "@/lib/content";

export function Stats() {
	const { stats } = HOMEPAGE;

	return (
		<section className="bg-dark-slab relative overflow-hidden">
			{/* Ambient gradient glow */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: [
						"radial-gradient(ellipse 60% 50% at 20% 50%, hsl(196 100% 64% / 0.08), transparent)",
						"radial-gradient(ellipse 50% 60% at 80% 40%, hsl(247 100% 70% / 0.06), transparent)",
						"radial-gradient(ellipse 40% 40% at 50% 80%, hsl(176 64% 57% / 0.05), transparent)",
					].join(", "),
				}}
			/>
			<div className="relative py-[clamp(96px,10vw,160px)]">
				<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
					{/* Section eyebrow */}
					<div className="mb-12 text-center md:mb-16">
						<p className="eyebrow text-white/50">{stats.eyebrow}</p>
					</div>

					{/* Stat grid — dividers between columns (stats-1 pattern) */}
					<div className="grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-white/[0.08] *:text-center">
						{stats.items.map((item) => (
							<div key={item.label} className="md:px-10">
								{/* Stat value — glowing accent text */}
								<div
									className="tabular font-display text-[clamp(2.5rem,3.5vw,4rem)] font-bold tracking-[-0.03em] text-white leading-none"
									style={{ textShadow: "0 0 40px hsl(196 100% 64% / 0.25), 0 0 80px hsl(196 100% 64% / 0.08)" }}
									aria-label={item.value}
								>
									{item.value}
								</div>
								{/* Stat label */}
								<p className="eyebrow text-white/40 mt-4">{item.label}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
