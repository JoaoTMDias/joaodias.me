import { test, expect } from "utils";
import AxeBuilder from "@axe-core/playwright";
import { random } from "@jtmdias/js-utilities";
import LAST_FM_FIXTURE from "../mocks/last-fm.json";
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

test.describe("Navigation", () => {
	test("should navigate to Projects page when clicking Projects link", async ({ page }) => {
		const PROJECTS_LINK = page.getByRole("link", {
			name: PAGE_DATA.header["main-navigation"][0].label,
		});

		await test.step("Click on Projects link", async () => {
			await PROJECTS_LINK.click();
			await page.waitForURL("**/projects");
		});

		await test.step("Verify Projects page loaded", async () => {
			expect(page.url()).toContain("/projects");
			const PAGE_TITLE = await page.title();
			expect(PAGE_TITLE).toContain("Projects");
		});
	});

	test("should navigate to Contact section when clicking Contact link", async ({ page }) => {
		const CONTACT_LINK = page.getByRole("link", {
			name: PAGE_DATA.header["main-navigation"][1].label,
		});

		await test.step("Click on Contact link", async () => {
			await CONTACT_LINK.click();
		});

		await test.step("Verify Contact section is visible", async () => {
			expect(await page.url()).toContain("#contact");
			const CONTACTS_TITLE = page.getByRole("heading", {
				level: 3,
				name: PAGE_DATA.footer["social-media"].title,
			});
			await expect(CONTACTS_TITLE).toBeVisible();
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

			for (const [index, item] of WORK_ITEMS.entries()) {
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

test.describe("Currently Playing", () => {
	test("should display the currently playing song", async ({ page }) => {
		const { container, albumCover, song, album, artist } = PAGE_SELECTORS.currentlyListening;

		const CONTAINER = page.getByTestId(container);
		const ALBUM_COVER = page.getByTestId(albumCover);
		const SONG = page.getByTestId(song);
		const ALBUM = page.getByTestId(album);
		const ARTIST = page.getByTestId(artist);

		await test.step("Scroll to the currently listening section", async () => {
			await CONTAINER.scrollIntoViewIfNeeded();
			await expect(CONTAINER).toBeVisible();
		});

		await test.step("Check if all elements are visible", async () => {
			await expect(ALBUM_COVER).toBeVisible();
			await expect(SONG).toBeVisible();
			await expect(SONG).toHaveText(
				`${LAST_FM_FIXTURE.recenttracks.track[0].name}. This link will open in a new tab`,
			);
			await expect(ALBUM).toBeVisible();
			await expect(ALBUM).toHaveText(LAST_FM_FIXTURE.recenttracks.track[0].album["#text"]);
			await expect(ARTIST).toBeVisible();
			await expect(ARTIST).toHaveText(LAST_FM_FIXTURE.recenttracks.track[0].artist["#text"]);
		});
	});
});

test.describe("Contacts", () => {
	test("should display the social media links", async ({ page }) => {
		const { title, instagram, github, twitter, linkedin } = PAGE_DATA.footer["social-media"];

		const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: title });
		const INSTAGRAM_LINK = page.getByRole("link", { name: instagram.label });
		const GITHUB_LINK = page.getByRole("link", { name: github.label });
		const TWITTER_LINK = page.getByRole("link", { name: twitter.label });
		const LINKEDIN_LINK = page.getByRole("link", { name: linkedin.label });

		await test.step("Scroll to the contacts section", async () => {
			await CONTACTS_TITLE.scrollIntoViewIfNeeded();
			await expect(CONTACTS_TITLE).toBeVisible();
		});

		await test.step("Check if all elements are visible", async () => {
			await expect(INSTAGRAM_LINK).toBeVisible();
			await expect(GITHUB_LINK).toBeVisible();
			await expect(TWITTER_LINK).toBeVisible();
			await expect(LINKEDIN_LINK).toBeVisible();
		});
	});
});

test.describe("Projects Index Page", () => {
	test.beforeEach(async ({ page }) => {
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

test.describe("Accessibility", () => {
	test("should have no accessibility violations on homepage", async ({ page }) => {
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
