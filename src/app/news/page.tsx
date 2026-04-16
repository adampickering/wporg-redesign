import { SiteChrome } from "@/components/shared/SiteChrome";
import { StaggerReveal } from "@/components/shared/StaggerReveal";
import { NewsHero } from "@/components/custom/NewsHero";
import { NewsFeatured } from "@/components/blocks/NewsFeatured";
import { NewsArchiveTable } from "@/components/custom/NewsArchiveTable";

export default function NewsPage() {
	return (
		<SiteChrome active="news">
			<div className="bg-[color:var(--color-background-news)]">
				<StaggerReveal delay={0}><NewsHero /></StaggerReveal>
				<StaggerReveal delay={0.1}><NewsFeatured /></StaggerReveal>
				<StaggerReveal delay={0.2}><NewsArchiveTable /></StaggerReveal>
			</div>
		</SiteChrome>
	);
}
