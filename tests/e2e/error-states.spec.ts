import { PAGE_SELECTORS } from "./constants";
import { expect, test } from "./utils";

test.beforeEach(async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
});

test.describe("Error States", () => {
	test("should handle 404 for non-existent project", async ({ page }) => {
		const response = await page.goto("/work/non-existent-project-slug");

		expect(response?.status()).toBe(404);
		await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
		await expect(page.getByRole("link", { name: "Go to the homepage" })).toHaveAttribute(
			"href",
			"/",
		);
	});

	test("should handle 404 for non-existent article", async ({ page }) => {
		const response = await page.goto("/articles/non-existent-article-slug");

		expect(response?.status()).toBe(404);
		await expect(page.getByRole("link", { name: "Explore my work" })).toHaveAttribute(
			"href",
			"/work",
		);
		await expect(page.getByRole("link", { name: "Read the blog" })).toHaveAttribute(
			"href",
			"/blog",
		);
	});

	test("should link localized error pages to the other locale's homepage", async ({ page }) => {
		await page.goto("/pt/404");

		await expect(page.getByRole("banner").locator('a[hreflang="en"]').first()).toHaveAttribute(
			"href",
			"/",
		);
		await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
		await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
	});

	test("should exclude error pages from the sitemap", async ({ request }) => {
		const response = await request.get("/sitemap-0.xml");
		const sitemap = await response.text();

		expect(response.ok()).toBeTruthy();
		expect(sitemap).not.toContain("/404");
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

		// Wait for the page to load
		await page.waitForLoadState("networkidle");

		const CONTAINER = page.getByTestId(PAGE_SELECTORS.currentlyListening.container);
		await expect(CONTAINER).toBeVisible();
		await expect(CONTAINER).toContainText("Listening activity is currently unavailable.");
		await expect(CONTAINER).not.toContainText("Loading...");
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

		// Wait for page load (but not for the API)
		await page.waitForLoadState("domcontentloaded");

		// The page should still load even if API is slow
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toBeTruthy();
	});

	test("should handle invalid URL paths", async ({ page }) => {
		const invalidPaths = ["/invalid-path", "/work/invalid/project", "/articles/invalid/article"];

		for (const path of invalidPaths) {
			const response = await page.goto(path);
			expect(response?.status()).toBe(404);
		}
	});
});
