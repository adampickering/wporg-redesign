import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	use: {
		baseURL: "http://localhost:3000/wporg-redesign",
		trace: "on-first-retry",
	},
	webServer: {
		// Playwright spawns the webServer via `/bin/sh -c`, a non-login shell that
		// does not source the user's profile. `bun` lives in `~/.bun/bin` and is
		// not on the default PATH, so we prepend it explicitly here.
		command: "npx next dev",
		url: "http://localhost:3000/wporg-redesign/",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
	projects: [{ name: "chromium", use: { viewport: { width: 1440, height: 900 } } }],
});
