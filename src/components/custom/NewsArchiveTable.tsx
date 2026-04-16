// Client component: interactive ToggleGroup filter state requires useState.
"use client";

import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { NEWS } from "@/lib/content";

export function NewsArchiveTable() {
	const [activeCategory, setActiveCategory] = useState("All");

	const filtered =
		activeCategory === "All"
			? NEWS.archivePosts
			: NEWS.archivePosts.filter((p) => p.category === activeCategory);

	function handleValueChange(vals: string[]) {
		// base-ui ToggleGroup passes an array; enforce that one pill is always active.
		if (vals.length > 0) {
			setActiveCategory(vals[vals.length - 1]);
		}
	}

	return (
		<section className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)] pb-[clamp(64px,8vw,120px)] pt-12">
			{/* Header row: title + category filter pills */}
			<div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--color-foreground-news)]/[0.12] pb-5 mb-0">
				<h2
					className="font-display text-[28px] font-semibold tracking-[-0.028em] leading-none text-[color:var(--color-foreground-news)]"
					style={{ fontFeatureSettings: '"ss01" on, "cv11" on' }}
				>
					Archive
				</h2>

				<ToggleGroup
					value={[activeCategory]}
					onValueChange={handleValueChange}
					className="flex-wrap gap-1.5"
					aria-label="Filter posts by category"
				>
					{NEWS.archiveCategories.map((cat) => (
						<ToggleGroupItem
							key={cat}
							value={cat}
							aria-label={cat}
							className={[
								"font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-1 h-auto rounded-pill border",
								"transition-colors duration-[150ms]",
								"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
								"active:scale-[0.97] active:transition-none",
								// pressed / active state
								"aria-pressed:bg-[color:var(--color-foreground-news)] aria-pressed:text-white aria-pressed:border-[color:var(--color-foreground-news)]",
								// unpressed state
								"aria-pressed:border-[color:var(--color-foreground-news)] border-[color:var(--color-foreground-news)]/[0.18] text-muted-foreground",
							].join(" ")}
						>
							{cat}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</div>

			{/* Archive table */}
			<Table className="border-collapse">
				<TableHeader>
					<TableRow className="border-b border-[color:var(--color-foreground-news)]/[0.08] hover:bg-transparent">
						<TableHead className="w-[130px] py-3 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
							Date
						</TableHead>
						<TableHead className="w-[150px] py-3 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
							Category
						</TableHead>
						<TableHead className="py-3 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-normal">
							Title
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filtered.map((post) => (
						<TableRow
							key={post.title}
							className="border-b border-[color:var(--color-foreground-news)]/[0.06] hover:bg-[color:var(--color-foreground-news)]/[0.02] transition-colors duration-[150ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
						>
							{/* Date — mono tabular, muted */}
							<TableCell className="py-4 px-2 font-mono text-[11px] text-muted-foreground tabular whitespace-nowrap">
								{post.date}
							</TableCell>

							{/* Category — mono uppercase eyebrow */}
							<TableCell className="py-4 px-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap">
								{post.category}
							</TableCell>

							{/* Title — display font, hover to primary */}
							<TableCell className="py-4 px-2">
								<a
									href={post.href}
									className="font-display text-[15px] font-medium leading-[1.4] text-[color:var(--color-foreground-news)] no-underline hover:text-[color:var(--color-primary)] transition-colors duration-[150ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
									style={{ fontFeatureSettings: '"ss01" on, "cv11" on' }}
								>
									{post.title}
								</a>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* "See all posts →" CTA — underline link pattern matching NewsPreview */}
			<a
				href={NEWS.archiveCta.href}
				className="inline-flex items-center gap-2 mt-8 font-display text-[15px] font-medium text-[color:var(--color-foreground-news)] no-underline border-b border-[color:var(--color-foreground-news)] pb-px hover:text-[color:var(--color-primary)] hover:border-[color:var(--color-primary)] transition-colors duration-[150ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
				style={{ fontFeatureSettings: '"ss01" on, "cv11" on' }}
			>
				{NEWS.archiveCta.label}
			</a>
		</section>
	);
}
