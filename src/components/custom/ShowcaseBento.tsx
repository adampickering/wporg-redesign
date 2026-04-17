// Dramatic showcase section — Wix/Squarespace-inspired asymmetric grid
// with bold CTA header and full-bleed site screenshots.

const SHOWCASE_SITES = [
	{
		name: "Eduardo del Fraile",
		category: "Creative",
		image: "/wporg-redesign/showcase/eduardo-del-fraile.png",
		href: "https://eduardodelfraile.com/",
		area: "md:[grid-area:1/1/3/3]",
	},
	{
		name: "Schulhaus Tirol",
		category: "Business",
		image: "/wporg-redesign/showcase/schulhaus-tirol.png",
		href: "https://schulhaus-tirol.at/",
		area: "md:[grid-area:1/3/2/5]",
	},
	{
		name: "Landia",
		category: "Creative",
		image: "/wporg-redesign/showcase/landia.png",
		href: "https://landia.com/",
		area: "md:[grid-area:2/3/3/4]",
	},
	{
		name: "Unseen Studio",
		category: "Creative",
		image: "/wporg-redesign/showcase/unseen-studio.png",
		href: "https://unseen.co/",
		area: "md:[grid-area:2/4/3/5]",
	},
	{
		name: "MAG Wire Technology",
		category: "Business",
		image: "/wporg-redesign/showcase/mag-wire.png",
		href: "https://www.mag.co.uk/",
		area: "md:[grid-area:3/1/4/2]",
	},
	{
		name: "Rafael Nadal",
		category: "Sports",
		image: "/wporg-redesign/showcase/nadal.png",
		href: "https://www.rafaelnadal.com/",
		area: "md:[grid-area:3/2/5/4]",
	},
	{
		name: "Te Tuhi",
		category: "Creative",
		image: "/wporg-redesign/showcase/te-tuhi.png",
		href: "https://tetuhi.art/",
		area: "md:[grid-area:3/4/4/5]",
	},
	{
		name: "Ray Charles",
		category: "Publication",
		image: "/wporg-redesign/showcase/ray-charles.png",
		href: "https://raycharlesvideomuseum.com/",
		area: "md:[grid-area:4/1/5/2]",
	},
];

export function ShowcaseBento() {
	return (
		<section className="py-[clamp(96px,10vw,160px)] relative">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Bold CTA header */}
				<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
					<div>
						<p className="eyebrow mb-4">Showcase</p>
						<h2 className="font-display text-foreground max-w-[20ch]">
							See what people build with{" "}
							<em className="serif-accent">WordPress</em>.
						</h2>
					</div>
					<a
						href="/showcase/"
						className={[
							"inline-flex items-center justify-center shrink-0",
							"h-12 px-7 rounded-[10px]",
							"bg-foreground text-background",
							"font-display font-bold text-[14px] no-underline whitespace-nowrap",
							"shadow-button",
							"transition-[box-shadow,transform] duration-[200ms]",
							"[transition-timing-function:var(--ease-ui)]",
							"active:scale-[0.97] active:[transition-duration:75ms]",
						].join(" ")}
					>
						Explore the Showcase
					</a>
				</div>

				{/* Asymmetric masonry grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:grid-rows-[repeat(4,200px)]">
					{SHOWCASE_SITES.map((site) => (
						<a
							key={site.name}
							href={site.href}
							target="_blank"
							rel="noopener noreferrer"
							className={[
								site.area,
								"block no-underline group relative",
								"rounded-[12px] overflow-hidden",
								"ring-1 ring-black/[0.06]",
								"transition-[box-shadow,transform] duration-300",
								"[transition-timing-function:var(--ease-ui)]",
								"hover:shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_24px_48px_-12px_rgba(0,0,0,0.15)]",
								"hover:scale-[1.01]",
							].join(" ")}
						>
							{/* Full-bleed screenshot */}
							<img
								src={site.image}
								alt={`${site.name} — ${site.category}`}
								className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]"
							/>

							{/* Bottom scrim */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							{/* Label — hidden by default, appears on hover */}
							<div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-[transform,opacity] duration-300 [transition-timing-function:var(--ease-ui)]">
								<p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60 mb-1">
									{site.category}
								</p>
								<h3 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white leading-tight">
									{site.name}
								</h3>
							</div>
						</a>
					))}
				</div>

				{/* Bottom stat line */}
				<p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
					132 curated sites and counting
				</p>
			</div>
		</section>
	);
}
