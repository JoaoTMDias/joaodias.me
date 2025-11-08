import { random } from "@jtmdias/js-utilities";
import { expect, test } from "utils";
import { PAGE_DATA, PAGE_SELECTORS } from "./constants";

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

	test("should load the hero section correctly", async ({ page }) => {
		await test.step("Logo should be visible", async () => {
			const PAGE_LOGO = page.getByTestId(PAGE_SELECTORS.logo);
			await expect(PAGE_LOGO).toBeVisible();
		});

		await test.step("Top Navigation links should be visible", async () => {
			const PAGE_TOP_NAV = page.getByRole("navigation", { name: PAGE_SELECTORS.topNav });
			await expect(PAGE_TOP_NAV).toBeVisible();

			const PAGE_TOP_NAV_LINKS = await page.getByTestId(PAGE_SELECTORS.topNavLink).all();

			// Verify we have the correct number of navigation links (Projects and Contact)
			expect(PAGE_TOP_NAV_LINKS).toHaveLength(PAGE_DATA.header["main-navigation"].length);

			for (const link of PAGE_TOP_NAV_LINKS) {
				expect(link).toBeVisible();
				const href = await link.getAttribute("href");
				expect(href).toBeTruthy();
			}

			// Verify the first link is Projects
			const PROJECTS_LINK = page.getByRole("link", {
				name: PAGE_DATA.header["main-navigation"][0].label,
			});
			await expect(PROJECTS_LINK).toBeVisible();
			await expect(PROJECTS_LINK).toHaveAttribute(
				"href",
				PAGE_DATA.header["main-navigation"][0].href,
			);

			// Verify the second link is Contact
			const CONTACT_LINK = page.getByRole("link", {
				name: PAGE_DATA.header["main-navigation"][1].label,
			});
			await expect(CONTACT_LINK).toBeVisible();
			await expect(CONTACT_LINK).toHaveAttribute(
				"href",
				PAGE_DATA.header["main-navigation"][1].href,
			);

			// Main Photo should be visible
			const MAIN_PHOTO = page.getByTestId(PAGE_SELECTORS.profilePicture);
			await expect(MAIN_PHOTO).toBeVisible();

			// And the fake copyright should be visible
			const FAKE_COPYRIGHT = page.getByTestId(PAGE_SELECTORS.fakeCopyright);
			await expect(FAKE_COPYRIGHT).toBeVisible();
		});
	});
});

test.describe("Intro", () => {
	test("should display intro section content", async ({ page }) => {
		await test.step("Scroll to the about section", async () => {
			// Navigate directly to the section since it's no longer in the nav
			await page.goto("/#about");
		});

		await test.step("Check if the section is visible", async () => {
			const ABOUT_SECTION = page.locator(PAGE_SELECTORS.about);
			await expect(ABOUT_SECTION).toBeVisible();

			const INTRO_SUBTITLE = page.getByTestId(PAGE_SELECTORS.introSubtitle);
			await expect(INTRO_SUBTITLE).toHaveText(PAGE_DATA.about.intro.subtitle);

			const INTRO_TITLE = page.getByTestId(PAGE_SELECTORS.introTitle);
			await expect(INTRO_TITLE).toHaveText(
				"I'm João, a Frontend Engineer specializing in Web Accessibility from Coimbra, Portugal",
			);
		});
	});

	test("The link to the employer is correct", async ({ page }) => {
		const EXPECTED_LINK = PAGE_DATA.about.intro["currently-at"].href;
		const EMPLOYER_LINK = page.getByTestId(PAGE_SELECTORS.employerLink);

		await test.step("Scroll to the employer link", async () => {
			await EMPLOYER_LINK.scrollIntoViewIfNeeded();
		});

		await test.step("Check if the link is correct", async () => {
			await expect(EMPLOYER_LINK).toHaveAttribute("href", EXPECTED_LINK);
		});
	});
});

