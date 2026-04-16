import { SiteChrome } from "@/components/shared/SiteChrome";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";
import { MarketplaceShelf } from "@/components/blocks/MarketplaceShelf";

export default function PluginsPage() {
	return (
		<SiteChrome active="plugins">
			<PluginSearchHero />
			<MarketplaceShelf />
		</SiteChrome>
	);
}
