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

	await page.goto("/about");
	await page.waitForURL("**/about");
});

test.describe("About Page", () => {
	test("should load the about page", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toContain("About");
	});

	test("should display the hero content", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /hello, i'm joão/i })).toBeVisible();
		await expect(page.getByRole("img", { name: /headshot portrait of joão dias/i })).toBeVisible();
	});

	test("should display bio section", async ({ page }) => {
		await expect(page.getByRole("img", { name: /headshot portrait of joão dias/i })).toBeVisible();
		await expect(page.getByRole("heading", { name: /^Bio$/i })).toBeVisible();
	});

	test("should display skills section", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /skills/i }).first()).toBeVisible();
	});

	test("should display experience section", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /experience/i }).first()).toBeVisible();
		await expect(page.getByTestId(PAGE_SELECTORS.experience)).toBeVisible();
	});

	test("should display currently listening section", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		await expect(page.getByTestId(container)).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const socialLinks = page.locator("#links-to-my-social-media");
		await expect(socialLinks).toBeVisible();
		await expect(socialLinks.locator("a")).toHaveCount(4);
	});
});
