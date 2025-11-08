import { test, expect } from "utils";
import { PAGE_SELECTORS } from "./constants";

test.beforeEach(async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
});

test.describe("Error States", () => {
	test("should handle 404 for non-existent project", async ({ page }) => {
		await page.goto("/projects/non-existent-project-slug");
		await page.waitForLoadState("networkidle");

		// Astro should return a 404 status
		const response = await page.goto("/projects/non-existent-project-slug");
		expect(response?.status()).toBe(404);
	});

	test("should handle 404 for non-existent article", async ({ page }) => {
		await page.goto("/articles/non-existent-article-slug");
		await page.waitForLoadState("networkidle");

		const response = await page.goto("/articles/non-existent-article-slug");
		expect(response?.status()).toBe(404);
	});

	test("should handle Currently Listening API failure gracefully", async ({ page }) => {
		// Intercept and fail the Last.fm API
		await page.route("https://ws.audioscrobbler.com/2.0/**", (route) => {
			route.fulfill({
				status: 500,
				body: JSON.stringify({ error: "Internal Server Error" }),
			});
		});

		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		// Wait for the page to load
		await page.waitForLoadState("networkidle");

		// The currently listening component should still be present
		// but might show an error state or be hidden
		const CONTAINER = page.getByTestId(PAGE_SELECTORS.currentlyListening.container);
		const containerExists = await CONTAINER.count();

		// Component should exist even if API fails
		expect(containerExists).toBeGreaterThan(0);
	});

	test("should handle Currently Listening API timeout gracefully", async ({ page }) => {
		// Intercept and delay the Last.fm API to simulate timeout
		await page.route("https://ws.audioscrobbler.com/2.0/**", (route) => {
			setTimeout(() => {
				route.fulfill({
					status: 200,
					body: JSON.stringify({ recenttracks: { track: [] } }),
				});
			}, 10000); // 10 second delay
		});

		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		// Wait for page load (but not for the API)
		await page.waitForLoadState("domcontentloaded");

		// The page should still load even if API is slow
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toBeTruthy();
	});

	test("should handle invalid URL paths", async ({ page }) => {
		const invalidPaths = [
			"/invalid-path",
			"/projects/invalid/project",
			"/articles/invalid/article",
		];

		for (const path of invalidPaths) {
			const response = await page.goto(path);
			expect(response?.status()).toBe(404);
		}
	});
});
