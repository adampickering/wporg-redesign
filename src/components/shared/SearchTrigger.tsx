"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

type SearchTriggerProps = {
	placeholder?: string;
};

export function SearchTrigger({
	placeholder = "Search plugins, themes, docs…",
}: SearchTriggerProps) {
	return (
		<button
			type="button"
			aria-label="Open search"
			className={[
				// Shape + sizing
				"w-[200px] h-[36px] rounded-pill",
				// Surface
				"bg-card border border-border",
				// Layout
				"flex items-center gap-2.5 px-[14px]",
				// Shadow: 2-layer tinted card shadow
				"shadow-[0_1px_2px_hsl(234.55_17.46%_12.35%/0.04),inset_0_1px_0_hsl(0_0%_100%/0.6)]",
				// Hover: shadow grows slightly
				"hover:shadow-[0_2px_6px_hsl(234.55_17.46%_12.35%/0.08),inset_0_1px_0_hsl(0_0%_100%/0.6)]",
				// Press feedback: fast ease-out (snappy shrink, not Material slow-in)
				"transition-[transform,box-shadow] duration-[75ms]",
				"[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
				"active:scale-[0.96]",
				// Reset button defaults
				"cursor-pointer select-none",
			].join(" ")}
		>
			<MagnifyingGlass
				size={13}
				weight="bold"
				aria-hidden
				className="shrink-0 text-muted-foreground"
			/>
			<span className="flex-1 font-display text-[13px] text-muted-foreground tracking-[-0.005em] text-left truncate leading-none">
				{placeholder}
			</span>
			<kbd className="shrink-0 font-mono text-[10px] px-1.5 py-0.5 bg-surface-cream text-muted-foreground rounded-chip tracking-[0] leading-none">
				⌘K
			</kbd>
		</button>
	);
}
