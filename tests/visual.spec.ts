import { test, expect } from "@playwright/test";

test("homepage full-page snapshot", async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	await expect(page).toHaveScreenshot("homepage.png", {
		fullPage: true,
		maxDiffPixelRatio: 0.01,
	});
});

test("news page full-page snapshot", async ({ page }) => {
	await page.goto("/news/");
	await page.waitForLoadState("networkidle");
	await expect(page).toHaveScreenshot("news.png", {
		fullPage: true,
		maxDiffPixelRatio: 0.01,
	});
});
