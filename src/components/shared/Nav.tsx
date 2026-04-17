import { WpWordmark } from "@/components/shared/WpWordmark";
import { MegaMenu } from "@/components/shared/MegaMenu";
import { SearchTrigger } from "@/components/shared/SearchTrigger";

export type NavActiveSlug = "showcase" | "plugins" | "themes" | "develop" | "news";

type NavProps = {
	active?: NavActiveSlug;
};

const PRIMARY_LINKS: { label: string; slug: NavActiveSlug; href: string; caret?: true }[] = [
	{ label: "Showcase", slug: "showcase", href: "/showcase/" },
	{ label: "Plugins", slug: "plugins", href: "/plugins/" },
	{ label: "Themes", slug: "themes", href: "/themes/" },
	{ label: "Develop", slug: "develop", href: "/develop/", caret: true },
	{ label: "News", slug: "news", href: "/news/" },
];

export function Nav({ active }: NavProps) {
	return (
		<header role="banner" className="w-full bg-transparent">
			<nav
				aria-label="Primary"
				className="max-w-[1280px] mx-auto px-8 py-[22px] grid grid-cols-[auto_1fr_auto] items-center gap-8"
			>
				{/* Left: Brand — full WordPress wordmark, dark on light bg */}
				<a
					href="/"
					aria-label="WordPress home"
					className="flex items-center text-foreground no-underline"
				>
					<WpWordmark className="h-7 w-auto text-foreground" />
				</a>

				{/* Center: Primary links */}
				<ul
					role="list"
					className="flex items-center gap-[30px] list-none m-0 p-0"
				>
					{PRIMARY_LINKS.map(({ label, slug, href, caret }) => {
						const isActive = active === slug;
						return (
							<li key={slug} className={caret ? "relative group" : undefined}>
								<a
									href={href}
									aria-haspopup={caret ? "true" : undefined}
									className={[
										"inline-flex items-center gap-1 font-display text-[14px] tracking-[-0.005em] no-underline",
										"transition-colors duration-[150ms]",
										"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
										isActive
											? "text-foreground font-medium"
											: "text-muted-foreground font-normal hover:text-foreground",
									].join(" ")}
								>
									{label}
									{caret && (
										<span aria-hidden="true" className="text-[12px] leading-none opacity-70">
											▾
										</span>
									)}
								</a>
								{caret && <MegaMenu />}
							</li>
						);
					})}
				</ul>

				{/* Right: Actions */}
				<div className="flex items-center gap-3">
					<SearchTrigger />

					<a
						href="/sign-in/"
						className="font-display text-[14px] tracking-[-0.005em] text-muted-foreground no-underline hover:text-foreground transition-colors duration-[150ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] px-1"
					>
						Sign in
					</a>

					<a
						href="/download/"
						className={[
							"inline-flex items-center px-[18px] py-[11px]",
							"rounded-pill bg-foreground text-[color:var(--color-background)]",
							"font-display text-[13px] font-medium tracking-[-0.005em]",
							"no-underline leading-none",
							"transition-[transform,box-shadow] duration-[75ms]",
							// Fast ease-out for press: snappy shrink, not the Material slow-in curve
							"[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
							"active:scale-[0.96]",
							"shadow-button",
						].join(" ")}
					>
						Get WordPress
					</a>
				</div>
			</nav>
		</header>
	);
}
