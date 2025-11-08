import { test, expect } from "utils";
import { random } from "@jtmdias/js-utilities";
import { PAGE_DATA, PAGE_SELECTORS } from "./constants";

test.describe("Projects Index Page", () => {
	test.beforeEach(async ({ page, networkHandlers }) => {
		await page.setViewportSize({ width: 1440, height: 900 });

		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		await page.goto("/projects");
		await page.waitForURL("**/projects");
	});

	test("should load the projects index page", async ({ page }) => {
		const PAGE_TITLE = await page.title();
		expect(PAGE_TITLE).toContain("Projects");
	});

	test("should display all projects", async ({ page }) => {
		const PROJECTS_HEADER = page.getByRole("heading", { level: 1, name: "All projects" });
		await expect(PROJECTS_HEADER).toBeVisible();

		const PROJECTS_GRID = page.locator(".projects__grid");
		await expect(PROJECTS_GRID).toBeVisible();

		const PROJECT_CARDS = await page.locator(".projects__card").all();
		expect(PROJECT_CARDS.length).toBeGreaterThan(0);

		for (const card of PROJECT_CARDS) {
			// Verify each card is a link
			const tagName = await card.evaluate((el) => el.tagName.toLowerCase());
			expect(tagName).toBe("a");

			// Verify href points to a project detail page
			const href = await card.getAttribute("href");
			expect(href).toBeTruthy();
			expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);

			// Verify aria-label exists
			const ariaLabel = await card.getAttribute("aria-label");
			expect(ariaLabel).toBeTruthy();

			// Verify thumbnail is present
			const THUMBNAIL = card.locator(".projects__card-thumbnail-image");
			await expect(THUMBNAIL).toBeVisible();

			// Verify title is present
			const TITLE = card.locator(".projects__card-content-title");
			await expect(TITLE).toBeVisible();

			// Verify subtitle is present
			const SUBTITLE = card.locator(".projects__card-content-subtitle");
			await expect(SUBTITLE).toBeVisible();

			// Verify skills are present
			const SKILLS = card.locator(".projects__card-skills");
			await expect(SKILLS).toBeVisible();
		}
	});

	test("should navigate to project detail page when clicking a project card", async ({ page }) => {
		const PROJECT_CARDS = await page.locator(".projects__card").all();
		expect(PROJECT_CARDS.length).toBeGreaterThan(0);

		const RANDOM_INDEX = random(0, PROJECT_CARDS.length - 1);
		const PROJECT_CARD = PROJECT_CARDS[RANDOM_INDEX];

		// Get the project title and href before navigation
		const PROJECT_TITLE_ELEMENT = PROJECT_CARD.locator(".projects__card-content-title");
		const EXPECTED_TITLE = await PROJECT_TITLE_ELEMENT.textContent();
		const href = await PROJECT_CARD.getAttribute("href");
		expect(href).toBeTruthy();

		await test.step("Click on a project card", async () => {
			await PROJECT_CARD.click();
			await page.waitForURL(`**/projects/**`);
		});

		await test.step("Verify project detail page loaded", async () => {
			const url = page.url();
			expect(url).toContain("/projects/");
			if (href) {
				expect(url).toContain(href);
			}

			// Check that the project title matches
			const PROJECT_TITLE = page.locator("h1");
			await expect(PROJECT_TITLE).toBeVisible();
			if (EXPECTED_TITLE) {
				await expect(PROJECT_TITLE).toHaveText(EXPECTED_TITLE.trim());
			}
		});
	});

	test("should display currently listening section on projects page", async ({ page }) => {
		const { container } = PAGE_SELECTORS.currentlyListening;
		const CONTAINER = page.getByTestId(container);
		await expect(CONTAINER).toBeVisible();
	});

	test("should display social links on projects page", async ({ page }) => {
		const { title } = PAGE_DATA.footer["social-media"];
		const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: title });
		await expect(CONTACTS_TITLE).toBeVisible();
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
	});

	test("should display project header information", async ({ page }) => {
		// Check project title
		const PROJECT_TITLE = page.locator("h1.project__header-title");
		await expect(PROJECT_TITLE).toBeVisible();

		// Check project date
		const PROJECT_DATE = page.locator(".project__header-date");
		await expect(PROJECT_DATE).toBeVisible();

		// Check project intro/description
		const PROJECT_INTRO = page.locator(".project__header-intro");
		await expect(PROJECT_INTRO).toBeVisible();
	});

	test("should display project meta information", async ({ page }) => {
		const PROJECT_META = page.locator(".project__meta");
		await expect(PROJECT_META).toBeVisible();

		// Check Skills section
		const SKILLS_TITLE = PROJECT_META.locator(".project__meta-title", { hasText: "Skills" });
		await expect(SKILLS_TITLE).toBeVisible();

		// Check Date section
		const DATE_TITLE = PROJECT_META.locator(".project__meta-title", { hasText: "Date" });
		await expect(DATE_TITLE).toBeVisible();

		// Check Source Code section
		const SOURCE_CODE_TITLE = PROJECT_META.locator(".project__meta-title", {
			hasText: "Source Code",
		});
		await expect(SOURCE_CODE_TITLE).toBeVisible();
	});

	test("should display project content sections", async ({ page }) => {
		// Check for Accessibility Considerations section
		const ACCESSIBILITY_SECTION = page.locator("text=Accessibility Considerations");
		await expect(ACCESSIBILITY_SECTION).toBeVisible();

		// Check for Technical Approach section
		const TECHNICAL_SECTION = page.locator("text=Technical Approach");
		await expect(TECHNICAL_SECTION).toBeVisible();
	});

	test("should display cover image if available", async ({ page }) => {
		const COVER_IMAGE = page.locator(".project__cover-image");
		const coverExists = await COVER_IMAGE.count();
		// Cover image is optional, so we just check if it exists when present
		if (coverExists > 0) {
			await expect(COVER_IMAGE.first()).toBeVisible();
		}
	});

	test("should display gallery images if available", async ({ page }) => {
		const GALLERY = page.locator(".project__gallery");
		const galleryExists = await GALLERY.count();
		// Gallery is optional, so we just check if it exists when present
		if (galleryExists > 0) {
			await expect(GALLERY.first()).toBeVisible();
			const GALLERY_IMAGES = await GALLERY.locator(".project__gallery-image").all();
			expect(GALLERY_IMAGES.length).toBeGreaterThan(0);
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

	test("should have accessible navigation", async ({ page }) => {
		// Check that header navigation is present
		const HEADER = page.locator("header");
		await expect(HEADER).toBeVisible();

		// Check that logo link is present
		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();
	});
});

