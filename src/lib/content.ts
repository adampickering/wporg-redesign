// Central content config for the prototype. Keeping copy in one module
// lets us iterate on messaging without touching JSX. Explicit types keep
// every section's shape enforceable as content.ts grows.

type PressLink = {
	label: string;
	value: string;
	href: string;
};

type FeaturedPost = {
	category: string;
	date: string;
	readTime: string;
	title: string;
	excerpt: string;
	href: string;
};

type Cta = { label: string; href: string };

type ArchivePost = {
	date: string;
	category: string;
	title: string;
	href: string;
};

type NewsContent = {
	hero: {
		headlineBefore: string;
		headlineAccent: string;
		headlineAfter: string;
		press: PressLink[];
	};
	featuredPost: FeaturedPost;
	archivePosts: ArchivePost[];
	archiveCategories: string[];
	archiveCta: Cta;
};

export const NEWS: NewsContent = {
	featuredPost: {
		category: "Releases",
		date: "April 14, 2026",
		readTime: "8 min read",
		title: "WordPress 7.0 RC2 is ready for testing",
		excerpt:
			"The second release candidate brings the new collaborative editing layer, expanded block patterns, and the first set of AI-assisted authoring tools behind a feature flag.",
		href: "#",
	},
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
	archivePosts: [
		{ date: "Apr 11, 2026", category: "Community", title: "Celebrating Community at WordCamp Asia 2026", href: "#" },
		{ date: "Apr 07, 2026", category: "Events", title: "How to watch WordCamp Asia 2026 live", href: "#" },
		{ date: "Apr 02, 2026", category: "Events", title: "From AI to open source at WordCamp Asia 2026", href: "#" },
		{ date: "Mar 26, 2026", category: "Releases", title: "WordPress 7.0 Release Candidate 2", href: "#" },
		{ date: "Mar 25, 2026", category: "Development", title: "WP Packages is working the way open source should", href: "#" },
		{ date: "Mar 18, 2026", category: "People", title: "People of WordPress: Sunita Rai", href: "#" },
		{ date: "Mar 10, 2026", category: "Development", title: "A deep look at the new collaborative editing layer", href: "#" },
		{ date: "Mar 04, 2026", category: "Community", title: "Five for the Future: six months in", href: "#" },
		{ date: "Feb 27, 2026", category: "Development", title: "Block patterns directory hits 5,000 submissions", href: "#" },
	],
	archiveCategories: ["All", "Releases", "Community", "Development", "Events", "People"],
	archiveCta: { label: "See all posts →", href: "#" },
};

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

type FeaturedPlugin = {
	name: string;
	author: string;
	pitch: string;
	installs: string;
	rating: number;
	badge: string | null;
};

type Category = {
	slug: string;
	label: string;
	count: string;
};

type PluginGridItem = {
	name: string;
	author: string;
	pitch: string;
	rating: number;
	installs: string;
	testedWith: string;
};

type InnovatorItem = {
	quote: string;
	author: string;
	plugin: string;
};

type PluginsContent = {
	hero: {
		eyebrow: string;
		headlineBefore: string;
		headlineAccent: string;
		headlineAfter: string;
		searchPlaceholder: string;
		trending: string[];
	};
	featuredPlugins: {
		eyebrow: string;
		headline: string;
		items: FeaturedPlugin[];
	};
	categories: Category[];
	pluginGrid: PluginGridItem[];
	innovators: {
		eyebrow: string;
		headline: string;
		items: InnovatorItem[];
	};
	buildCta: {
		eyebrow: string;
		headline: string;
		body: string;
		cta: { label: string; href: string };
	};
};

