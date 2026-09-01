import { PAGE_SELECTORS } from "./constants";
import { expect, test } from "./utils";

test.beforeEach(async ({ page, networkHandlers }) => {
	await page.setViewportSize({ width: 1440, height: 900 });

	await test.step("Intercept Last.fm API", async () => {
		await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
			method: "GET",
			fixture: "./tests/mocks/last-fm.json",
		});
	});
});

test.describe("Blog Index Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/blog");
		await page.waitForURL("**/blog");
	});

	test("should load the blog index page", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toContain("Blog");
	});

	test("should display the blog header", async ({ page }) => {
		const ARTICLES_HEADER = page.getByRole("heading", { level: 1, name: "Blog" });
		await expect(ARTICLES_HEADER).toBeVisible();
	});

	test("should expose native search semantics", async ({ page }) => {
		const search = page.getByRole("search");
		const searchInput = search.getByRole("searchbox", { name: "Search articles" });

		await expect(search).toBeVisible();
		await expect(search.locator("form")).toHaveAttribute("method", "get");
		await expect(searchInput).toHaveAttribute("type", "search");
	});

	test("should reserve space for article cover images", async ({ page }) => {
		const covers = page.locator('img[class*="featured-article__cover"]');
		const count = await covers.count();

		expect(count).toBeGreaterThan(0);

		for (const cover of await covers.all()) {
			await expect(cover).toHaveAttribute("width", "960");
			await expect(cover).toHaveAttribute("height", "480");
		}
	});

	test("should search and clear articles", async ({ page }) => {
		const searchInput = page.getByRole("searchbox", { name: "Search articles" });
		const searchIsland = page.locator("astro-island").filter({ has: searchInput });
		const resultsCount = page.locator("#blog-results-count");

		await expect(searchIsland).not.toHaveAttribute("ssr", "");
		const initialResultsCount = await resultsCount.textContent();
		expect(initialResultsCount).toMatch(/^\d+ articles$/);

		await searchInput.fill("no matching article");
		await expect(resultsCount).toHaveText(initialResultsCount ?? "");
		await expect(page.getByRole("button", { name: "Clear search" })).toBeVisible();
		await page.getByRole("button", { name: "Search", exact: true }).click();

		await expect(page).toHaveURL("/blog?q=no+matching+article");
		await expect(resultsCount).toHaveText("0 articles");
		const emptyState = page.locator(".empty-state");
		await expect(emptyState).toContainText("No articles match your search. Try a different term.");

		await emptyState.getByRole("button", { name: "Clear search" }).click();

		await expect(page).toHaveURL("/blog");
		await expect(searchInput).toHaveValue("");
		await expect(searchInput).toBeFocused();
		await expect(resultsCount).toHaveText(initialResultsCount ?? "");
		await expect(page.getByText("All articles", { exact: true })).toBeVisible();
	});

	test("should display the currently listening section", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");
		await expect(SOCIAL_LINKS).toBeVisible();
		expect(await SOCIAL_LINKS.locator("a").count()).toBeGreaterThan(0);
	});
});

test.describe("Article Detail Page", () => {
	test.beforeEach(async ({ page, networkHandlers }) => {
		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		await page.goto("/blog");
		await page.waitForURL("**/blog");

		const ARTICLE_LINKS = page.locator('a[href^="/blog/"]');
		const articleCount = await ARTICLE_LINKS.count();

		if (articleCount === 0) {
			test.skip();
			return;
		}

		const FIRST_ARTICLE = ARTICLE_LINKS.first();
		const href = await FIRST_ARTICLE.getAttribute("href");
		expect(href).toBeTruthy();

		await page.goto(href!);
		await page.waitForURL(`**/blog/**`);
	});

	test("should display article header information", async ({ page }) => {
		const ARTICLE_TITLE = page.getByTestId("blog-article-title");
		await expect(ARTICLE_TITLE).toBeVisible();
	});

	test("should display article meta information", async ({ page }) => {
		const ARTICLE_META = page.getByTestId("blog-article-meta");
		await expect(ARTICLE_META).toBeVisible();
	});

	test("should expose article SEO and structured data", async ({ page }) => {
		await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
		await expect(page.locator('meta[property="article:published_time"]')).toHaveCount(1);

		const structuredDataText = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		expect(structuredDataText).toBeTruthy();
		const structuredData = JSON.parse(structuredDataText!);
		expect(structuredData).toMatchObject({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			author: { "@type": "Person", name: "João Dias" },
			inLanguage: "en",
		});
		expect(structuredData.headline).toBeTruthy();
		expect(structuredData.datePublished).toBeTruthy();
		const mainEntityUrl = new URL(structuredData.mainEntityOfPage?.["@id"]);
		expect(mainEntityUrl.origin).toBe("https://joaodias.me");
		expect(mainEntityUrl.pathname).toBe(new URL(page.url()).pathname);
	});

	test("should display article content", async ({ page }) => {
		const ARTICLE_CONTENT = page.getByTestId("blog-article-content");
		await expect(ARTICLE_CONTENT).toBeVisible();
	});

	test("should display back to articles link", async ({ page }) => {
		const BACK_LINK = page.getByTestId("blog-back-link");
		await expect(BACK_LINK).toBeVisible();
		await expect(BACK_LINK).toHaveAttribute("href", "/blog");
	});

	test("should navigate back to articles index when clicking back link", async ({ page }) => {
		const BACK_LINK = page.getByTestId("blog-back-link");
		await BACK_LINK.click();
		await page.waitForURL("**/blog");

		expect(page.url()).toContain("/blog");
	});

	test("should display currently listening section", async ({ page }) => {
		const CONTAINER = page.getByTestId(PAGE_SELECTORS.currentlyListening.container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");
		await expect(SOCIAL_LINKS).toBeVisible();
		expect(await SOCIAL_LINKS.locator("a").count()).toBeGreaterThan(0);
	});
});
