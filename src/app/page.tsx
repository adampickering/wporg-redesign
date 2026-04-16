import { SiteChrome } from "@/components/shared/SiteChrome";
import { StaggerReveal } from "@/components/shared/StaggerReveal";
import { HomepageHero } from "@/components/blocks/HomepageHero";
import { Pillars } from "@/components/blocks/Pillars";
import { LogoCloud } from "@/components/blocks/LogoCloud";
import { ShowcaseBento } from "@/components/custom/ShowcaseBento";
import { Stats } from "@/components/blocks/Stats";
import { NewsPreview } from "@/components/blocks/NewsPreview";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<StaggerReveal delay={0}><HomepageHero /></StaggerReveal>
			<StaggerReveal delay={0.1}><Pillars /></StaggerReveal>
			<StaggerReveal delay={0.2}><LogoCloud /></StaggerReveal>
			<StaggerReveal delay={0.3}><ShowcaseBento /></StaggerReveal>
			<StaggerReveal delay={0.4}><Stats /></StaggerReveal>
			<StaggerReveal delay={0.5}><NewsPreview /></StaggerReveal>
		</SiteChrome>
	);
}
