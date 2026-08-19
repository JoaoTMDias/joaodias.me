import LAST_FM_FIXTURE from "../mocks/last-fm.json";
import { PAGE_SELECTORS, SITE_CONFIG } from "./constants";
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

test.describe("Navigation", () => {
	test("should navigate to Work page when clicking Work link", async ({ page }) => {
		const WORK_LINK = page.getByRole("banner").getByRole("link", {
			name: SITE_CONFIG.nav[3].title,
			exact: true,
		});

		await test.step("Click on Work link", async () => {
			await expect(WORK_LINK).toBeVisible();
			await WORK_LINK.click();
			await page.waitForURL(/\/work(?:\/)?(?:\?.*)?$/);
		});

		await test.step("Verify Work page loaded", async () => {
			await expect(page).toHaveURL(/\/work(?:\/)?(?:\?.*)?$/);
			await expect(page).toHaveTitle(/Work/i);
		});
	});

	test("should navigate to About page when clicking About me link", async ({ page }) => {
		const ABOUT_LINK = page.getByRole("banner").getByRole("link", {
			name: SITE_CONFIG.nav[1].title,
			exact: true,
		});

		await test.step("Click on About me link", async () => {
			await expect(ABOUT_LINK).toBeVisible();
			await ABOUT_LINK.click();
			await page.waitForURL(/\/about(?:\/)?(?:\?.*)?$/);
		});

		await test.step("Verify About page loaded", async () => {
			await expect(page).toHaveURL(/\/about(?:\/)?(?:\?.*)?$/);
			await expect(page).toHaveTitle(/About/i);
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
		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");

		await test.step("Scroll to the social links area", async () => {
			await SOCIAL_LINKS.scrollIntoViewIfNeeded();
			await expect(SOCIAL_LINKS).toBeVisible();
		});

		await test.step("Check if all contact links are visible", async () => {
			for (const contact of SITE_CONFIG.contactLinks) {
				const LINK = SOCIAL_LINKS.getByRole("link", {
					name: new RegExp(contact.title, "i"),
					exact: false,
				});
				await expect(LINK).toBeVisible();
			}
		});
	});
});
