import { NEWS } from "@/lib/content";

export function NewsHero() {
	const { hero } = NEWS;

	return (
		<section
			className="bg-[color:var(--color-background-news)]"
			aria-label="News hero"
		>
			<div className="grid md:grid-cols-[1fr_320px] gap-16 mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)] pt-24 pb-16 items-start">
				{/* Headline */}
				<h1
					className="m-0 font-display font-bold leading-[0.9] tracking-[-0.045em] text-[color:var(--color-foreground-news)]"
					style={{ fontSize: "clamp(3.75rem, 2rem + 6.5vw, 7rem)" }}
				>
					{hero.headlineBefore}{" "}
					<em className="serif-accent">{hero.headlineAccent}</em>
					<br />
					{hero.headlineAfter}
				</h1>

				{/* Press column */}
				<div className="text-[13px] font-light leading-[1.5] pt-4">
					{hero.press.map((p, i) => (
						<div
							key={p.label}
							className={[
								"flex justify-between gap-4 py-3.5",
								i === 0
									? "border-t border-[hsl(20_3%_11%/0.2)]"
									: "border-t border-[hsl(20_3%_11%/0.1)]",
							].join(" ")}
						>
							<span className="font-medium text-[color:var(--color-foreground-news)]">
								{p.label}
							</span>
							<a
								href={p.href}
								className="text-[color:var(--color-foreground-news)] no-underline border-b border-[hsl(20_3%_11%/0.2)] pb-px transition-[border-color] duration-[200ms] [transition-timing-function:cubic-bezier(.4,0,.2,1)] hover:border-[hsl(20_3%_11%/0.5)]"
							>
								{p.value}
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
