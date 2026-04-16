import type { ReactNode } from "react";
import type { NavActiveSlug } from "@/components/shared/Nav";
import { PromoBar } from "@/components/shared/PromoBar";
import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";

type SiteChromeProps = {
	children: ReactNode;
	active?: NavActiveSlug;
	promoBar?: {
		tag: string;
		message: string;
		linkLabel: string;
		href: string;
	};
};

const DEFAULT_PROMO = {
	tag: "WP 7.0 RC2",
	message: "Release candidate now available for testing.",
	linkLabel: "Read the release notes",
	href: "/news/",
};

export function SiteChrome({ children, active, promoBar }: SiteChromeProps) {
	const promo = promoBar ?? DEFAULT_PROMO;

	return (
		<>
			<PromoBar {...promo} />
			<Nav active={active} />
			<main className="min-h-screen">{children}</main>
			<Footer />
		</>
	);
}
