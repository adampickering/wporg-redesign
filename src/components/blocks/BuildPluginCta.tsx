// Pulled from https://tailark.com/dusk/call-to-action (call-to-action-2 — centered content
// inside a bordered rounded card container). Variant 2 provides the "card with border" wrapper
// that matches the spec's bg-surface-cream inner + hairline border + rounded-card requirement.
// No icons, no "use client" — pure server component.

import Link from "next/link";
import { PLUGINS } from "@/lib/content";

export function BuildPluginCta() {
	const { buildCta } = PLUGINS;

	return (
		<section
			className="py-[clamp(96px,10vw,160px)] bg-background"
			aria-label="Build a plugin"
		>
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Inner cream card — adapted from call-to-action-2's rounded-3xl border wrapper */}
				<div className="rounded-card border border-border bg-surface-cream px-[clamp(40px,6vw,80px)] py-[clamp(64px,8vw,112px)] text-center">
					{/* Eyebrow */}
					<p className="eyebrow mb-5">{buildCta.eyebrow}</p>

					{/* Headline */}
					<h2
						className="font-display font-semibold text-balance mx-auto max-w-[22ch]"
						style={{ fontSize: "clamp(1.75rem,2vw,2.5rem)" }}
					>
						{buildCta.headline}
					</h2>

					{/* Body */}
					<p className="font-body text-muted-foreground font-light mt-5 mx-auto max-w-[60ch] text-pretty leading-[1.55]">
						{buildCta.body}
					</p>

					{/* CTA — dark pill button matching nav/hero pill pattern */}
					<div className="mt-10">
						<Link
							href={buildCta.cta.href}
							className={[
								"inline-flex items-center justify-center",
								"bg-foreground text-background",
								"rounded-pill font-display font-medium text-[14px]",
								"px-6 py-3 leading-none",
								// layered shadow matching RULES.md button pattern
								"shadow-button",
								// transitions: shadow + scale only, never 'all'
								"transition-[box-shadow,transform]",
								"duration-[200ms]",
								"[transition-timing-function:var(--ease-ui)]",
								// fast press: scale(0.97) at 75ms
								"active:scale-[0.97] active:duration-[75ms]",
								// focus ring
								"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							].join(" ")}
						>
							{buildCta.cta.label}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
