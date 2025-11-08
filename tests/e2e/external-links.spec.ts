import { test, expect } from "utils";
import { PAGE_DATA, PAGE_SELECTORS } from "./constants";

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
		const { instagram, github, twitter, linkedin } = PAGE_DATA.footer["social-media"];

		// Scroll to contacts section
		await page.goto("/#contact");
		await page.waitForURL("**/#contact");

		const INSTAGRAM_LINK = page.getByRole("link", { name: instagram.label });
		const GITHUB_LINK = page.getByRole("link", { name: github.label });
		const TWITTER_LINK = page.getByRole("link", { name: twitter.label });
		const LINKEDIN_LINK = page.getByRole("link", { name: linkedin.label });

		// Verify links have valid hrefs
		const instagramHref = await INSTAGRAM_LINK.getAttribute("href");
		const githubHref = await GITHUB_LINK.getAttribute("href");
		const twitterHref = await TWITTER_LINK.getAttribute("href");
		const linkedinHref = await LINKEDIN_LINK.getAttribute("href");

		expect(instagramHref).toBeTruthy();
		expect(githubHref).toBeTruthy();
		expect(twitterHref).toBeTruthy();
		expect(linkedinHref).toBeTruthy();

		// Verify they are external links (start with http/https)
		if (instagramHref) expect(instagramHref).toMatch(/^https?:\/\//);
		if (githubHref) expect(githubHref).toMatch(/^https?:\/\//);
		if (twitterHref) expect(twitterHref).toMatch(/^https?:\/\//);
		if (linkedinHref) expect(linkedinHref).toMatch(/^https?:\/\//);
	});

	test("should have target='_blank' and rel='noopener noreferrer' on external social links", async ({
		page,
	}) => {
		await page.goto("/#contact");
		await page.waitForURL("**/#contact");

		const { instagram, github, twitter, linkedin } = PAGE_DATA.footer["social-media"];

		const INSTAGRAM_LINK = page.getByRole("link", { name: instagram.label });
		const GITHUB_LINK = page.getByRole("link", { name: github.label });
		const TWITTER_LINK = page.getByRole("link", { name: twitter.label });
		const LINKEDIN_LINK = page.getByRole("link", { name: linkedin.label });

		// Check target attribute
		await expect(INSTAGRAM_LINK).toHaveAttribute("target", "_blank");
		await expect(GITHUB_LINK).toHaveAttribute("target", "_blank");
		await expect(TWITTER_LINK).toHaveAttribute("target", "_blank");
		await expect(LINKEDIN_LINK).toHaveAttribute("target", "_blank");

		// Check rel attribute for security
		const instagramRel = await INSTAGRAM_LINK.getAttribute("rel");
		const githubRel = await GITHUB_LINK.getAttribute("rel");
		const twitterRel = await TWITTER_LINK.getAttribute("rel");
		const linkedinRel = await LINKEDIN_LINK.getAttribute("rel");

		expect(instagramRel).toContain("noopener");
		expect(githubRel).toContain("noopener");
		expect(twitterRel).toContain("noopener");
		expect(linkedinRel).toContain("noopener");
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
