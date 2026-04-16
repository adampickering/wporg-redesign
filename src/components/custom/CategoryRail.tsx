// Client component: ToggleGroup requires state for the active pill.
"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PLUGINS } from "@/lib/content";

export function CategoryRail() {
	const [active, setActive] = useState("popular");

	function handleValueChange(vals: string[]) {
		// base-ui ToggleGroup passes string[]. Enforce at least one selected.
		if (vals.length > 0) {
			setActive(vals[vals.length - 1]);
		}
	}

	return (
		<div
			className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border"
			role="navigation"
			aria-label="Plugin categories"
		>
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				<ScrollArea className="w-full">
					<ToggleGroup
						value={[active]}
						onValueChange={handleValueChange}
						className="flex gap-1.5 py-3 w-max"
						aria-label="Filter plugins by category"
						render={<div role="toolbar" />}
					>
						{PLUGINS.categories.map((cat) => (
							<ToggleGroupItem
								key={cat.slug}
								value={cat.slug}
								aria-label={`${cat.label} — ${cat.count} plugins`}
								className={[
									// layout
									"flex items-center gap-1.5 px-3 h-8 rounded-pill border",
									// type
									"font-mono text-[10px] uppercase tracking-[0.14em]",
									// transition — only box-shadow + colors, never 'all'
									"transition-[border-color,background-color,color,box-shadow]",
									"duration-[200ms]",
									"[transition-timing-function:var(--ease-ui)]",
									// press tactile feedback
									"active:scale-[0.97]",
									// inactive state
									"border-border text-muted-foreground",
									// active state (aria-pressed set by base-ui)
									"aria-pressed:bg-foreground aria-pressed:text-white aria-pressed:border-foreground",
								].join(" ")}
							>
								{cat.label}
								<span className="tabular opacity-60">{cat.count}</span>
							</ToggleGroupItem>
						))}
					</ToggleGroup>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</div>
	);
}
