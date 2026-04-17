import { SiteChrome } from "@/components/shared/SiteChrome";
import { StaggerReveal } from "@/components/shared/StaggerReveal";
import { GridSection } from "@/components/shared/GridSection";
import { NewsHero } from "@/components/custom/NewsHero";
import { NewsFeatured } from "@/components/blocks/NewsFeatured";
import { NewsArchiveTable } from "@/components/custom/NewsArchiveTable";

export default function NewsPage() {
	return (
		<SiteChrome active="news">
			<div className="bg-[color:var(--color-background-news)]">
				<GridSection>
					<StaggerReveal delay={0}><NewsHero /></StaggerReveal>
				</GridSection>
				<GridSection dots>
					<StaggerReveal delay={0.1}><NewsFeatured /></StaggerReveal>
				</GridSection>
				<GridSection>
					<StaggerReveal delay={0.2}><NewsArchiveTable /></StaggerReveal>
				</GridSection>
			</div>
		</SiteChrome>
	);
}
