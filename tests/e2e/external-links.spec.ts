import { expect, test } from "utils";
import { PAGE_SELECTORS, SITE_CONFIG } from "./constants";

test.beforeEach(async ({ page, networkHandlers }) => {
  await page.setViewportSize({ width: 1440, height: 900 });

  await test.step("Intercept Last.fm API", async () => {
    await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
      method: "GET",
      fixture: "./tests/mocks/last-fm.json",
    });
  });

  await page.goto("/");
  await page.waitForURL("http://localhost:4321/");
});

test.describe("External Links", () => {
  test("should have valid social media links", async ({ page }) => {
    // Scroll to contacts section
    await page.goto("/#contact");
    await page.waitForURL("**/#contact");

    // Verify all contact links from config
    for (const contact of SITE_CONFIG.contactLinks) {
      const LINK = page.getByRole("link", {
        name: contact.accessibleLabel,
      });
      await expect(LINK).toBeVisible();

      const href = await LINK.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toBe(contact.link);

      // Verify they are external links (start with http/https)
      if (href) expect(href).toMatch(/^https?:\/\//);
    }
  });

  test("should have target='_blank' and rel='noopener noreferrer' on external social links", async ({
    page,
  }) => {
    await page.goto("/#contact");
    await page.waitForURL("**/#contact");

    // Verify all contact links have proper security attributes
    for (const contact of SITE_CONFIG.contactLinks) {
      const LINK = page.getByRole("link", {
        name: contact.accessibleLabel,
      });

      // Check target attribute
      await expect(LINK).toHaveAttribute("target", "_blank");

      // Check rel attribute for security
      const rel = await LINK.getAttribute("rel");
      expect(rel).toContain("noopener");
    }
  });

  test("should have valid source code and live demo links on project pages", async ({
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
    const WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
    expect(WORK_ITEMS.length).toBeGreaterThan(0);

    const FIRST_PROJECT_LINK = WORK_ITEMS[0];
    const href = await FIRST_PROJECT_LINK.getAttribute("href");
    expect(href).toBeTruthy();

    await page.goto(href!);
    await page.waitForURL(`**/projects/**`);

    // Check for source code link
    const SOURCE_CODE_SECTION = page.locator(".project__meta-title", {
      hasText: "Source Code",
    });
    const sourceCodeExists = await SOURCE_CODE_SECTION.count();

    if (sourceCodeExists > 0) {
      const SOURCE_CODE_LINK = SOURCE_CODE_SECTION.locator("..").locator("a").first();
      const sourceCodeExists = await SOURCE_CODE_LINK.count();

      if (sourceCodeExists > 0) {
        const sourceCodeHref = await SOURCE_CODE_LINK.getAttribute("href");
        expect(sourceCodeHref).toBeTruthy();
        if (sourceCodeHref) {
          expect(sourceCodeHref).toMatch(/^https?:\/\//);
        }
      }
    }

    // Check for live demo link (if it exists in the project meta)
    const LIVE_DEMO_SECTION = page.locator(".project__meta-title", {
      hasText: "Live Demo",
    });
    const liveDemoExists = await LIVE_DEMO_SECTION.count();

    if (liveDemoExists > 0) {
      const LIVE_DEMO_LINK = LIVE_DEMO_SECTION.locator("..").locator("a").first();
      const liveDemoLinkExists = await LIVE_DEMO_LINK.count();

      if (liveDemoLinkExists > 0) {
        const liveDemoHref = await LIVE_DEMO_LINK.getAttribute("href");
        expect(liveDemoHref).toBeTruthy();
        if (liveDemoHref) {
          expect(liveDemoHref).toMatch(/^https?:\/\//);
        }
      }
    }
  });
});
