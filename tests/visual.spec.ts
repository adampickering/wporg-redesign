import { test, expect } from "@playwright/test";

test("homepage full-page snapshot", async ({ page }) => {
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	// Wait for StaggerReveal animations (max 600ms + 500ms stagger = 1100ms)
	await page.waitForTimeout(1500);
	await expect(page).toHaveScreenshot("homepage.png", {
		fullPage: true,
		maxDiffPixelRatio: 0.01,
	});
});

test("news page full-page snapshot", async ({ page }) => {
	await page.goto("/news/");
	await page.waitForLoadState("networkidle");
	await page.waitForTimeout(1500);
	await expect(page).toHaveScreenshot("news.png", {
		fullPage: true,
		maxDiffPixelRatio: 0.01,
	});
});

test("plugins page full-page snapshot", async ({ page }) => {
	await page.goto("/plugins/");
	await page.waitForLoadState("networkidle");
	await page.waitForTimeout(1500);
	await expect(page).toHaveScreenshot("plugins.png", {
		fullPage: true,
		maxDiffPixelRatio: 0.01,
	});
});
