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

			for (const link of PAGE_TOP_NAV_LINKS) {
				expect(link).toBeVisible();
				expect(link.getAttribute("href")).toBeTruthy();
			}

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
	test("should be possible to visit the section by clicking on the top nav link", async ({
		page,
	}) => {
		await test.step("Navigate to the About section", async () => {
			const NAV_LINK = page.getByRole("link", {
				name: PAGE_DATA.header["main-navigation"][0].label,
			});
			await NAV_LINK.click();
		});

		await test.step("Check if the section is visible", async () => {
			expect(await page.url()).toContain("#about");

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

			// Each work item should have:
			// - the correct id
			// - the correct aria-label
			// - the correct title
			// - the corret subtitle
			// - the correct amount of skills
			expect(WORK_ITEMS).toHaveLength(PAGE_DATA.work.data.length);

			for (const [index, item] of WORK_ITEMS.entries()) {
				const ITEM_DATA = PAGE_DATA.work.data[index];

				await expect(item).toHaveAttribute("id", ITEM_DATA.id);
				await expect(item).toHaveAttribute(
					"aria-label",
					`${ITEM_DATA.title}, ${ITEM_DATA.shortDescription}`,
				);

				const TITLE = await item.getByTestId(PAGE_SELECTORS.workItems.title);
				const SUBTITLE = await item.getByTestId(PAGE_SELECTORS.workItems.subtitle);
				const SKILLS_LIST = await item.getByTestId(PAGE_SELECTORS.workItems.skill).all();

				await expect(TITLE).toHaveText(ITEM_DATA.title);
				await expect(SUBTITLE).toHaveText(ITEM_DATA.shortDescription);
				expect(SKILLS_LIST).toHaveLength(ITEM_DATA.skills.length);

				for (const [index, skill] of SKILLS_LIST.entries()) {
					expect(skill).toHaveText(ITEM_DATA.skills[index]);
				}
			}
		});
	});

	// @todo this is still in progress
	test("[WIP] should open a project and display its contents", async ({ page }) => {
		const RANDOM_INDEX = random(0, PAGE_DATA.work.data.length - 1);
		const CHOSEN_ITEM_DATA = PAGE_DATA.work.data[RANDOM_INDEX];
		const ALL_WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
		const WORK_ITEM = ALL_WORK_ITEMS[RANDOM_INDEX];

		await test.step("Scroll to the work section", async () => {
			await WORK_ITEM.scrollIntoViewIfNeeded();
			await expect(WORK_ITEM).toBeVisible();
		});

		await test.step("Click on a work item", async () => {
			await WORK_ITEM.click();
		});

		// @todo check the rest of the content
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

test.describe("Accessibility", () => {
	test("should have no accessibility violations", async ({ page }) => {
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

		expect(accessibilityScanResults.violations).toEqual([]);
	});
});
