import { SiteChrome } from "@/components/shared/SiteChrome";
import { HomepageHero } from "@/components/blocks/HomepageHero";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<HomepageHero />
		</SiteChrome>
	);
}
