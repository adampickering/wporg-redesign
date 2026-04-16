import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Routes the prototype has actually built. Each page task (Phase 2/3/4) adds
// its route here as the last step. Tests for paths NOT in this set are marked
// `test.skip`, so running the full suite does not fail on 404s from routes
// that haven't been built yet.
const BUILT_ROUTES = new Set(["/", "/news/", "/plugins/"]);

for (const path of ["/", "/news/", "/plugins/"]) {
	test(`a11y: ${path}`, async ({ page }) => {
		test.skip(
			!BUILT_ROUTES.has(path),
			`route ${path} not built yet — add to BUILT_ROUTES once Phase 3/4 lands it`,
		);
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations
			.filter((v) => v.impact === "serious" || v.impact === "critical")
			.map((v) => `[${v.impact}] ${v.id}: ${v.description}`);
		expect(serious).toEqual([]);
	});
}
