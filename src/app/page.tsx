import { WpMark } from "@/components/shared/WpMark";
import { SiteChrome } from "@/components/shared/SiteChrome";

export default function Home() {
	return (
		<SiteChrome active="showcase">
			<div className="flex items-center justify-center py-20">
				<WpMark className="w-12 h-12 text-foreground" />
			</div>
		</SiteChrome>
	);
}
