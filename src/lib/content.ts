// Central content config for the prototype. Keeping copy in one module
// lets us iterate on messaging without touching JSX. Explicit types keep
// every section's shape enforceable as content.ts grows.

type PressLink = {
	label: string;
	value: string;
	href: string;
};

type NewsContent = {
	hero: {
		headlineBefore: string;
		headlineAccent: string;
		headlineAfter: string;
		press: PressLink[];
	};
};

export const NEWS: NewsContent = {
	hero: {
		headlineBefore: "The",
		headlineAccent: "open",
		headlineAfter: "newsroom.",
		press: [
			{ label: "Press inquiries", value: "press@wp.org", href: "mailto:press@wp.org" },
			{ label: "Community events", value: "events@wp.org", href: "mailto:events@wp.org" },
			{ label: "Brand assets", value: "Download pack ↓", href: "#" },
			{ label: "RSS feed", value: "Subscribe", href: "/news/feed.xml" },
		],
	},
};

type Cta = { label: string; href: string };
type Stat = { label: string; value: string };

type NewsTeaser = {
	category: string;
	title: string;
	date: string;
	href: string;
};

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

type StatItem = {
	value: string;
	label: string;
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
	stats: {
		eyebrow: string;
		items: StatItem[];
	};
	latestNews: {
		eyebrow: string;
		headline: string;
		items: NewsTeaser[];
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
	stats: {
		eyebrow: "The scale of WordPress",
		items: [
			{ value: "43%", label: "of the entire internet" },
			{ value: "60,000+", label: "plugins available" },
			{ value: "13,000+", label: "themes to choose from" },
			{ value: "200+", label: "contributor teams worldwide" },
		],
	},
	latestNews: {
		eyebrow: "Latest from the project",
		headline: "News",
		items: [
			{ category: "Community", title: "Celebrating Community at WordCamp Asia 2026", date: "Apr 11, 2026", href: "/news/" },
			{ category: "Events", title: "How to watch WordCamp Asia 2026 live", date: "Apr 7, 2026", href: "/news/" },
			{ category: "Releases", title: "WordPress 7.0 Release Candidate 2", date: "Mar 26, 2026", href: "/news/" },
		],
		cta: { label: "More news →", href: "/news/" },
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