test.describe("Skills", () => {
	test("should display all skills on the page", async ({ page }) => {
		const SKILLS = page.locator(".skills");

		await test.step("Scroll to the skills section", async () => {
			await SKILLS.scrollIntoViewIfNeeded();
			await expect(SKILLS).toBeVisible();
		});

		await test.step("Check if all skills are visible", async () => {
			const SKILLS_LIST = await page.getByTestId(PAGE_SELECTORS.skill).all();

			for (const skill of SKILLS_LIST) {
				expect(skill).toBeDefined();
			}
		});
	});
});

test.describe("Bio", () => {
	test("should display all elements", async ({ page }) => {
		const BIO_PICTURE = await page.getByTestId(PAGE_SELECTORS.bioPicture);
		const BIO_INTRO = await page.getByTestId(PAGE_SELECTORS.bioIntro);
		const BIO_DESCRIPTION = await page.getByTestId(PAGE_SELECTORS.bioDescription).all();

		await test.step("Scroll to the bio section", async () => {
			await BIO_PICTURE.scrollIntoViewIfNeeded();
		});

		await test.step("Check if all elements are visible", async () => {
			await expect(BIO_PICTURE).toBeVisible();
			await expect(BIO_INTRO).toBeVisible();
			await expect(BIO_DESCRIPTION.length).toBeGreaterThan(0);
		});
	});
});

test.describe("Work Experience", () => {
	test("should display all elements", async ({ page }) => {
		const EXPERIENCE = page.getByTestId(PAGE_SELECTORS.experience);
		const PRESENT_JOB = EXPERIENCE.locator(".present");
		const PAST_JOBS = EXPERIENCE.locator(".past");

		await test.step("Scroll to the experience section", async () => {
			await EXPERIENCE.scrollIntoViewIfNeeded();
			await expect(EXPERIENCE).toBeDefined();
		});

		await test.step("Check if all elements are visible", async () => {
			const CURRENT_JOB = await PRESENT_JOB.locator(
				`[data-testid="${PAGE_SELECTORS.experienceItem}"][data-current]`,
			);
			const OTHER_JOBS = await PAST_JOBS.locator(
				`[data-testid="${PAGE_SELECTORS.experienceItem}"]:not([data-current]) .item`,
			).all();

			expect(CURRENT_JOB).toBeDefined();
			expect(OTHER_JOBS).toHaveLength(6);
		});

		await test.step("Check if the download button works", async () => {
			// The download button should be visible and the PDF should be available
			const DOWNLOAD_BUTTON = page.getByRole("link", {
				name: PAGE_DATA.about.experience.download.label,
			});
			await expect(DOWNLOAD_BUTTON).toBeVisible();

			const downloadLink = await DOWNLOAD_BUTTON.getAttribute("href");
			const response = await page.request.get(downloadLink!);
			expect(response.status()).toBe(200);
		});
	});
});

