import { SiteChrome } from "@/components/shared/SiteChrome";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";
import { MarketplaceShelf } from "@/components/blocks/MarketplaceShelf";
import { CategoryRail } from "@/components/custom/CategoryRail";
import { PluginCardGrid } from "@/components/custom/PluginCardGrid";

export default function PluginsPage() {
	return (
		<SiteChrome active="plugins">
			<PluginSearchHero />
			<MarketplaceShelf />
			<CategoryRail />
			<PluginCardGrid />
		</SiteChrome>
	);
}
