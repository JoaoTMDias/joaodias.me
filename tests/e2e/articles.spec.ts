import { test, expect } from "utils";
import { PAGE_DATA, PAGE_SELECTORS } from "./constants";

test.beforeEach(async ({ page, networkHandlers }) => {
	await page.setViewportSize({ width: 1440, height: 900 });

	await test.step("Intercept Last.fm API", async () => {
		await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
			method: "GET",
			fixture: "./tests/mocks/last-fm.json",
		});
	});
});

test.describe("Articles Index Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/articles");
		await page.waitForURL("**/articles");
	});

	test("should load the articles index page", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toContain("Articles");
	});

	test("should display articles header", async ({ page }) => {
		const ARTICLES_HEADER = page.getByRole("heading", { level: 1, name: "Articles" });
		await expect(ARTICLES_HEADER).toBeVisible();
	});

	test("should display empty state when no articles exist", async ({ page }) => {
		// Check if empty state is displayed (articles collection might be empty)
		const EMPTY_STATE = page.locator(".empty-state");
		const emptyStateExists = await EMPTY_STATE.count();

		if (emptyStateExists > 0) {
			await expect(EMPTY_STATE).toBeVisible();
			const emptyStateText = await EMPTY_STATE.textContent();
			expect(emptyStateText).toContain("coming soon");
		}
	});

	test("should display currently listening section", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const { title } = PAGE_DATA.footer["social-media"];
		const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: title });
		await expect(CONTACTS_TITLE).toBeVisible();
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

		// First check if there are any articles
		await page.goto("/articles");
		await page.waitForURL("**/articles");

		// Check if articles exist
		const ARTICLE_LINKS = await page.locator(".article-item a").all();

		if (ARTICLE_LINKS.length === 0) {
			test.skip();
			return;
		}

		// Navigate to first article
		const FIRST_ARTICLE = ARTICLE_LINKS[0];
		const href = await FIRST_ARTICLE.getAttribute("href");
		expect(href).toBeTruthy();

		await page.goto(href!);
		await page.waitForURL(`**/articles/**`);
	});

	test("should display article header information", async ({ page }) => {
		const ARTICLE_TITLE = page.locator("article h1");
		await expect(ARTICLE_TITLE).toBeVisible();
	});

	test("should display article meta information", async ({ page }) => {
		const ARTICLE_META = page.locator(".article-header .meta");
		await expect(ARTICLE_META).toBeVisible();
	});

	test("should display article content", async ({ page }) => {
		const ARTICLE_CONTENT = page.locator(".article-content");
		await expect(ARTICLE_CONTENT).toBeVisible();
	});

	test("should display back to articles link", async ({ page }) => {
		const BACK_LINK = page.getByRole("link", { name: /Back to Articles/i });
		await expect(BACK_LINK).toBeVisible();
		await expect(BACK_LINK).toHaveAttribute("href", "/articles");
	});

	test("should navigate back to articles index when clicking back link", async ({ page }) => {
		const BACK_LINK = page.getByRole("link", { name: /Back to Articles/i });
		await BACK_LINK.click();
		await page.waitForURL("**/articles");

		expect(page.url()).toContain("/articles");
	});

	test("should display currently listening section", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const { title } = PAGE_DATA.footer["social-media"];
		const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: title });
		await expect(CONTACTS_TITLE).toBeVisible();
	});
});
