import { PAGE_DATA, PAGE_SELECTORS, SITE_CONFIG } from "./constants";
import { expect, test } from "./utils";

test.beforeEach(async ({ page, networkHandlers }) => {
	await page.setViewportSize({ width: 1440, height: 900 });

	await test.step("Intercept Last.fm API", async () => {
		await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
			method: "GET",
			fixture: "./tests/mocks/last-fm.json",
		});
	});

	await test.step("Visit homepage", async () => {
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");
	});
});

test.describe("Homepage", () => {
	test("should load the website", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toBe(PAGE_DATA.title);
	});

	test("should render the primary navigation and hero content", async ({ page }) => {
		const PAGE_LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		const PAGE_TOP_NAV = page.locator('nav[aria-label="Pages"]').first();
		const MAIN_PHOTO = page.getByTestId(PAGE_SELECTORS.profilePicture);

		await expect(PAGE_LOGO).toBeVisible();
		await expect(PAGE_TOP_NAV).toBeVisible();

		for (const navItem of SITE_CONFIG.nav) {
			const link = PAGE_TOP_NAV.getByRole("link", {
				name: navItem.accessibleLabel,
				exact: true,
			});
			await expect(link).toBeVisible();
			await expect(link).toHaveAttribute("href", navItem.link);
		}

		const MAIN_CONTENT = page.getByRole("main");

		await expect(MAIN_PHOTO).toBeVisible();
		await expect(page.getByRole("heading", { name: PAGE_DATA.hero.title })).toBeVisible();
		await expect(MAIN_CONTENT.getByText(PAGE_DATA.hero.subtitle, { exact: true })).toBeVisible();
		await expect(MAIN_CONTENT.getByText(PAGE_DATA.hero.intro, { exact: true })).toBeVisible();
		await expect(page.locator("main section").first().locator("p")).toHaveCount(2);
	});

	test("should display the featured work section", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Featured Work" })).toBeVisible();
		await expect(page.locator("#featured-work")).toBeVisible();
	});
});
