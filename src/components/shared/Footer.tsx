import { WpMark } from "@/components/shared/WpMark";

// Computed at module-eval time (build time for static export) so every
// render of <Footer /> uses the same value — no hydration mismatch risk.
const CURRENT_YEAR = new Date().getFullYear();

const links = [
	{
		group: "WordPress",
		items: [
			{ title: "Showcase", href: "/showcase/" },
			{ title: "Plugins", href: "/plugins/" },
			{ title: "Themes", href: "/themes/" },
			{ title: "Patterns", href: "/develop/patterns/" },
			{ title: "Learn", href: "/develop/learn/" },
			{ title: "News", href: "/news/" },
			{ title: "About", href: "/about/" },
		],
	},
	{
		group: "Community",
		items: [
			{ title: "Make WordPress", href: "/develop/contribute/make/" },
			{ title: "Five for the Future", href: "/develop/contribute/5ftf/" },
			{ title: "Events", href: "https://events.wordpress.org/" },
			{ title: "Hosting", href: "/hosting/" },
			{ title: "Enterprise", href: "/enterprise/" },
		],
	},
	{
		group: "Resources",
		items: [
			{ title: "Documentation", href: "/develop/docs/" },
			{ title: "Developer handbook", href: "/develop/docs/developer/" },
			{ title: "REST API", href: "/develop/docs/rest-api/" },
			{ title: "Playground", href: "https://playground.wordpress.net/" },
			{ title: "Support forums", href: "https://wordpress.org/support/" },
		],
	},
	{
		group: "Legal",
		items: [
			{ title: "Trademark policy", href: "https://wordpressfoundation.org/trademark-policy/" },
			{ title: "Privacy", href: "/about/privacy/" },
			{ title: "License (GPLv2)", href: "/about/license/" },
			{ title: "Accessibility", href: "/about/accessibility/" },
		],
	},
];

export function Footer() {
	return (
		<footer className="bg-[color:var(--color-dark-slab)]">
			<div className="mx-auto max-w-[1280px] px-8 py-[96px]">
				<div className="grid gap-12 md:grid-cols-5">
					{/* Logo + wordmark */}
					<div className="md:col-span-2">
						<a
							href="/"
							aria-label="WordPress home"
							className="flex items-center gap-2.5 no-underline w-fit"
						>
							<WpMark className="w-7 h-7 text-white" />
							<span className="font-display font-semibold text-[17px] tracking-[-0.02em] leading-none text-white">
								WordPress
							</span>
						</a>
					</div>

					{/* Four sitemap columns */}
					<nav aria-label="Footer" className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
						{links.map((col) => (
							<div key={col.group} className="text-sm">
								<h2 className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 mb-3">
									{col.group}
								</h2>
								<ul role="list" className="list-none m-0 p-0 space-y-3">
									{col.items.map((item) => (
										<li key={item.title}>
											<a
												href={item.href}
												className="text-white/80 hover:text-white block transition-colors duration-[150ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] no-underline"
											>
												{item.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				{/* Bottom row */}
				<div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
					<span className="text-white/60 text-sm order-last md:order-first">
						© {CURRENT_YEAR} WordPress Foundation
					</span>
					{/* Language hint is inert in Phase 1 — a future task will turn
					    it into a real switcher. Hidden from AT until then. */}
					<span
						aria-hidden="true"
						className="text-white/60 text-sm order-first md:order-last font-mono text-[11px] tracking-[0.06em]"
					>
						English (US)
					</span>
				</div>
			</div>
		</footer>
	);
}
