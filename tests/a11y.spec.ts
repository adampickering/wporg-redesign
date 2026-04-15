import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Phase 0 only validates the harness against `/`. The `/news/` and `/plugins/`
// routes are scaffolded here so Phase 3/4 (which build those routes) can drop
// the grep filter and have these tests start running automatically.
for (const path of ["/", "/news/", "/plugins/"]) {
	test(`a11y: ${path}`, async ({ page }) => {
		await page.goto(path);
		const results = await new AxeBuilder({ page }).analyze();
		const serious = results.violations.filter(
			(v) => v.impact === "serious" || v.impact === "critical",
		);
		expect(serious).toEqual([]);
	});
}
