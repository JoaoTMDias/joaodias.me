import { expect, test } from "utils";
import { PAGE_SELECTORS } from "./constants";

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

  test("should display article content", async ({ page }) => {
    const ARTICLE_CONTENT = page.getByTestId("blog-article-content");
    await expect(ARTICLE_CONTENT).toBeVisible();
  });

  test("should display back to articles link", async ({ page }) => {
    const BACK_LINK = page.getByRole("link", { name: /Back to Articles/i });
    await expect(BACK_LINK).toBeVisible();
    await expect(BACK_LINK).toHaveAttribute("href", "/blog");
  });

  test("should navigate back to articles index when clicking back link", async ({ page }) => {
    const BACK_LINK = page.getByRole("link", { name: /Back to Articles/i });
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
