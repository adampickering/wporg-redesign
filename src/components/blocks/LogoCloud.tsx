// Pulled from https://tailark.com/dusk/logo-cloud (variant one — centered headline + flex-wrap
// logo row, bg-background, no marquee). SVG logo imports stripped; replaced with text wordmark
// placeholders. Content wired to HOMEPAGE.showcase from src/lib/content.ts.
//
// TODO: replace text wordmark placeholders with licensed SVG logos for the real customers.
// Phase 1 uses text-only stand-ins because we don't have trademark clearance.

import { HOMEPAGE } from "@/lib/content";

export function LogoCloud() {
	const { showcase } = HOMEPAGE;

	return (
		<section className="bg-background py-[clamp(80px,8vw,128px)]">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section heading — centered, subdued, matching Tailark variant structure */}
				<div className="text-center">
					<p className="eyebrow mb-4">{showcase.eyebrow}</p>
					<h2 className="font-display text-balance">
						{showcase.headline}
					</h2>
				</div>

				{/* Hairline separator above logo row */}
				<div
					aria-hidden
					className="mx-auto mt-12 max-w-4xl border-t border-border"
				/>

				{/* Logo row — adapted from Tailark logo-cloud-1 flex-wrap layout.
				    Each slot renders a text wordmark as a prototype stand-in for
				    a licensed SVG. Real production logos go here. */}
				<div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6 sm:gap-x-16 sm:gap-y-8">
					{showcase.logos.map((logo) => (
						<span
							key={logo.name}
							className="font-display text-[18px] font-semibold tracking-[-0.015em] text-muted-foreground whitespace-nowrap"
						>
							{logo.name}
						</span>
					))}
				</div>

				{/* Hairline separator below logo row */}
				<div
					aria-hidden
					className="mx-auto mt-10 max-w-4xl border-t border-border"
				/>
			</div>
		</section>
	);
}
