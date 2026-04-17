// Vertical connector stub between sections — inspired by Cal.com's timeline connectors.
// A short 1px line centered horizontally, with an optional WordPress W node at the center.

type SectionConnectorProps = {
	height?: number;
	showNode?: boolean;
	/** Override for dark sections where the line should be white */
	dark?: boolean;
};

export function SectionConnector({
	height = 80,
	showNode = false,
	dark = false,
}: SectionConnectorProps) {
	const lineColor = dark ? "bg-white/[0.12]" : "bg-foreground/[0.08]";
	const nodeColor = dark ? "border-white/[0.15] bg-dark-slab" : "border-foreground/[0.08] bg-background";
	const dotColor = dark ? "bg-white/20" : "bg-foreground/[0.12]";

	return (
		<div
			aria-hidden="true"
			className="relative flex justify-center"
			style={{ height }}
		>
			{/* Vertical line */}
			<div className={`w-px ${lineColor}`} />

			{/* Optional node dot at center */}
			{showNode && (
				<div
					className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${nodeColor} flex items-center justify-center`}
				>
					<div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
				</div>
			)}
		</div>
	);
}