export const PLUGINS: PluginsContent = {
	hero: {
		eyebrow: "60,000+ plugins",
		headlineBefore: "A marketplace built in the",
		headlineAccent: "open",
		headlineAfter: ".",
		searchPlaceholder: "Search plugins by name, category, or author…",
		trending: ["AI", "SEO", "Analytics", "Forms", "WooCommerce"],
	},
	featuredPlugins: {
		eyebrow: "Updated weekly by humans",
		headline: "Editor\u2019s picks this week",
		items: [
			{
				name: "Twombly",
				author: "Nick Hamze",
				pitch: "A typewriter theme with a publisher's soul.",
				installs: "2,400+",
				rating: 4.9,
				badge: "Editor\u2019s pick",
			},
			{
				name: "Ollie",
				author: "Mike McAlister",
				pitch: "Professional block patterns for modern sites.",
				installs: "18,000+",
				rating: 4.8,
				badge: "New",
			},
			{
				name: "Block Visibility",
				author: "Nick Diego",
				pitch: "Show or hide any block by role, date, or logic.",
				installs: "12,500+",
				rating: 4.9,
				badge: null,
			},
		],
	},
	categories: [
		{ slug: "popular", label: "Popular", count: "1.2K" },
		{ slug: "blocks", label: "Blocks", count: "840" },
		{ slug: "seo", label: "SEO", count: "620" },
		{ slug: "commerce", label: "Commerce", count: "1.5K" },
		{ slug: "security", label: "Security", count: "340" },
		{ slug: "performance", label: "Performance", count: "220" },
		{ slug: "ai", label: "AI", count: "180" },
		{ slug: "forms", label: "Forms", count: "560" },
		{ slug: "analytics", label: "Analytics", count: "400" },
	],
	pluginGrid: [
		{ name: "Yoast SEO", author: "Team Yoast", pitch: "The #1 WordPress SEO plugin, trusted by millions.", rating: 4.8, installs: "5M+", testedWith: "7.0" },
		{ name: "WooCommerce", author: "Automattic", pitch: "Turn your WordPress site into a professional online store.", rating: 4.6, installs: "6M+", testedWith: "7.0" },
		{ name: "Contact Form 7", author: "Takayuki Miyoshi", pitch: "Simple but flexible contact form plugin.", rating: 4.1, installs: "5M+", testedWith: "7.0" },
		{ name: "Jetpack", author: "Automattic", pitch: "Security, performance, and marketing tools in one plugin.", rating: 4.3, installs: "5M+", testedWith: "7.0" },
		{ name: "Elementor", author: "Elementor Team", pitch: "The leading website builder for WordPress.", rating: 4.6, installs: "5M+", testedWith: "7.0" },
		{ name: "Akismet", author: "Automattic", pitch: "Spam protection powered by millions of sites.", rating: 4.7, installs: "5M+", testedWith: "7.0" },
		{ name: "WPForms", author: "WPForms", pitch: "Drag-and-drop form builder — no code required.", rating: 4.9, installs: "4M+", testedWith: "7.0" },
		{ name: "WP Rocket", author: "WP Media", pitch: "The most powerful caching plugin for WordPress.", rating: 4.9, installs: "2M+", testedWith: "7.0" },
		{ name: "All-in-One SEO", author: "AIOSEO", pitch: "Powerful SEO toolkit for WordPress beginners and pros.", rating: 4.7, installs: "3M+", testedWith: "7.0" },
	],
	innovators: {
		eyebrow: "Innovator spotlight",
		headline: "Built by people who push the platform forward.",
		items: [
			{ quote: "Themes should have character, not just features.", author: "Nick Hamze", plugin: "Twombly" },
			{ quote: "Block patterns should feel like real design, not templates.", author: "Mike McAlister", plugin: "Ollie" },
			{ quote: "If a block can be hidden, it should be — cleanly.", author: "Nick Diego", plugin: "Block Visibility" },
		],
	},
	buildCta: {
		eyebrow: "For developers",
		headline: "Build a plugin the rest of the web will use.",
		body: "Plugin APIs, block APIs, REST endpoints, hooks, filters — everything you need to extend WordPress.",
		cta: { label: "Read the developer handbook \u2192", href: "/develop/docs/developer/" },
	},
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
