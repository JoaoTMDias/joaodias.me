import { test, expect } from "utils";
import AxeBuilder from "@axe-core/playwright";
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

test.describe("Accessibility", () => {
	test("should have no accessibility violations on homepage", async ({ page }) => {
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test("should have no accessibility violations on projects page", async ({ page }) => {
		await page.goto("/projects");
		await page.waitForURL("**/projects");

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test("should have no accessibility violations on project detail page", async ({
		page,
		networkHandlers,
	}) => {
		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		// Navigate to homepage first to get a project link
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		// Get the first project link
		const WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
		expect(WORK_ITEMS.length).toBeGreaterThan(0);

		const FIRST_PROJECT_LINK = WORK_ITEMS[0];
		const href = await FIRST_PROJECT_LINK.getAttribute("href");
		expect(href).toBeTruthy();

		// Navigate to the project detail page
		await page.goto(href!);
		await page.waitForURL(`**/projects/**`);

		// Wait for the page to be fully loaded, including client-side components
		await page.waitForLoadState("networkidle");

		// Wait for the currently listening component to be ready (it has client:load)
		const CURRENTLY_LISTENING = page.getByTestId(PAGE_SELECTORS.currentlyListening.container);
		await expect(CURRENTLY_LISTENING).toBeVisible();

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});

