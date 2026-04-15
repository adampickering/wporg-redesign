export function PromoBar({
	tag,
	message,
	linkLabel,
	href,
}: {
	tag: string;
	message: string;
	linkLabel: string;
	href: string;
}) {
	return (
		<div
			role="region"
			aria-label="Site announcement"
			className="bg-dark-slab text-white/90 text-[13px] py-2.5 px-6 text-center font-normal"
		>
			<span className="font-mono text-[11px] px-2 py-0.5 bg-white/10 rounded-pill uppercase tracking-[0.14em] text-white/70 mr-2">
				{tag}
			</span>
			{message}{" "}
			<a
				href={href}
				className="text-accent-cyan font-medium no-underline hover:underline inline-flex items-center gap-1.5"
			>
				{linkLabel} <span aria-hidden="true">→</span>
			</a>
		</div>
	);
}
