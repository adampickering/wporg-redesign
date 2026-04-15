import { WpMark } from "@/components/shared/WpMark";
import { PromoBar } from "@/components/shared/PromoBar";
import { Nav } from "@/components/shared/Nav";

export default function Home() {
	return (
		<>
			<PromoBar
				tag="WP 7.0 RC2"
				message="Release candidate now available for testing."
				linkLabel="Read the release notes"
				href="/news/"
			/>
			<Nav active="showcase" />
			<main className="min-h-screen">
				<div className="flex items-center justify-center py-20">
					<WpMark className="w-12 h-12 text-foreground" />
				</div>
			</main>
		</>
	);
}
