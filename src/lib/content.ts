// Central content config for the prototype. Keeping copy in one module
// lets us iterate on messaging without touching JSX. Explicit types keep
// every section's shape enforceable as content.ts grows.

type Cta = { label: string; href: string };
type Stat = { label: string; value: string };

type HeroSection = {
	eyebrow: string;
	headlineBefore: string;
	headlineBridge: string;
	headlineAccent: string;
	headlineAfter: string;
	subtext: string;
	primaryCta: Cta;
	secondaryCta: Cta;
	stats: Stat[];
};

type Pillar = {
	icon: "Palette" | "Cube" | "Broadcast";
	title: string;
	body: string;
	link: Cta;
};

type ShowcaseLogo = {
	name: string;
};

type ShowcaseSite = {
	name: string;
	featured?: boolean;
};

type HomepageContent = {
	hero: HeroSection;
	pillars: {
		eyebrow: string;
		headline: string;
		items: Pillar[];
	};
	showcase: {
		eyebrow: string;
		headline: string;
		logos: ShowcaseLogo[];
	};
	showcaseBento: {
		eyebrow: string;
		headline: string;
		sites: ShowcaseSite[];
		cta: Cta;
	};
};

export const HOMEPAGE: HomepageContent = {
	pillars: {
		eyebrow: "One platform",
		headline: "Design. Build. Publish.",
		items: [
			{
				icon: "Palette",
				title: "Design",
				body: "Create any website with flexible design tools and the power of blocks. Start with a blank canvas or choose a theme.",
				link: { label: "Explore themes →", href: "/themes/" },
			},
			{
				icon: "Cube",
				title: "Build",
				body: "See how your site looks in real time as you add, edit, and rearrange content — with intuitive editing and integrated features.",
				link: { label: "Try the Block Editor →", href: "/playground/" },
			},
			{
				icon: "Broadcast",
				title: "Publish",
				body: "Make your site do whatever you need it to. A newsletter, a store, an analytics dashboard — you're in control.",
				link: { label: "Browse plugins →", href: "/plugins/" },
			},
		],
	},
	showcase: {
		eyebrow: "Who builds on WordPress",
		headline: "Every kind of story, published here.",
		logos: [
			{ name: "Rolling Stone" },
			{ name: "TIME" },
			{ name: "NASA" },
			{ name: "Microsoft" },
			{ name: "Harvard" },
			{ name: "TechCrunch" },
		],
	},
	showcaseBento: {
		eyebrow: "Showcase",
		headline: "A universe of possibilities, all built on WordPress.",
		sites: [
			{ name: "The New Yorker", featured: true },
			{ name: "BBC America" },
			{ name: "TechCrunch" },
			{ name: "Variety" },
			{ name: "Sony Music" },
		],
		cta: { label: "Explore the Showcase →", href: "/showcase/" },
	},
	hero: {
		eyebrow: "WordPress 6.9 — Available now",
		headlineBefore: "Design, build, publish.",
		headlineBridge: "Still the",
		headlineAccent: "open",
		headlineAfter: " web.",
		subtext:
			"The open-source platform powering 43% of the internet. Free forever, built by a global community, yours to shape.",
		primaryCta: { label: "Get WordPress", href: "/download/" },
		secondaryCta: { label: "Try in your browser", href: "/playground/" },
		stats: [
			{ label: "of the web", value: "43%" },
			{ label: "plugins", value: "60K+" },
			{ label: "themes", value: "13K+" },
			{ label: "contributor teams", value: "200+" },
		],
	},
};
