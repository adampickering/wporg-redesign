// WordPress 7.0 feature highlight bento — faithfully recreated from Figma
// with CSS-rendered UI elements, real text, and images.

// ── Individual cell components ──────────────────────────────────────────

function CellLabel({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<p className={`font-display font-medium text-[18px] tracking-[-0.36px] text-[#1E1E1E] leading-snug ${className ?? ""}`}>
			{children}
		</p>
	);
}

function IconBlock() {
	const icons = ["⚙", "⊞", "📅", "📷", "🎬", "🛒", "⊟", "⚠", "📊", "💬", "▣", "🖥", "⬇", "☰", "✉"];
	return (
		<div className="p-7 h-full flex flex-col">
			<CellLabel>Icon block</CellLabel>
			<div className="mt-5 grid grid-cols-5 gap-4">
				{icons.map((icon, i) => (
					<div
						key={i}
						className={`w-8 h-8 flex items-center justify-center text-[16px] text-[#1E1E1E] ${i >= 5 ? (i >= 10 ? "opacity-10 blur-[1.5px]" : "opacity-30 blur-[0.5px]") : ""}`}
					>
						{icon}
					</div>
				))}
			</div>
		</div>
	);
}

function HeroCell() {
	return (
		<div className="h-full relative overflow-hidden">
			<img src="/wporg-redesign/features/hero-7.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
			<div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
			<div className="relative p-7 flex items-start gap-3">
				<svg viewBox="0 0 237 237" fill="currentColor" className="w-10 h-10 text-white/90">
					<path d="M118.644 0C53.119 0 0 53.119 0 118.644s53.119 118.644 118.644 118.644 118.644-53.119 118.644-118.644S184.169 0 118.644 0m0 7.119c15.059 0 29.664 2.947 43.409 8.761a111.5 111.5 0 0 1 18.941 10.281 112.3 112.3 0 0 1 16.51 13.623 112.3 112.3 0 0 1 13.623 16.51 111.5 111.5 0 0 1 10.281 18.941c5.814 13.745 8.761 28.35 8.761 43.409s-2.947 29.664-8.761 43.409a111.5 111.5 0 0 1-10.281 18.941 112.3 112.3 0 0 1-13.623 16.51 112.3 112.3 0 0 1-16.51 13.623 111.5 111.5 0 0 1-18.941 10.281c-13.745 5.814-28.35 8.761-43.409 8.761s-29.664-2.947-43.408-8.761a111.5 111.5 0 0 1-18.942-10.281 112.3 112.3 0 0 1-16.51-13.623 112.3 112.3 0 0 1-13.623-16.51 111.6 111.6 0 0 1-10.281-18.941c-5.814-13.745-8.761-28.35-8.761-43.409s2.947-29.664 8.761-43.409a111.6 111.6 0 0 1 10.281-18.941 112.3 112.3 0 0 1 13.623-16.51 112.3 112.3 0 0 1 16.51-13.623A111.5 111.5 0 0 1 75.236 15.88c13.744-5.814 28.349-8.761 43.408-8.761" />
					<path d="M205.406 71.21a76 76 0 0 1 .665 10.166c0 10.029-1.879 21.307-7.521 35.411l-30.197 87.31c29.394-17.137 49.161-48.982 49.161-85.456 0-17.19-4.392-33.35-12.108-47.431m-85.025 56.079-29.67 86.197a98.8 98.8 0 0 0 27.933 4.028 98.7 98.7 0 0 0 32.835-5.605 9 9 0 0 1-.71-1.363zm65.009-13.635c0-12.223-4.391-20.682-8.151-27.266-5.012-8.148-9.712-15.041-9.712-23.19 0-9.086 6.891-17.546 16.603-17.546.439 0 .854.053 1.28.08-17.59-16.117-41.026-25.958-66.766-25.958-34.543 0-64.93 17.724-82.61 44.562 2.323.073 4.51.12 6.365.12 10.339 0 26.35-1.257 26.35-1.257 5.328-.312 5.958 7.518.633 8.148 0 0-5.358.627-11.315.939L94.07 179.38l21.64-64.89-15.403-42.204c-5.327-.312-10.37-.94-10.37-.94-5.33-.314-4.705-8.46.627-8.147 0 0 16.324 1.257 26.039 1.257 10.339 0 26.354-1.257 26.354-1.257 5.329-.312 5.956 7.518.629 8.148 0 0-5.363.627-11.314.939l35.73 106.279 10.2-32.32c4.531-14.124 7.188-24.131 7.188-32.591m-165.616 4.987c0 39.133 22.74 72.954 55.725 88.978L28.335 78.404a98.5 98.5 0 0 0-8.561 40.237" />
				</svg>
				<span className="font-display text-[56px] font-bold text-white leading-none tracking-[-2px]">7.0</span>
			</div>
		</div>
	);
}

