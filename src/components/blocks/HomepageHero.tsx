// Homepage hero — split layout inspired by premium SaaS patterns:
// headline left, description + CTAs right, massive product mockup below.

import { HOMEPAGE } from "@/lib/content";

export function HomepageHero() {
	const { hero } = HOMEPAGE;

	return (
		<section className="relative overflow-hidden">
			{/* Warm ambient gradient wash */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: [
						"radial-gradient(ellipse 80% 60% at 20% 40%, hsl(340 40% 94% / 0.6), transparent)",
						"radial-gradient(ellipse 60% 50% at 80% 30%, hsl(30 50% 95% / 0.5), transparent)",
						"radial-gradient(ellipse 50% 40% at 50% 80%, hsl(220 40% 96% / 0.4), transparent)",
					].join(", "),
				}}
			/>

			<div className="relative mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)] pt-[clamp(80px,8vw,140px)] pb-16">
				{/* ── Split header: headline left, description + CTAs right ── */}
				<div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
					{/* Left: headline */}
					<div>
						<h1
							className="font-display text-[clamp(3rem,2rem+4vw,4.5rem)] font-medium leading-[1] tracking-[-0.02em] text-foreground"
						>
							{hero.headlineBefore}
							<br />
							{hero.headlineBridge}{" "}
							<em className="serif-accent">{hero.headlineAccent}</em>
						</h1>
					</div>

					{/* Right: description + CTAs */}
					<div className="md:pt-4">
						<p className="text-[16px] leading-[1.6] text-muted-foreground font-light max-w-[38ch]">
							{hero.subtext}
						</p>
						<div className="mt-8 flex items-center gap-3 flex-wrap">
							<a
								href={hero.primaryCta.href}
								className={[
									"inline-flex items-center justify-center",
									"h-11 px-5 rounded-[8px]",
									"bg-foreground text-background",
									"font-medium text-[14px] no-underline whitespace-nowrap",
									"shadow-button",
									"transition-[box-shadow,transform] duration-[200ms]",
									"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
									"active:scale-[0.97] active:[transition-duration:75ms] active:[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
								].join(" ")}
							>
								{hero.primaryCta.label}
							</a>
							<a
								href={hero.secondaryCta.href}
								className={[
									"inline-flex items-center justify-center",
									"h-11 px-5 rounded-[8px]",
									"bg-card border border-border",
									"text-foreground",
									"font-medium text-[14px] no-underline whitespace-nowrap",
									"shadow-card",
									"transition-[box-shadow,border-color,transform] duration-[200ms]",
									"[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
									"hover:border-foreground/20",
									"active:scale-[0.97] active:[transition-duration:75ms] active:[transition-timing-function:cubic-bezier(0,0,0.2,1)]",
								].join(" ")}
							>
								{hero.secondaryCta.label}
							</a>
						</div>
					</div>
				</div>

				{/* ── Massive product mockup ──────────────────────────────── */}
				<div className="relative mt-16">
					{/* Colorful gradient blur behind the browser frame */}
					<div
						className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[130%] rounded-[300px] blur-[80px]"
						style={{
							backgroundImage: "linear-gradient(90deg, hsl(196 100% 64% / 0.45) 0%, hsl(340 60% 70% / 0.35) 38%, hsl(247 100% 70% / 0.35) 71%, hsl(176 64% 57% / 0.3) 100%)",
						}}
					/>
				<div
					className="relative rounded-[20px] overflow-hidden"
					style={{
						boxShadow: [
							"0 0 0 0.5px hsl(233 20% 13% / 0.08)",
							"0 4px 6px 0 hsl(233 20% 13% / 0.02)",
							"0 10px 13px 0 hsl(233 20% 13% / 0.03)",
							"0 19px 25px 0 hsl(233 20% 13% / 0.04)",
							"0 33px 44px 0 hsl(233 20% 13% / 0.04)",
							"0 62px 83px 0 hsl(233 20% 13% / 0.05)",
							"0 149px 199px 0 hsl(233 20% 13% / 0.07)",
						].join(", "),
						background: "hsl(0 0% 92% / 0.7)",
						backdropFilter: "blur(20px)",
					}}
				>
					<div className="bg-dark-slab rounded-t-[19px] p-3">
						{/* Window chrome dots */}
						<div className="flex gap-1.5 mb-3 px-1">
							<div className="w-3 h-3 rounded-full bg-white/10" />
							<div className="w-3 h-3 rounded-full bg-white/10" />
							<div className="w-3 h-3 rounded-full bg-white/10" />
						</div>
						<div className="bg-dark-surface rounded-[12px] min-h-[420px] grid grid-cols-[200px_1fr] overflow-hidden">
							{/* Sidebar */}
							<aside className="bg-[hsl(233_20%_8%)] p-5 border-r border-dark-border space-y-4">
								<div className="h-6 rounded-[6px] w-3/4 bg-white/5" />
								<div className="space-y-2.5 pt-4">
									<div className="h-2.5 rounded-full w-3/5 bg-white/8" />
									<div className="h-2.5 rounded-full w-full bg-accent-cyan/30 border border-accent-cyan/20" />
									<div className="h-2.5 rounded-full w-1/2 bg-white/8" />
									<div className="h-2.5 rounded-full w-4/5 bg-white/8" />
									<div className="h-2.5 rounded-full w-2/5 bg-white/8" />
								</div>
								<div className="space-y-2.5 pt-6">
									<div className="h-2 rounded-full w-2/3 bg-white/5" />
									<div className="h-2.5 rounded-full w-3/4 bg-white/8" />
									<div className="h-2.5 rounded-full w-1/2 bg-white/8" />
									<div className="h-2.5 rounded-full w-5/6 bg-white/8" />
								</div>
							</aside>
							{/* Main content area */}
							<div className="p-8 space-y-6">
								{/* Top bar */}
								<div className="flex items-center gap-3">
									<div className="h-3 rounded-full w-24 bg-white/10" />
									<div className="h-3 rounded-full w-16 bg-white/6" />
									<div className="ml-auto h-3 rounded-full w-20 bg-white/6" />
								</div>
								{/* Content blocks */}
								<div className="space-y-5 pt-2">
									<div className="h-4 rounded-full w-2/3 bg-white/10" />
									<div className="h-3 rounded-full w-1/2 bg-gradient-to-r from-accent-purple/40 to-accent-cyan/40" />
									<div className="space-y-2">
										<div className="h-2.5 rounded-full w-full bg-white/6" />
										<div className="h-2.5 rounded-full w-5/6 bg-white/6" />
										<div className="h-2.5 rounded-full w-3/4 bg-white/6" />
									</div>
								</div>
								{/* Cards row */}
								<div className="grid grid-cols-3 gap-3 pt-4">
									{[0, 1, 2].map((i) => (
										<div key={i} className="rounded-[10px] bg-white/4 border border-white/6 p-4 space-y-3">
											<div className="h-3 rounded-full w-3/4 bg-white/10" />
											<div className="h-2 rounded-full w-full bg-white/5" />
											<div className="h-2 rounded-full w-2/3 bg-white/5" />
											<div className="h-8 rounded-[6px] mt-2 bg-white/4" />
										</div>
									))}
								</div>
								{/* Bottom row */}
								<div className="flex gap-3 pt-2">
									<div className="h-10 rounded-[8px] flex-1 bg-white/4 border border-white/6" />
									<div className="h-10 rounded-[8px] w-24 bg-accent-cyan/20 border border-accent-cyan/15" />
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* close gradient blur wrapper */}
				</div>
			</div>
		</section>
	);
}
