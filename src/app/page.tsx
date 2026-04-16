import { SiteChrome } from "@/components/shared/SiteChrome";
import { HomepageHero } from "@/components/blocks/HomepageHero";
import { Pillars } from "@/components/blocks/Pillars";
import { LogoCloud } from "@/components/blocks/LogoCloud";
import { ShowcaseBento } from "@/components/custom/ShowcaseBento";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<HomepageHero />
			<Pillars />
			<LogoCloud />
			<ShowcaseBento />
		</SiteChrome>
	);
}
