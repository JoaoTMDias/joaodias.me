import { expect, test } from "utils";
import { PAGE_SELECTORS } from "./constants";

test.beforeEach(async ({ page, networkHandlers }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await test.step("Intercept Last.fm API", async () => {
    await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
      method: "GET",
      fixture: "./tests/mocks/last-fm.json",
    });
  });

  await page.goto("/about");
  await page.waitForURL("**/about");
});

test.describe("About Page", () => {
  test("should load the about page", async ({ page }) => {
    const PAGE_TITLE = await page.title();
    expect(PAGE_TITLE).toContain("About");
  });

  test("should display intro section", async ({ page }) => {
    const ABOUT_SECTION = page.locator("#content");
    await expect(ABOUT_SECTION).toBeVisible();

    const INTRO_SUBTITLE = page.getByTestId(PAGE_SELECTORS.introSubtitle);
    await expect(INTRO_SUBTITLE).toBeVisible();
  });

  test("should display skills section", async ({ page }) => {
    const SKILLS = page.locator(".skills");
    await expect(SKILLS).toBeVisible();
  });

  test("should display bio section", async ({ page }) => {
    const BIO_PICTURE = await page.getByTestId(PAGE_SELECTORS.bioPicture);
    await expect(BIO_PICTURE).toBeVisible();
  });

  test("should display experience section", async ({ page }) => {
    const EXPERIENCE = page.getByTestId(PAGE_SELECTORS.experience);
    await expect(EXPERIENCE).toBeVisible();
  });

  test("should display currently listening section", async ({ page }) => {
    const { container } = PAGE_SELECTORS.currentlyListening;
    const CONTAINER = page.getByTestId(container);
    await expect(CONTAINER).toBeVisible();
  });

  test("should display social links", async ({ page }) => {
    const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: "Social Media Links" });
    await expect(CONTACTS_TITLE).toBeVisible();
  });
});
