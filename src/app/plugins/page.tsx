import { SiteChrome } from "@/components/shared/SiteChrome";
import { StaggerReveal } from "@/components/shared/StaggerReveal";
import { PluginSearchHero } from "@/components/custom/PluginSearchHero";
import { MarketplaceShelf } from "@/components/blocks/MarketplaceShelf";
import { CategoryRail } from "@/components/custom/CategoryRail";
import { PluginCardGrid } from "@/components/custom/PluginCardGrid";
import { InnovatorSpotlight } from "@/components/blocks/InnovatorSpotlight";
import { BuildPluginCta } from "@/components/blocks/BuildPluginCta";

export default function PluginsPage() {
	return (
		<SiteChrome active="plugins">
			<StaggerReveal delay={0}><PluginSearchHero /></StaggerReveal>
			<StaggerReveal delay={0.1}><MarketplaceShelf /></StaggerReveal>
			<StaggerReveal delay={0.2}><CategoryRail /></StaggerReveal>
			<StaggerReveal delay={0.3}><PluginCardGrid /></StaggerReveal>
			<StaggerReveal delay={0.4}><InnovatorSpotlight /></StaggerReveal>
			<StaggerReveal delay={0.5}><BuildPluginCta /></StaggerReveal>
		</SiteChrome>
	);
}