test.describe("Selected Work", () => {
	test("should display all elements", async ({ page }) => {
		// Section should exist and have an accessible description
		const WORK_SECTION = page.locator(PAGE_SELECTORS.work);
		const WORK_DESCRIPTION = page.locator(PAGE_SELECTORS.workDescription);
		const WORK_LIST = page.getByTestId(PAGE_SELECTORS.workList);
		const WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();

		await test.step("Scroll to the work section", async () => {
			await WORK_SECTION.scrollIntoViewIfNeeded();
			await expect(WORK_SECTION).toBeVisible();
		});

		await test.step("Check if all elements are visible", async () => {
			await expect(WORK_DESCRIPTION).toHaveText(PAGE_DATA.work.description);

			await expect(WORK_LIST).toBeVisible();

			// Each work item should be a link (not a button) and have:
			// - a valid href to a project page (slug-based)
			// - the correct aria-label
			// - the correct title
			// - the correct subtitle
			// - the correct amount of skills
			// - "View details" text instead of "Open Project"
			expect(WORK_ITEMS.length).toBeGreaterThan(0);

			for (const [_, item] of WORK_ITEMS.entries()) {
				// Verify it's a link element, not a button
				const tagName = await item.evaluate((el) => el.tagName.toLowerCase());
				expect(tagName).toBe("a");

				// Check that the href points to a project page (slug-based)
				const href = await item.getAttribute("href");
				expect(href).toBeTruthy();
				expect(href).toMatch(/^\/projects\/[a-z0-9-]+$/);

				// Check that the id attribute matches the slug from href
				const id = await item.getAttribute("id");
				expect(id).toBeTruthy();
				if (href) {
					const slugFromHref = href.replace("/projects/", "");
					expect(id).toBe(slugFromHref);
				}

				// Verify aria-label exists and is properly formatted
				const ariaLabel = await item.getAttribute("aria-label");
				expect(ariaLabel).toBeTruthy();
				expect(ariaLabel).toContain(",");

				const TITLE = await item.getByTestId(PAGE_SELECTORS.workItems.title);
				const SUBTITLE = await item.getByTestId(PAGE_SELECTORS.workItems.subtitle);
				const SKILLS_LIST = await item.getByTestId(PAGE_SELECTORS.workItems.skill).all();
				const VIEW_DETAILS_TEXT = await item.getByTestId("work-item-open");

				// Verify title and subtitle are visible
				await expect(TITLE).toBeVisible();
				await expect(SUBTITLE).toBeVisible();

				// Verify skills are displayed
				expect(SKILLS_LIST.length).toBeGreaterThan(0);

				// Verify "View details" text is present (not "Open Project")
				await expect(VIEW_DETAILS_TEXT).toBeVisible();
				const viewDetailsText = await VIEW_DETAILS_TEXT.textContent();
				expect(viewDetailsText).toContain("View details");
			}
		});
	});

	test("should navigate to project detail page when clicking a work item", async ({ page }) => {
		const ALL_WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
		expect(ALL_WORK_ITEMS.length).toBeGreaterThan(0);

		const RANDOM_INDEX = random(0, ALL_WORK_ITEMS.length - 1);
		const WORK_ITEM = ALL_WORK_ITEMS[RANDOM_INDEX];

		// Get the project title and href before navigation
		const PROJECT_TITLE_ELEMENT = WORK_ITEM.getByTestId(PAGE_SELECTORS.workItems.title);
		const EXPECTED_TITLE = await PROJECT_TITLE_ELEMENT.textContent();
		const href = await WORK_ITEM.getAttribute("href");
		expect(href).toBeTruthy();

		await test.step("Scroll to the work section", async () => {
			await WORK_ITEM.scrollIntoViewIfNeeded();
			await expect(WORK_ITEM).toBeVisible();
		});

		await test.step("Click on a work item link", async () => {
			await WORK_ITEM.click();
			// Wait for navigation to project detail page
			await page.waitForURL(`**/projects/**`);
		});

		await test.step("Check project detail page content", async () => {
			// Verify we're on a project detail page
			const url = page.url();
			expect(url).toContain("/projects/");
			if (href) {
				expect(url).toContain(href);
			}

			// Check that the project title is visible (with transition name)
			const PROJECT_TITLE = page.locator("h1.project__header-title");
			await expect(PROJECT_TITLE).toBeVisible();
			if (EXPECTED_TITLE) {
				await expect(PROJECT_TITLE).toHaveText(EXPECTED_TITLE.trim());
			}

			// Check that the project header intro is visible
			const PROJECT_INTRO = page.locator(".project__header-intro");
			await expect(PROJECT_INTRO).toBeVisible();

			// Check that project meta information is visible
			const PROJECT_META = page.locator(".project__meta");
			await expect(PROJECT_META).toBeVisible();

			// Check that skills section is displayed
			const SKILLS_TITLE = PROJECT_META.locator(".project__meta-title", { hasText: "Skills" });
			await expect(SKILLS_TITLE).toBeVisible();

			// Check that skills list is present
			const SKILLS_LIST = PROJECT_META.locator(".project__meta-list");
			await expect(SKILLS_LIST).toBeVisible();

			// Check that date section is displayed
			const DATE_TITLE = PROJECT_META.locator(".project__meta-title", { hasText: "Date" });
			await expect(DATE_TITLE).toBeVisible();

			// Check that source code section is displayed
			const SOURCE_CODE_TITLE = PROJECT_META.locator(".project__meta-title", {
				hasText: "Source Code",
			});
			await expect(SOURCE_CODE_TITLE).toBeVisible();
		});
	});
});
