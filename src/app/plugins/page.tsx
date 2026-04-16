import { SiteChrome } from "@/components/shared/SiteChrome";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";
import { MarketplaceShelf } from "@/components/blocks/MarketplaceShelf";
import { CategoryRail } from "@/components/custom/CategoryRail";
import { PluginCardGrid } from "@/components/custom/PluginCardGrid";
import { InnovatorSpotlight } from "@/components/blocks/InnovatorSpotlight";

export default function PluginsPage() {
	return (
		<SiteChrome active="plugins">
			<PluginSearchHero />
			<MarketplaceShelf />
			<CategoryRail />
			<PluginCardGrid />
			<InnovatorSpotlight />
		</SiteChrome>
	);
}
