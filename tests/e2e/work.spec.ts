import { random } from "@jtmdias/js-utilities";
import { PAGE_SELECTORS } from "./constants";
import { expect, test } from "./utils";

test.describe("Work projects Index Page", () => {
	test.beforeEach(async ({ page, networkHandlers }) => {
		await page.setViewportSize({ width: 1440, height: 900 });

		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		await page.goto("/work");
		await page.waitForURL(/\/work\/?$/);
	});

	test("should load the projects index page", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toContain("Work Projects");
	});

	test("should display the work landing section", async ({ page }) => {
		const heading = page.getByRole("heading", { level: 1, name: /featured case studies/i });
		await expect(heading).toBeVisible();

		const intro = page.getByText(/a showcase of some of my open-source projects/i);
		await expect(intro).toBeVisible();
	});

	test("should display all project cards", async ({ page }) => {
		const cards = page.getByTestId("work-card");
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);

		for (const card of await cards.all()) {
			await expect(card).toBeVisible();
			const href = await card.getAttribute("href");
			expect(href).toMatch(/^\/work\/[a-z0-9-]+$/);

			const title = card.getByRole("heading");
			await expect(title).toBeVisible();
			await expect(card).not.toHaveAttribute("aria-label");
			await expect(card).toHaveAccessibleName(/.+/);
		}
	});

	test("should navigate to project detail page when clicking a project card", async ({ page }) => {
		const projectCards = page.getByTestId("work-card");
		const count = await projectCards.count();
		expect(count).toBeGreaterThan(0);

		const randomIndex = random(0, count - 1);
		const projectCard = projectCards.nth(randomIndex);
		const expectedTitle = await projectCard.getByRole("heading").textContent();
		const href = await projectCard.getAttribute("href");
		expect(href).toBeTruthy();

		await projectCard.click();
		await page.waitForURL(`**/work/**`);

		await expect(page).toHaveURL(new RegExp(`/work/${href?.split("/").at(-1) ?? ""}`));
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

		if (expectedTitle) {
			await expect(page.getByRole("heading", { level: 1 })).toHaveText(expectedTitle.trim());
		}
	});

	test("should display currently listening section on projects page", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links on projects page", async ({ page }) => {
		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");
		await expect(SOCIAL_LINKS).toBeVisible();
	});
});

test.describe("Project Detail Page", () => {
	test.beforeEach(async ({ page, networkHandlers }) => {
		await page.setViewportSize({ width: 1440, height: 900 });

		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		await page.goto("/work");
		await page.waitForURL(/\/work\/?$/);

		const projectCard = page.getByTestId("work-card").first();
		const href = await projectCard.getAttribute("href");
		expect(href).toBeTruthy();

		await page.goto(href!);
		await page.waitForURL(`**/work/**`);
	});

	test("should display project header information", async ({ page }) => {
		const title = page.getByTestId("work-detail-title");
		await expect(title).toBeVisible();

		const date = page.getByTestId("work-detail-date");
		await expect(date).toBeVisible();

		const intro = page.getByTestId("work-detail-intro");
		await expect(intro).toBeVisible();
	});

	test("should display project meta information", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /tech stack/i })).toBeVisible();
		await expect(page.getByRole("heading", { name: /source code/i })).toBeVisible();

		const sourceCodeLink = page.getByTestId("work-source-code-link");
		if ((await sourceCodeLink.count()) > 0) {
			await expect(sourceCodeLink.first()).toBeVisible();
		}
	});

	test("should display project content", async ({ page }) => {
		const content = page.locator("main");
		await expect(content).toBeVisible();

		const bodyCopy = page.locator("main p, main h2, main h3");
		const count = await bodyCopy.count();
		expect(count).toBeGreaterThan(0);
	});

	test("should display gallery images if available", async ({ page }) => {
		const gallery = page.locator("figure img");
		const count = await gallery.count();
		if (count > 0) {
			await expect(gallery.first()).toBeVisible();
		}
	});

	test("should display currently listening section", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links", async ({ page }) => {
		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");
		await expect(SOCIAL_LINKS).toBeVisible();
	});

	test("should have accessible navigation", async ({ page }) => {
		await expect(page.locator("header")).toBeVisible();
		await expect(page.getByTestId(PAGE_SELECTORS.logo)).toBeVisible();
	});
});