function CollabCell() {
	return (
		<div className="p-7 h-full flex flex-col justify-center relative">
			{/* Avatars */}
			<div className="absolute top-5 left-14 w-11 h-11 rounded-full border-[3px] border-[#BC00AD] bg-white overflow-hidden">
				<div className="w-full h-full rounded-full bg-gradient-to-br from-purple-300 to-pink-200" />
			</div>
			<div className="absolute top-12 right-[30%] w-11 h-11 rounded-full border-[3px] border-[#317268] bg-white overflow-hidden">
				<div className="w-full h-full rounded-full bg-gradient-to-br from-teal-300 to-green-200" />
			</div>
			{/* Cursor lines */}
			<div className="absolute top-[76px] left-[70px] w-1 h-14 bg-[#BC00AD] rounded-full" />
			<div className="absolute top-[80px] right-[29%] w-1 h-14 bg-[#317268] rounded-full" />

			<div className="relative mt-8">
				<p className="font-display text-[clamp(1.75rem,3vw,3.25rem)] font-semibold text-[#1E1E1E] leading-[1.3] tracking-[-1px]">
					<span className="bg-[rgba(247,192,64,0.55)] px-1 rounded-sm">Early access</span>
				</p>
				<p className="font-display text-[clamp(1.75rem,3vw,3.25rem)] font-semibold text-[#1E1E1E] leading-[1.3] tracking-[-1px]">
					Real time collaboration
				</p>
			</div>
		</div>
	);
}

function RevisionsCell() {
	return (
		<div className="p-7 h-full flex flex-col">
			<CellLabel>Compare revisions visually</CellLabel>
			{/* Timeline slider */}
			<div className="mt-8 relative">
				<div className="h-1 bg-black/10 rounded-full">
					<div className="h-1 bg-[#1E1E1E] rounded-full w-3/5" />
				</div>
				<div className="absolute top-[-6px] left-[58%] w-4 h-4 rounded-full bg-[#1E1E1E] shadow-sm" />
				<div className="absolute top-[-30px] left-[38%] bg-[#1E1E1E] text-white text-[10px] px-2.5 py-1 rounded-md font-mono whitespace-nowrap">
					November 16, 2025
				</div>
			</div>
			{/* Two overlapping page previews */}
			<div className="mt-10 relative flex-1 min-h-0">
				<div className="absolute left-0 top-0 w-[80%] bg-white rounded shadow-sm border border-black/8 p-2.5 h-[90%]">
					<div className="border-b border-black/10 pb-1.5 mb-2">
						<span className="font-display font-bold text-[13px] tracking-[-0.3px] border-2 border-[#E3C651] px-0.5">Narratives</span>
					</div>
					<div className="flex gap-2">
						<div className="w-10 h-10 bg-[#2C9D77] rounded-sm overflow-hidden">
							<img src="/wporg-redesign/features/nature-1.jpg" alt="" className="w-full h-full object-cover" />
						</div>
						<div className="flex-1 space-y-1 pt-1">
							<div className="h-1 bg-black/8 rounded w-3/4" />
							<div className="h-1 bg-black/5 rounded w-1/2" />
						</div>
					</div>
				</div>
				<div className="absolute left-[22%] top-5 w-[80%] bg-white rounded shadow-lg border border-black/8 p-2.5 h-[90%]">
					<div className="border-b border-black/10 pb-1.5 mb-2">
						<span className="font-display font-bold text-[13px] tracking-[-0.3px] border-2 border-[#E3C651] px-0.5">Stories</span>
					</div>
					<div className="w-full h-20 bg-[#FE5D42] rounded-sm overflow-hidden">
						<img src="/wporg-redesign/features/landscape-red.jpg" alt="" className="w-full h-full object-cover" />
					</div>
				</div>
			</div>
		</div>
	);
}

