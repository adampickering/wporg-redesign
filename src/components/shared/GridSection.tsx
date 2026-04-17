// Structural wrapper that gives a section side rails and horizontal dividers.
// Background goes full-width. Rails overlay at the 1280px content column edges.
// Uses ::after for rails and ::before for horizontal dividers (in CSS).

import type { ReactNode } from "react";

type GridSectionProps = {
	children: ReactNode;
	/** Additional classes for the section (e.g. bg-dark-slab) */
	className?: string;
	/** Dark section — uses white rails instead of dark */
	dark?: boolean;
	/** Show dot grid texture behind content */
	dots?: boolean;
};

export function GridSection({ children, className, dark, dots }: GridSectionProps) {
	return (
		<div className={`grid-section ${dark ? "grid-section-dark" : ""} ${className ?? ""}`}>
			{dots && (
				<div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
					<div className={`w-full max-w-[1280px] h-full ${dark ? "dot-grid-dark" : "dot-grid"}`} />
				</div>
			)}
			{children}
		</div>
	);
}
