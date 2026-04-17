// Pulled from https://tailark.com/dusk/features (variant two — plain dark card grid
// with badge + title + body + metadata row, no radial decorator).
// Variant one (radial grid texture + centered icon) is already used by Pillars.
// Variant two's flat card layout is a better fit for plugin data cards that need
// structured metadata rows (name / author / pitch / rating / installs / badge)
// rather than icon-led pillar columns.
// Rethemed to dark-slab surface. Content wired from PLUGINS.featuredPlugins.

// @phosphor-icons/react uses createContext internally, so any component that
// imports from it must render on the client. That's why this section carries
// "use client" despite having no state or effects.
"use client";

import { Star } from "@phosphor-icons/react";
import { PLUGINS } from "@/lib/content";

export function MarketplaceShelf() {
	const { featuredPlugins } = PLUGINS;

	return (
		<section className="bg-dark-slab">
			<div className="py-[clamp(96px,10vw,160px)]">
				<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
					{/* Section heading */}
					<div className="text-center mb-12 md:mb-16">
						<p className="eyebrow text-white/60 mb-4">{featuredPlugins.eyebrow}</p>
						<h2 className="font-display text-white text-balance">
							{featuredPlugins.headline}
						</h2>
					</div>

					{/* Three-column plugin card grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{featuredPlugins.items.map((plugin) => (
							<article
								key={plugin.name}
								className={[
									"group relative flex flex-col gap-5 p-6",
									"bg-dark-surface rounded-[16px]",
									"border border-dark-border",
									/* Dark-mode shadow: single white ring that glows slightly on hover.
									   No translateY — shadow delta only (surfaces.md). */
									"shadow-[0_0_0_1px_hsl(0_0%_100%/0.06),inset_0_0.5px_0_hsl(0_0%_100%/0.06),inset_0_-0.5px_0_hsl(0_0%_100%/0.03)]",
									"hover:shadow-[0_0_0_1px_hsl(0_0%_100%/0.12),0_0_24px_-4px_hsl(0_0%_100%/0.04),inset_0_0.5px_0_hsl(0_0%_100%/0.08),inset_0_-0.5px_0_hsl(0_0%_100%/0.04)]",
									"transition-[box-shadow]",
									"duration-[200ms]",
									"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
								].join(" ")}
							>
								{/* Badge — conditional, null-safe */}
								{plugin.badge !== null && (
									<span
										className={[
											"self-start",
											"bg-accent-cyan/10 text-accent-cyan",
											"font-mono text-[10px] uppercase tracking-[0.14em]",
											"px-2 py-0.5 rounded-[9999px]",
										].join(" ")}
									>
										{plugin.badge}
									</span>
								)}

								{/* Plugin name + author */}
								<div className="flex flex-col gap-1">
									<h3 className="font-display font-bold text-white text-balance leading-[1.05] tracking-[-0.025em] text-[1.125rem]">
										{plugin.name}
									</h3>
									<p className="text-white/60 text-[13px] font-light">
										by {plugin.author}
									</p>
								</div>

								{/* Pitch */}
								<p className="text-white/70 text-[14px] font-light leading-[1.5] text-pretty grow">
									{plugin.pitch}
								</p>

								{/* Metadata row: rating + installs */}
								<div className="flex items-center gap-4 pt-1 border-t border-dark-border">
									{/* Rating */}
									<div className="flex items-center gap-1.5">
										<Star
											size={14}
											weight="fill"
											className="text-accent-cyan"
											aria-hidden
										/>
										<span className="tabular text-white text-[13px] font-medium">
											{plugin.rating}
										</span>
									</div>

									{/* Installs */}
									<span className="tabular text-white/60 text-[13px]">
										{plugin.installs} active
									</span>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