function SmallCell({ icon, label, accentColor }: { icon: string; label: string; accentColor?: string }) {
	return (
		<div className="px-6 h-full flex items-center gap-3">
			{icon && <span className="text-[18px] shrink-0 opacity-50">{icon}</span>}
			{accentColor ? (
				<p className="font-display font-medium text-[17px] tracking-[-0.34px] text-[#1E1E1E] leading-snug">
					<span style={{ color: accentColor }}>{label.split(" ").slice(0, 2).join(" ")}</span>{" "}
					{label.split(" ").slice(2).join(" ")}
				</p>
			) : (
				<CellLabel className="!text-[17px]">{label}</CellLabel>
			)}
		</div>
	);
}

function PatternsCell() {
	return (
		<div className="h-full flex flex-col">
			<div className="p-7 pb-3">
				<CellLabel>Simpler editing experience with patterns</CellLabel>
				{/* Toolbar */}
				<div className="mt-3 inline-flex items-center bg-white border border-[#1E1E1E] rounded-sm text-[11px]">
					<span className="px-2 py-1.5 opacity-50">👁</span>
					<span className="w-px h-6 bg-[#1E1E1E]" />
					<span className="px-2 py-1.5 font-medium">Edit pattern</span>
					<span className="w-px h-6 bg-[#1E1E1E]" />
					<span className="px-2 py-1.5 opacity-50">📋</span>
					<span className="w-px h-6 bg-[#1E1E1E]" />
					<span className="px-2 py-1.5 opacity-50">⋮</span>
				</div>
			</div>
			{/* Pattern preview */}
			<div className="mx-5 mb-3 flex-1 border-[2px] border-[#3858E9] rounded-sm overflow-hidden">
				<p className="font-display font-bold text-[22px] tracking-[-0.5px] text-[#1E1E1E] px-3 pt-2">Sunshade View</p>
				<div className="mt-1 h-full bg-[#FE5D42] overflow-hidden">
					<img src="/wporg-redesign/features/nature-2.jpg" alt="" className="w-full h-full object-cover" />
				</div>
			</div>
		</div>
	);
}

function BreadcrumbCell() {
	return (
		<div className="p-6 h-full flex flex-col justify-center">
			{/* Toolbar */}
			<div className="inline-flex items-center bg-white border border-[#1E1E1E] rounded-sm text-[11px] self-start">
				<span className="px-2 py-1.5 opacity-60">⋯</span>
				<span className="w-px h-6 bg-[#1E1E1E]" />
				<span className="px-1 py-1.5 opacity-30 text-[10px]">▲▼</span>
				<span className="w-px h-6 bg-[#1E1E1E]" />
				<span className="px-2 py-1.5 opacity-60">≡</span>
				<span className="w-px h-6 bg-[#1E1E1E]" />
				<span className="px-2 py-1.5 opacity-60">⋮</span>
			</div>
			{/* Breadcrumb */}
			<div className="mt-3 flex items-center gap-2 font-display font-medium text-[17px] tracking-[-0.34px]">
				<span className="opacity-40">Home</span>
				<span className="opacity-40">/</span>
				<span className="text-[#1E1E1E]">Breadcrumb block</span>
			</div>
		</div>
	);
}

