import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
	},
	webServer: {
		// Playwright spawns the webServer via `/bin/sh -c`, a non-login shell that
		// does not source the user's profile. `bun` lives in `~/.bun/bin` and is
		// not on the default PATH, so we prepend it explicitly here.
		command: "bun dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		env: {
			PATH: `${process.env.HOME ?? ""}/.bun/bin:${process.env.PATH ?? ""}`,
		},
	},
	projects: [{ name: "chromium", use: { viewport: { width: 1440, height: 900 } } }],
});
