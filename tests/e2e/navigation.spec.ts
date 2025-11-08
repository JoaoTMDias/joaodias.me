import { test, expect } from "utils";
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

test.describe("Skip Links", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");
	});

	test("should display skip links when focused", async ({ page }) => {
		// Skip links are typically hidden until focused
		// Press Tab to focus the first skip link
		await page.keyboard.press("Tab");

		// Check that skip links are visible (they should appear when focused)
		const skipLinks = page.locator('[class*="skip"]');
		const skipLinksCount = await skipLinks.count();
		expect(skipLinksCount).toBeGreaterThan(0);
	});

	test("should navigate to content section when clicking 'Skip to content'", async ({ page }) => {
		// Wait for page to load and React component to hydrate
		await page.waitForLoadState("networkidle");

		// Find the skip link (it may be hidden, so we use a selector that works even when hidden)
		const skipToContent = page.getByRole("link", { name: "Skip to content" });

		// Focus the link first to make it visible, then click
		await skipToContent.focus();
		await expect(skipToContent).toBeVisible();
		await skipToContent.click();

		// Wait for navigation to complete
		await page.waitForURL("**/#content");

		// Verify we're at the content section
		const contentSection = page.locator("#content");
		await expect(contentSection).toBeVisible();

		// Verify the URL contains the hash
		expect(page.url()).toContain("#content");
	});

	test("should navigate to contact section when clicking 'Skip to Social links'", async ({
		page,
	}) => {
		await page.waitForLoadState("networkidle");

		// Find the skip link
		const skipToContact = page.getByRole("link", { name: "Skip to Social links" });

		// Focus the link first to make it visible, then click
		await skipToContact.focus();
		await expect(skipToContact).toBeVisible();
		await skipToContact.click();

		// Wait for navigation to complete
		await page.waitForURL("**/#contact");

		// Verify we're at the contact section
		const contactSection = page.locator("#contact");
		await expect(contactSection).toBeVisible();

		// Verify the URL contains the hash
		expect(page.url()).toContain("#contact");
	});
});

test.describe("Logo Navigation", () => {
	test("should navigate to homepage when clicking logo from projects page", async ({ page }) => {
		await page.goto("/projects");
		await page.waitForURL("**/projects");

		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();

		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});

	test("should navigate to homepage when clicking logo from project detail page", async ({
		page,
		networkHandlers,
	}) => {
		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		// Navigate to a project detail page
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		const WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
		expect(WORK_ITEMS.length).toBeGreaterThan(0);

		const FIRST_PROJECT_LINK = WORK_ITEMS[0];
		const href = await FIRST_PROJECT_LINK.getAttribute("href");
		expect(href).toBeTruthy();

		await page.goto(href!);
		await page.waitForURL(`**/projects/**`);

		// Click logo
		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();
		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});

	test("should navigate to homepage when clicking logo from about page", async ({ page }) => {
		await page.goto("/about");
		await page.waitForURL("**/about");

		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();

		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});
});
