// Feature highlight bento grid — inspired by the WordPress 7.0 highlight grid design.
// Explicit grid placement for a clean rectangle with no gaps.

import { Card } from "@/components/ui/card";

type Feature = {
	label: string;
	description?: string;
	/** Explicit grid position: col-start / col-end / row-start / row-end */
	area: string;
	image?: string;
	accent?: string;
	accentWords?: number;
	size: "small" | "medium" | "large";
};

// 4-column × 4-row grid, every cell filled.
//
//  Row 1:  [ Featured (2×2)     ] [ AI models  ] [ Revisions (1×2) ]
//  Row 2:  [ Featured cont.     ] [ Admin look ] [ Revisions cont. ]
//  Row 3:  [ Fonts    ] [ Patterns (1×2) ] [ PHP blocks ] [ Fluid nav  ]
//  Row 4:  [ Nav (1×2)] [ Patterns cont. ] [ Screen size] [ Overlay    ]
//  Row 5:  [ Nav cont.]  — empty, handled by row-span —
//
// Adjusted to a clean 4×4 + half row:

const FEATURES: Feature[] = [
	{
		label: "Real-time collaboration",
		description: "Work together on the same page. See edits and comments from your team as they happen.",
		area: "md:[grid-area:1/1/3/3]",
		image: "/wporg-redesign/features/collab-photo.jpg",
		accent: "#3389DB",
		size: "large",
	},
	{
		label: "All your AI models in one place",
		area: "md:[grid-area:1/3/2/4]",
		image: "/wporg-redesign/features/fauna.jpg",
		accent: "#E2482E",
		accentWords: 3,
		size: "small",
	},
	{
		label: "Compare revisions visually",
		area: "md:[grid-area:1/4/3/5]",
		image: "/wporg-redesign/features/architecture.jpg",
		size: "medium",
	},
	{
		label: "A modern look in the admin",
		area: "md:[grid-area:2/3/3/4]",
		image: "/wporg-redesign/features/flora-1.jpg",
		size: "small",
	},
	{
		label: "Upload any font to any theme",
		area: "md:[grid-area:3/1/4/2]",
		image: "/wporg-redesign/features/flora-2.jpg",
		size: "small",
	},
	{
		label: "Simpler editing with patterns",
		area: "md:[grid-area:3/2/5/3]",
		image: "/wporg-redesign/features/landscape-red.jpg",
		size: "medium",
	},
	{
		label: "Create blocks with just PHP",
		area: "md:[grid-area:3/3/4/4]",
		image: "/wporg-redesign/features/people.jpg",
		size: "small",
	},
	{
		label: "Fluid navigation across the admin",
		area: "md:[grid-area:3/4/4/5]",
		accent: "#E2482E",
		accentWords: 2,
		image: "/wporg-redesign/features/landscape-wide.jpg",
		size: "small",
	},
	{
		label: "Your navigation overlay, your way",
		area: "md:[grid-area:4/1/5/2]",
		image: "/wporg-redesign/features/hero-7.jpg",
		accent: "#FE5D42",
		size: "small",
	},
	{
		label: "Hide blocks per screen size",
		area: "md:[grid-area:4/3/5/5]",
		image: "/wporg-redesign/features/nature-1.jpg",
		size: "small",
	},
];

export function FeatureHighlights() {
	return (
		<section className="py-[clamp(80px,8vw,128px)] relative overflow-hidden">
			{/* Ambient gradient wash */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: [
						"radial-gradient(ellipse 60% 40% at 80% 20%, hsl(340 40% 94% / 0.5), transparent)",
						"radial-gradient(ellipse 50% 50% at 10% 80%, hsl(220 40% 96% / 0.4), transparent)",
					].join(", "),
				}}
			/>
			<div className="relative mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section header */}
				<div className="mb-12">
					<p className="eyebrow mb-4">What&apos;s new in WordPress</p>
					<h2 className="font-display text-balance max-w-xl">
						Powerful features, built in the{" "}
						<em className="serif-accent">open</em>.
					</h2>
				</div>

				{/* Bento grid — 4 cols × 4 rows, explicit placement */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:grid-rows-[repeat(4,160px)]">
					{FEATURES.map((feature) => (
						<Card
							key={feature.label}
							className={[
								feature.area,
								"py-0 gap-0 overflow-hidden relative group",
								"bg-[#EBE8E5] ring-0 border-0",
								"rounded-[var(--radius-card)]",
								"shadow-card hover:shadow-card-hover",
								"transition-shadow duration-[200ms] [transition-timing-function:var(--ease-ui)]",
							].join(" ")}
						>
							{/* Background image */}
							{feature.image && (
								<img
									src={feature.image}
									alt=""
									className={[
										"absolute inset-0 w-full h-full object-cover",
										"transition-[transform,opacity] duration-500 [transition-timing-function:var(--ease-ui)]",
										"group-hover:scale-[1.03]",
										feature.size === "large"
											? "opacity-50 group-hover:opacity-60"
											: feature.size === "medium"
												? "opacity-30 group-hover:opacity-40"
												: "opacity-20 group-hover:opacity-30",
									].join(" ")}
								/>
							)}

							{/* Gradient scrim for text legibility */}
							{feature.image && (
								<div className="absolute inset-0 bg-gradient-to-t from-[#EBE8E5] via-[#EBE8E5]/60 to-transparent" />
							)}

							{/* Accent bar on large card */}
							{feature.accent && feature.size === "large" && (
								<div
									className="absolute bottom-0 left-16 right-16 h-1 rounded-t-full"
									style={{ backgroundColor: feature.accent }}
								/>
							)}

							{/* Content */}
							<div className="relative z-10 p-7 h-full flex flex-col justify-end">
								<p
									className={[
										"font-display font-medium tracking-[-0.02em] text-[#1E1E1E]",
										feature.size === "large"
											? "text-[clamp(1.75rem,1.25rem+2vw,2.75rem)] leading-[1.05] max-w-[16ch]"
											: feature.size === "medium"
												? "text-[20px] leading-[1.2]"
												: "text-[17px] leading-[1.3]",
									].join(" ")}
								>
									{feature.accent && feature.accentWords ? (
										<>
											<span style={{ color: feature.accent }}>
												{feature.label.split(" ").slice(0, feature.accentWords).join(" ")}
											</span>{" "}
											{feature.label.split(" ").slice(feature.accentWords).join(" ")}
										</>
									) : (
										feature.label
									)}
								</p>

								{feature.description && (
									<p className="mt-3 text-[14px] leading-[1.5] text-[#1E1E1E]/50 max-w-[30ch] font-light">
										{feature.description}
									</p>
								)}
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
