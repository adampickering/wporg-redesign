// Homepage hero — split layout inspired by premium SaaS patterns:
// headline left, description + CTAs right, massive product mockup below.

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HOMEPAGE } from "@/lib/content";

export function HomepageHero() {
	const shouldReduceMotion = useReducedMotion();
	const { hero } = HOMEPAGE;

	return (
		<section className="relative overflow-x-clip z-10">
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

			<div className="relative mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)] pt-[clamp(80px,8vw,140px)] pb-[clamp(80px,10vw,160px)]">
				{/* ── Split header: headline left, description + CTAs right ── */}
				<div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-20 items-start">
					{/* Left: headline */}
					<div>
						<h1
							className="font-display text-[clamp(3.25rem,2rem+5vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-foreground"
						>
							{hero.headlineBefore}
							<br />
							{hero.headlineBridge}{" "}
							<em className="serif-accent">{hero.headlineAccent}</em>
							{hero.headlineAfter}
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
				<motion.div
					className="relative mt-16"
					initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40, scale: 0.97 }}
					animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.9, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
				>
					{/* Colorful gradient blur behind the browser frame */}
					<div
						className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[130%] rounded-[300px] blur-[80px]"
						style={{
							backgroundImage: "linear-gradient(90deg, hsl(196 100% 64% / 0.45) 0%, hsl(340 60% 70% / 0.35) 38%, hsl(247 100% 70% / 0.35) 71%, hsl(176 64% 57% / 0.3) 100%)",
						}}
					/>
				<motion.div
					className="relative rounded-t-[20px] overflow-hidden"
					style={{
						boxShadow: [
							"0 0 0 0.5px rgba(0, 0, 0, 0.08)",
							"0 4.123px 5.507px 0 rgba(0, 0, 0, 0.02)",
							"0 9.909px 13.234px 0 rgba(0, 0, 0, 0.03)",
							"0 18.657px 24.918px 0 rgba(0, 0, 0, 0.04)",
							"0 33.281px 44.449px 0 rgba(0, 0, 0, 0.04)",
							"0 62.249px 83.137px 0 rgba(0, 0, 0, 0.05)",
							"0 149px 199px 0 rgba(0, 0, 0, 0.07)",
						].join(", "),
						background: "hsl(0 0% 92% / 0.7)",
						backdropFilter: "blur(20px)",
					}}
					animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
					transition={shouldReduceMotion ? undefined : {
						y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
					}}
				>
					{/* Browser chrome */}
					<div className="bg-[hsl(0_0%_96%)] rounded-t-[19px] px-5 py-4">
						<div className="flex items-center gap-3">
							<div className="flex gap-2 shrink-0">
								<div className="w-3 h-3 rounded-full bg-black/10" />
								<div className="w-3 h-3 rounded-full bg-black/10" />
								<div className="w-3 h-3 rounded-full bg-black/10" />
							</div>
							<div className="flex-1 mx-6 h-8 rounded-lg bg-black/[0.04]" />
						</div>
					</div>
					{/* Dashboard SVG */}
					<img
						src="/wporg-redesign/dashboard-hero.svg"
						alt="WordPress dashboard"
						className="w-full h-auto block"
					/>
				</motion.div>
				{/* close gradient blur wrapper */}
				</motion.div>
			</div>
		</section>
	);
}
