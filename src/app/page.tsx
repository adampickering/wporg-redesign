import { SiteChrome } from "@/components/shared/SiteChrome";
import { HomepageHero } from "@/components/blocks/HomepageHero";
import { Pillars } from "@/components/blocks/Pillars";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<HomepageHero />
			<Pillars />
		</SiteChrome>
	);
}
