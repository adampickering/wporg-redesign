// Pulled from https://tailark.com/dusk/features (variant one — 3-column card grid
// with radial-masked grid-texture decorator + centered icon + title + body).
// Lucide icons stripped, replaced with Phosphor equivalents. Content rewired to
// HOMEPAGE.pillars from src/lib/content.ts. Rethemed to dark slab surface.

// @phosphor-icons/react uses createContext internally, so any component that
// imports from it must render on the client. That's why this section carries
// "use client" despite having no state or effects.
"use client";

import { Palette, Cube, Broadcast, type Icon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { HOMEPAGE } from "@/lib/content";

// Map the string icon names from content.ts to Phosphor components.
const ICON_MAP: Record<string, Icon> = {
	Palette,
	Cube,
	Broadcast,
};

// Inner icon decorator — radial-masked grid texture with centered icon.
// Adapted from the Tailark features-1 CardDecorator; coloring inverted for dark slab.
const PillarDecorator = ({ children }: { children: ReactNode }) => (
	<div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 [--color-border:color-mix(in_oklab,var(--color-white)12%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
		{/* Grid texture */}
		<div
			aria-hidden
			className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"
		/>
		{/* Centered icon box */}
		<div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t border-[hsl(233_20%_22%)] bg-dark-surface">
			{children}
		</div>
	</div>
);

export function Pillars() {
	const { pillars } = HOMEPAGE;

	return (
		<section className="bg-dark-slab">
			<div className="py-[clamp(96px,10vw,160px)]">
				<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
					{/* Section heading */}
					<div className="text-center">
						<p className="eyebrow text-white/60 mb-4">{pillars.eyebrow}</p>
						<h2 className="font-display text-white text-balance">
							{pillars.headline}
						</h2>
					</div>

					{/* Three-column pillar grid */}
					<div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 *:text-center">
						{pillars.items.map((pillar) => {
							const PhosphorIcon = ICON_MAP[pillar.icon];
							return (
								<div key={pillar.icon} className="group">
									{/* Icon decorator */}
									<PillarDecorator>
										<PhosphorIcon
											size={28}
											weight="bold"
											className="text-accent-cyan"
											aria-hidden
										/>
									</PillarDecorator>

									{/* Title */}
									<h3 className="mt-6 font-display font-medium text-white text-balance">
										{pillar.title}
									</h3>

									{/* Body */}
									<p className="mt-3 text-sm font-light text-white/70 leading-[1.5] text-pretty">
										{pillar.body}
									</p>

									{/* Link */}
									<a
										href={pillar.link.href}
										className={[
											"mt-4 inline-block text-sm font-medium no-underline",
											"text-accent-cyan",
											"transition-colors duration-[200ms]",
											"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
											"hover:text-white",
										].join(" ")}
									>
										{pillar.link.label}
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
