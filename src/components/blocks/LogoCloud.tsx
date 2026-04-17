// Logo cloud — real brand logos from wordpress.org, grayscale with hover restore.

import { HOMEPAGE } from "@/lib/content";

export function LogoCloud() {
	const { showcase } = HOMEPAGE;

	return (
		<section className="py-[clamp(80px,8vw,128px)]">
			<div className="mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				{/* Section heading */}
				<div className="text-center">
					<p className="eyebrow mb-4">{showcase.eyebrow}</p>
					<h2 className="font-display text-balance">
						{showcase.headline}
					</h2>
				</div>

				{/* Logo row — real brand logos, grayscale by default */}
				<div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-10">
					{showcase.logos.map((logo) => (
						<img
							key={logo.name}
							src={logo.logo}
							alt={`${logo.name} logo`}
							className="h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
