import { expect, test } from "utils";
import LAST_FM_FIXTURE from "../mocks/last-fm.json";
import { PAGE_SELECTORS, SITE_CONFIG } from "./constants";

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
  test("should navigate to Projects page when clicking Projects link", async ({ page }) => {
    const PROJECTS_LINK = page.getByRole("link", {
      name: SITE_CONFIG.nav[0].accessibleLabel,
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
      name: SITE_CONFIG.nav[1].accessibleLabel,
    });

    await test.step("Click on Contact link", async () => {
      await CONTACT_LINK.click();
    });

    await test.step("Verify Contact section is visible", async () => {
      expect(await page.url()).toContain("#contact");
      const CONTACTS_TITLE = page.getByRole("heading", {
        level: 3,
      });
      await expect(CONTACTS_TITLE).toBeVisible();
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
        `${LAST_FM_FIXTURE.recenttracks.track[0].name}. This link will open in a new tab`
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
    const CONTACTS_TITLE = page.getByRole("heading", { level: 3 });

    await test.step("Scroll to the contacts section", async () => {
      await CONTACTS_TITLE.scrollIntoViewIfNeeded();
      await expect(CONTACTS_TITLE).toBeVisible();
    });

    await test.step("Check if all contact links are visible", async () => {
      for (const contact of SITE_CONFIG.contactLinks) {
        const LINK = page.getByRole("link", {
          name: contact.accessibleLabel,
        });
        await expect(LINK).toBeVisible();
      }
    });
  });
});
