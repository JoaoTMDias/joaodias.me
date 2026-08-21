import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./utils";

test.describe("Portuguese locale", () => {
	test("renders localized core pages and reciprocal metadata", async ({ page }) => {
		await page.goto("/pt/");
		await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
		await expect(
			page.getByRole("heading", { name: "Sou a ponte entre UX e Engenharia" }),
		).toBeVisible();
		await expect(
			page.getByRole("banner").locator('a[data-testid="top-nav-link"][href="/pt/"]').first(),
		).toHaveAttribute("aria-current", "page");
		const featuredProjects = page.locator("#featured-work").getByTestId("work-item");
		await expect(featuredProjects).toHaveCount(3);
		await expect(featuredProjects.nth(0).getByRole("heading", { name: "Squeeezer" })).toBeVisible();
		await expect(featuredProjects.nth(1).getByRole("heading", { name: "Raider" })).toBeVisible();
		await expect(
			featuredProjects.nth(2).getByRole("heading", { name: "A11y Page Checker" }),
		).toBeVisible();
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
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			"content",
			/Site pessoal de João Dias/,
		);
		await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "pt_PT");
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

	test("publishes complete Portuguese editorial listings", async ({ page }) => {
		await page.goto("/pt/blog");
		await expect(page.getByRole("heading", { name: "É uma armadilha!" })).toBeVisible();
		await expect(
			page.getByRole("heading", { name: "Um ano de aplicação do Ato Europeu da Acessibilidade" }),
		).toBeVisible();
		await expect(page.locator('a[href*="screen-reader-testing"]')).toHaveCount(0);
		await page.goto("/pt/work");
		await expect(page.getByTestId("work-card")).toHaveCount(9);
	});

	test("links an English article to its Portuguese counterpart", async ({ page }) => {
		await page.goto("/blog/one-year-of-eaa");
		await expect(page.getByRole("banner").locator('a[hreflang="pt-PT"]').first()).toHaveAttribute(
			"href",
			"/pt/blog/one-year-of-eaa",
		);
		const response = await page.request.get("/pt/blog/one-year-of-eaa");
		expect(response.ok()).toBeTruthy();
	});

	test("publishes a Portuguese article-only RSS feed", async ({ request }) => {
		const response = await request.get("/pt/rss.xml");
		expect(response.ok()).toBeTruthy();
		const xml = await response.text();
		expect(xml).toContain("<rss");
		expect(xml).toContain("one-year-of-eaa");
		expect(xml).toContain("É uma armadilha!");
		expect(xml.match(/<item>/g) ?? []).toHaveLength(2);
	});

	test("has no automated accessibility violations on the Portuguese homepage", async ({ page }) => {
		await page.goto("/pt/");
		await page.waitForLoadState("networkidle");
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
