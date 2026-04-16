import { SiteChrome } from "@/components/shared/SiteChrome";
import { NewsHero } from "@/components/custom/NewsHero";

export default function NewsPage() {
	return (
		<SiteChrome active="news">
			<div className="bg-[color:var(--color-background-news)]">
				<NewsHero />
			</div>
		</SiteChrome>
	);
}
