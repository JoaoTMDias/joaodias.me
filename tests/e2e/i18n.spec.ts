import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./utils";

test.describe("Portuguese locale", () => {
	test("renders localized core pages and reciprocal metadata", async ({ page }) => {
		await page.goto("/pt/");
		await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
		await expect(page.getByRole("heading", { name: "Uno UX e Engenharia" })).toBeVisible();
		await expect(
			page.getByRole("banner").locator('a[data-testid="top-nav-link"][href="/pt/"]').first(),
		).toHaveAttribute("aria-current", "page");
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			"href",
			"https://joaodias.me/pt/",
		);
		await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
			"href",
			"https://joaodias.me/",
		);
		await expect(page.locator('link[rel="alternate"][hreflang="pt-PT"]')).toHaveAttribute(
			"href",
			"https://joaodias.me/pt/",
		);
		await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
			"href",
			"https://joaodias.me/",
		);
	});

	test("switches core pages to their exact counterpart", async ({ page }) => {
		await page.goto("/about");
		const portuguese = page.getByRole("banner").locator('a[hreflang="pt-PT"]').first();
		await expect(portuguese).toHaveAttribute("href", "/pt/about/");
		await portuguese.click();
		await expect(page).toHaveURL(/\/pt\/about\/?$/);
		await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
		await expect(page.getByRole("banner").locator('a[hreflang="en"]').first()).toHaveAttribute(
			"href",
			"/about/",
		);
	});

	test("does not mix untranslated editorial entries into Portuguese listings", async ({ page }) => {
		await page.goto("/pt/blog");
		await expect(page.getByTestId("blog-article-title")).toHaveCount(0);
		await expect(page.locator('a[href*="screen-reader-testing"]')).toHaveCount(0);
		await page.goto("/pt/work");
		await expect(page.getByTestId("work-card")).toHaveCount(0);
	});

	test("uses listing fallback for an untranslated English article", async ({ page }) => {
		await page.goto("/blog/one-year-of-eaa");
		await expect(page.getByRole("banner").locator('a[hreflang="pt-PT"]').first()).toHaveAttribute(
			"href",
			"/pt/blog",
		);
		await expect(page.locator('link[rel="alternate"][hreflang="pt-PT"]')).toHaveCount(0);
		const response = await page.request.get("/pt/blog/one-year-of-eaa");
		expect(response.status()).toBe(404);
	});

	test("publishes a Portuguese article-only RSS feed", async ({ request }) => {
		const response = await request.get("/pt/rss.xml");
		expect(response.ok()).toBeTruthy();
		const xml = await response.text();
		expect(xml).toContain("<rss");
		expect(xml).not.toContain("one-year-of-eaa");
		expect(xml).not.toContain("<item>");
	});

	test("has no automated accessibility violations on the Portuguese homepage", async ({ page }) => {
		await page.goto("/pt/");
		await page.waitForLoadState("networkidle");
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
