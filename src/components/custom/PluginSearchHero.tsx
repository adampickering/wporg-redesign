// @phosphor-icons/react uses createContext internally — "use client" required.
"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PLUGINS } from "@/lib/content";

export function PluginSearchHero() {
	const { hero } = PLUGINS;

	return (
		<section
			className="py-[clamp(96px,10vw,160px)] text-center"
			aria-label="Plugin search hero"
		>
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Eyebrow — tabular so the "60,000+" digits align cleanly */}
				<p className="eyebrow tabular mb-5">{hero.eyebrow}</p>

				{/* Headline with serif italic accent on "open" */}
				<h1 className="font-display mx-auto max-w-[18ch]">
					{hero.headlineBefore}{" "}
					<em className="serif-accent">{hero.headlineAccent}</em>
					{hero.headlineAfter}
				</h1>

				{/* Search input */}
				<div className="mt-10 max-w-xl mx-auto relative">
					<MagnifyingGlass
						size={18}
						weight="bold"
						className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
						aria-hidden="true"
					/>
					<Input
						type="search"
						placeholder={hero.searchPlaceholder}
						aria-label="Search plugins"
						className={[
							"h-14 pl-14 pr-5 rounded-pill text-[15px]",
							"bg-card border-border",
							"shadow-card",
							"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:outline-none",
						].join(" ")}
					/>
				</div>

				{/* Trending chips */}
				<div className="mt-6 flex gap-2 justify-center flex-wrap items-center">
					<span className="eyebrow mr-2">Trending:</span>
					{hero.trending.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							className="rounded-pill border-border font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 text-muted-foreground"
						>
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</section>
	);
}
