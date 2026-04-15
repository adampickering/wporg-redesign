// scripts/verify-tailark-slugs.ts
//
// `export {}` makes this a module so top-level await typechecks under
// `tsc --noEmit` (Task 7's `bun run check`). Bun runs the file as ESM either way.
export {};
//
// Verified against tailark.com/blocks on 2026-04-15.
// Corrections from the original expected list:
//   header-section  → does not exist in Dusk (navigation is shadcn-only, per spec §8.3)
//   features-section → features
//   stats-section    → stats
//   blog-section     → content  (Dusk has no blog category; content is the closest match)
//   testimonials-section → testimonials
//   footer-section   → footer

const EXPECTED = [
	"hero-section",
	"features",
	"logo-cloud",
	"stats",
	"content",
	"testimonials",
	"call-to-action",
	"footer",
];

async function check(slug: string): Promise<boolean> {
	const res = await fetch(`https://tailark.com/dusk/${slug}/one`, { method: "HEAD" });
	if (res.ok) return true;
	// Some Next.js deployments return 405 on HEAD even when the page exists — fall back to GET.
	const get = await fetch(`https://tailark.com/dusk/${slug}/one`, { method: "GET" });
	return get.ok;
}

const results = await Promise.all(
	EXPECTED.map(async (slug) => ({ slug, ok: await check(slug) }))
);

for (const { slug, ok } of results) {
	console.log(`${ok ? "✓" : "✗"}  dusk/${slug}`);
}
const failures = results.filter((r) => !r.ok);
if (failures.length) {
	console.error(`\n${failures.length} slug(s) not found on tailark.com — check spelling or browse tailark.com/blocks to find the real slug.`);
	process.exit(1);
}
console.log("\nAll slugs verified.");