function ViewportCell() {
	return (
		<div className="p-6 h-full flex flex-col items-center">
			<CellLabel className="text-center w-full">Hide blocks per screen size</CellLabel>
			{/* Modal */}
			<div className="mt-4 w-full max-w-[220px] bg-white rounded-lg shadow-lg border border-black/10">
				<div className="flex items-center justify-between px-4 pt-3 pb-1.5">
					<span className="text-[12px] font-medium">Viewport size</span>
					<span className="text-[10px] opacity-30">✕</span>
				</div>
				<div className="px-4 pb-3 space-y-2">
					<label className="flex items-center gap-2 text-[10px]">
						<span className="w-2.5 h-2.5 rounded-[2px] border border-[#949494]" />
						Hide on Desktop
					</label>
					<label className="flex items-center gap-2 text-[10px]">
						<span className="w-2.5 h-2.5 rounded-[2px] bg-[#3858E9] flex items-center justify-center text-white text-[7px] leading-none">✓</span>
						Hide on Tablet
					</label>
				</div>
			</div>
		</div>
	);
}

function NavOverlayCell() {
	return (
		<div className="p-6 h-full flex flex-col">
			<CellLabel>Your navigation overlay, your way</CellLabel>
			<div className="mt-4 relative flex-1 min-h-0">
				{/* Dark panel */}
				<div className="absolute left-0 top-0 w-[65%] bg-[#1E1E1E] rounded-tl-lg overflow-hidden h-full">
					<div className="h-[45%] bg-[#FE5D42]" />
					<div className="p-2.5 space-y-1 text-white/80 text-[10px]">
						<p>About</p><p>Contact</p><p>Podcast</p><p>Articles</p><p>Shop</p>
					</div>
				</div>
				{/* Blue panel */}
				<div className="absolute left-[30%] top-3 w-[75%] bg-[#3389DB] rounded-tl-lg p-3 h-[95%]">
					<div className="space-y-0 text-white text-[14px] leading-[1.1] text-right">
						<p>About</p><p>Contact</p><p>Podcast</p><p>Articles</p><p>Shop</p>
					</div>
					<p className="font-display font-bold text-[28px] text-[#A2C5F1] leading-[0.85] tracking-[-1.5px] mt-3">
						Pine<br />&amp; Peak
					</p>
				</div>
			</div>
		</div>
	);
}

// ── Main grid ───────────────────────────────────────────────────────────

const C = "bg-[#EBE8E5] rounded-[16px] overflow-hidden";

export function FeatureHighlights() {
	return (
		<section className="py-[clamp(80px,8vw,128px)] relative overflow-hidden">
			<div className="relative mx-auto max-w-[1280px] px-[clamp(24px,4vw,48px)]">
				<div className="mb-12">
					<p className="eyebrow mb-4">What&apos;s new in WordPress</p>
					<h2 className="font-display text-balance max-w-xl">
						Powerful features, built in the{" "}
						<em className="serif-accent">open</em>.
					</h2>
				</div>

				{/* 4-col bento — 6 explicit rows */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] md:grid-rows-[280px_80px_80px_280px_80px_80px]">
					{/* Col 1 */}
					<div className={`${C} md:[grid-area:1/1/4/2]`}><IconBlock /></div>
					<div className={`${C} md:[grid-area:4/1/7/2]`}><PatternsCell /></div>

					{/* Col 2 */}
					<div className={`${C} md:[grid-area:1/2/2/4]`}><HeroCell /></div>
					<div className={`${C} md:[grid-area:2/2/4/4]`}><CollabCell /></div>
					<div className={`${C} md:[grid-area:4/2/5/3]`}><SmallCell icon="⟨⟩" label="Create blocks with just PHP" /></div>
					<div className={`${C} md:[grid-area:5/2/7/3]`}><BreadcrumbCell /></div>

					{/* Col 3 */}
					<div className={`${C} md:[grid-area:4/3/6/4]`}><ViewportCell /></div>
					<div className={`${C} md:[grid-area:6/3/7/4]`}><SmallCell icon="◇" label="A modern look in the admin" /></div>

					{/* Col 4 */}
					<div className={`${C} md:[grid-area:1/4/4/5]`}><RevisionsCell /></div>
					<div className={`${C} md:[grid-area:4/4/5/5]`}><SmallCell icon="" label="Fluid navigation across the admin" accentColor="#E2482E" /></div>
					<div className={`${C} md:[grid-area:5/4/7/5]`}><NavOverlayCell /></div>
				</div>
			</div>
		</section>
	);
}
