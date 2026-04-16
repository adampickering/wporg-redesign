// @phosphor-icons/react uses createContext internally, so any component that
// imports from it must render on the client. That's why this leaf button
// carries "use client" despite having no state or effects.
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
				// Shadow: use the design-system card shadow tokens so the
				// shadow tint tracks the foreground color via globals.css.
				"shadow-card hover:shadow-card-hover",
				// Focus ring (keyboard users) — WP blue primary outline.
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
				"focus:outline-none",
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
