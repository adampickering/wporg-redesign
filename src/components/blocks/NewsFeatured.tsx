// Pulled from https://tailark.com/dusk/content (content-1 — two-column image-left,
// text-right layout). Adapted: decorative dark gradient panel replaces the image
// slot (no hero image available for the prototype); content rewired to
// NEWS.featuredPost from src/lib/content.ts. Cream inner surface, serif excerpt.
// No icons, no state, no "use client".

import { NEWS } from "@/lib/content";

export function NewsFeatured() {
	const { featuredPost } = NEWS;

	return (
		<section className="py-8">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Cream inner card */}
				<div
					className={[
						"bg-[color:var(--color-surface-cream)]",
						"rounded-[20px] p-4",
						"border border-[color:var(--color-border)]",
					].join(" ")}
				>
					{/* Two-column grid — image 1.3fr, text 1fr */}
					<div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
						{/* Left: decorative dark panel (no real hero image) */}
						<div className="aspect-[16/11] bg-dark-slab rounded-[12px] flex items-end p-5 overflow-hidden relative">
							{/* Radial accent gradients — cyan top-left, purple bottom-right */}
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(196_100%_64%/0.3),transparent_50%)]" />
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(247_100%_70%/0.3),transparent_50%)]" />
							{/* Category chip on the panel */}
							<span className="eyebrow text-white/70 relative z-10">
								{featuredPost.category}
							</span>
						</div>

						{/* Right: text column */}
						<div className="flex flex-col py-6 pr-4">
							{/* Mono metadata — date · category · read time */}
							<p
								className={[
									"font-mono text-[11px] tracking-[0.14em] uppercase",
									"text-muted-foreground mb-4 tabular",
								].join(" ")}
							>
								<time dateTime={featuredPost.date}>{featuredPost.date}</time>
								{" · "}
								{featuredPost.category}
								{" · "}
								{featuredPost.readTime}
							</p>

							{/* Display title */}
							<h2
								className={[
									"font-display font-semibold leading-[1.05] tracking-[-0.028em]",
									"text-[clamp(1.625rem,1rem+2vw,2.25rem)]",
									"text-[color:var(--color-foreground-news)] text-balance",
									"mb-4",
									"[font-feature-settings:'ss01'_on,'cv11'_on]",
								].join(" ")}
							>
								{featuredPost.title}
							</h2>

							{/* Instrument Serif excerpt — regular weight, NOT italic */}
							<p
								className={[
									"font-serif text-[18px] leading-[1.45]",
									"text-[color:var(--color-foreground-news)]",
									"font-normal mb-7 text-pretty",
								].join(" ")}
							>
								{featuredPost.excerpt}
							</p>

							{/* Read link — pushes to bottom of flex column */}
							<a
								href={featuredPost.href}
								className={[
									"font-display text-[14px] font-medium",
									"text-[color:var(--color-foreground-news)] no-underline",
									"inline-flex items-center gap-2 mt-auto",
									// Hover: subtle opacity fade, no translateY
									"transition-opacity duration-[200ms]",
									"[transition-timing-function:var(--ease-ui)]",
									"hover:opacity-60",
									// Minimum hit area
									"min-h-[40px]",
								].join(" ")}
							>
								Read the release notes
								<span aria-hidden="true">→</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
