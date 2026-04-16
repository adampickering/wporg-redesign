// Central content config for the prototype. Keeping copy in one module
// lets us iterate on messaging without touching JSX.

export const HOMEPAGE = {
	hero: {
		eyebrow: "WordPress 6.9 — Available now",
		headlineBefore: "Design, build, publish.",
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
