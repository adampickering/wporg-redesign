import { SiteChrome } from "@/components/shared/SiteChrome";
import { StaggerReveal } from "@/components/shared/StaggerReveal";
import { GridSection } from "@/components/shared/GridSection";
import { HomepageHero } from "@/components/blocks/HomepageHero";
import { LogoCloud } from "@/components/blocks/LogoCloud";
import { FeatureHighlights } from "@/components/blocks/FeatureHighlights";
import { ShowcaseBento } from "@/components/custom/ShowcaseBento";
import { Stats } from "@/components/blocks/Stats";
import { NewsPreview } from "@/components/blocks/NewsPreview";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<GridSection>
				<StaggerReveal delay={0}><HomepageHero /></StaggerReveal>
			</GridSection>
			<GridSection>
				<StaggerReveal delay={0.1}><LogoCloud /></StaggerReveal>
			</GridSection>
			<GridSection dots>
				<StaggerReveal delay={0.15}><FeatureHighlights /></StaggerReveal>
			</GridSection>
			<GridSection>
				<StaggerReveal delay={0.2}><ShowcaseBento /></StaggerReveal>
			</GridSection>
			<GridSection dark dots>
				<StaggerReveal delay={0.3}><Stats /></StaggerReveal>
			</GridSection>
			<GridSection dots>
				<StaggerReveal delay={0.4}><NewsPreview /></StaggerReveal>
			</GridSection>
		</SiteChrome>
	);
}
