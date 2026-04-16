import { SiteChrome } from "@/components/shared/SiteChrome";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";

export default function PluginsPage() {
	return (
		<SiteChrome active="plugins">
			<PluginSearchHero />
		</SiteChrome>
	);
}
