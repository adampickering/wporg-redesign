import { SiteChrome } from "@/components/shared/SiteChrome";
import { NewsHero } from "@/components/custom/NewsHero";
import { NewsFeatured } from "@/components/blocks/NewsFeatured";
import { NewsArchiveTable } from "@/components/custom/NewsArchiveTable";

export default function NewsPage() {
	return (
		<SiteChrome active="news">
			<div className="bg-[color:var(--color-background-news)]">
				<NewsHero />
				<NewsFeatured />
				<NewsArchiveTable />
			</div>
		</SiteChrome>
	);
}
