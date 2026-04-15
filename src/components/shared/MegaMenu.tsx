/*
 * MegaMenu -- Develop hub panel
 *
 * Integration: CSS group-hover pattern (Phase 1).
 * The parent <li> in Nav.tsx carries `group relative` and this panel uses
 * `hidden group-hover:block` + absolute positioning beneath the trigger.
 *
 * A11y note: This is a CSS-hover-only panel. It is not keyboard-accessible
 * (Tab cannot open or navigate it without mouse). A follow-up task should
 * replace the Develop <li> with shadcn's NavigationMenu (Base UI backed)
 * for full keyboard + screen-reader support (aria-expanded, roving tabindex).
 */

const COLUMNS = [
	{
		label: "Learn",
		items: [
			{ title: "Getting started", desc: "Your first WordPress site in 10 minutes", href: "/develop/learn/getting-started/" },
			{ title: "Tutorials", desc: "Workshops, courses, and live sessions", href: "/develop/learn/tutorials/" },
			{ title: "Block editor", desc: "Everything about Gutenberg", href: "/develop/learn/block-editor/" },
		],
	},
	{
		label: "Documentation",
		items: [
			{ title: "User handbook", desc: "Managing content, themes, plugins", href: "/develop/docs/handbook/" },
			{ title: "Developer docs", desc: "Plugin & theme APIs, hooks, blocks", href: "/develop/docs/developer/" },
			{ title: "REST API", desc: "Endpoints and authentication", href: "/develop/docs/rest-api/" },
		],
	},
	{
		label: "Patterns",
		items: [
			{ title: "Block patterns", desc: "Ready-made sections for any site", href: "/develop/patterns/" },
			{ title: "Submit a pattern", desc: "Share with the community", href: "/develop/patterns/submit/" },
		],
	},
	{
		label: "Contribute",
		items: [
			{ title: "Make WordPress", desc: "Core, design, docs, community", href: "/develop/contribute/make/" },
			{ title: "Five for the Future", desc: "Contribute time or resources", href: "/develop/contribute/5ftf/" },
			{ title: "Translate", desc: "WordPress in your language", href: "/develop/contribute/translate/" },
		],
	},
];

export function MegaMenu() {
	return (
		<div
			role="region"
			aria-label="Develop menu"
			className={[
				/* Visibility -- toggled by parent group-hover */
				"hidden group-hover:block",
				/* Positioning -- centered below trigger, 12px gap */
				"absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50",
				/* Width */
				"w-[860px] max-w-[95vw]",
				/* Surface */
				"bg-card border border-border rounded-[16px]",
				/* Padding */
				"py-6 px-7",
				/* Shadow via shadow-card utility (defined in @theme inline) */
				"shadow-card",
				/* Fade in on hover -- opacity only, no translateY (RULES.md) */
				"transition-opacity duration-[200ms]",
				"[transition-timing-function:cubic-bezier(0.215,0.61,0.355,1)]",
				"opacity-0 group-hover:opacity-100",
			].join(" ")}
		>
			<div className="grid grid-cols-4 gap-7">
				{COLUMNS.map(({ label, items }) => (
					<div key={label}>
						<h4 className="eyebrow mb-3">{label}</h4>
						<ul role="list" className="flex flex-col gap-2.5 list-none m-0 p-0">
							{items.map(({ title, desc, href }) => (
								<li key={href}>
									<a
										href={href}
										className="block no-underline group/item"
									>
										<span
											className={[
												"block font-display text-[13.5px] leading-[1.3] text-foreground",
												"transition-colors duration-[150ms]",
												"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
												"group-hover/item:text-primary",
											].join(" ")}
										>
											{title}
										</span>
										<span className="block font-body text-[12px] text-muted-foreground font-light leading-[1.4] mt-0.5">
											{desc}
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
