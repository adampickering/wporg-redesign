// Phosphor icons need "use client". Star for rating display.
"use client";

import { Star } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { PLUGINS } from "@/lib/content";

export function PluginCardGrid() {
	const { pluginGrid } = PLUGINS;

	return (
		<section
			className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)] py-[clamp(48px,6vw,80px)]"
			aria-label="Plugin directory"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{pluginGrid.map((plugin) => (
					<article
						key={plugin.name}
						className={[
							"flex flex-col gap-4 p-5",
							"bg-card border border-border rounded-card",
							"shadow-card",
							// shadow growth on hover, no translateY
							"hover:shadow-card-hover",
							"transition-[box-shadow]",
							"duration-[200ms]",
							"[transition-timing-function:var(--ease-ui)]",
							// focus ring for keyboard navigation
							"focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
						].join(" ")}
					>
						{/* Icon placeholder + plugin identity */}
						<div className="flex items-start gap-3">
							{/* Icon placeholder: 48×48 warm surface square */}
							<div
								className="shrink-0 w-12 h-12 rounded-lg bg-surface-cream border border-border"
								aria-hidden="true"
							/>
							<div className="flex flex-col gap-0.5 min-w-0">
								<h3 className="font-display text-[15px] font-bold leading-snug tracking-[-0.02em] text-balance">
									{plugin.name}
								</h3>
								<p className="font-body text-[12px] text-muted-foreground font-light leading-snug truncate">
									by {plugin.author}
								</p>
							</div>
						</div>

						{/* Pitch */}
						<p className="font-body text-[13px] text-muted-foreground font-light leading-[1.5] text-pretty grow">
							{plugin.pitch}
						</p>

						{/* Metadata row: rating + installs + tested-with badge */}
						<div className="flex items-center gap-3 pt-1 border-t border-border flex-wrap">
							{/* Rating */}
							<div className="flex items-center gap-1" aria-label={`Rating: ${plugin.rating}`}>
								<Star
									size={13}
									weight="fill"
									className="text-primary"
									aria-hidden="true"
								/>
								<span className="tabular text-[12px] font-medium leading-none">
									{plugin.rating}
								</span>
							</div>

							{/* Active installs */}
							<span className="tabular text-[11px] text-muted-foreground leading-none">
								{plugin.installs} active
							</span>

							{/* Spacer */}
							<div className="flex-1" />

							{/* Tested-with badge */}
							<Badge
								variant="outline"
								className="rounded-chip font-mono text-[9px] uppercase tracking-[0.12em] border-border text-muted-foreground h-auto px-1.5 py-0.5"
								aria-label={`Tested with WordPress ${plugin.testedWith}`}
							>
								WP {plugin.testedWith}
							</Badge>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
