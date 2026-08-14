import { SITE_CONFIG } from "./constants";
import { expect, test } from "./utils";

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
		await page.goto("/#links-to-my-social-media");
		await page.waitForURL("**/#links-to-my-social-media");

		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");
		await expect(SOCIAL_LINKS).toBeVisible();

		for (const contact of SITE_CONFIG.contactLinks) {
			const LINK = SOCIAL_LINKS.getByRole("link", {
				name: new RegExp(contact.title, "i"),
			});
			await expect(LINK).toBeVisible();

			const href = await LINK.getAttribute("href");
			expect(href).toBeTruthy();
			expect(href).toBe(contact.link);
			if (href) expect(href).toMatch(/^https?:\/\//);
		}
	});

	test("should have target='_blank' and rel='noopener noreferrer' on external social links", async ({
		page,
	}) => {
		await page.goto("/#links-to-my-social-media");
		await page.waitForURL("**/#links-to-my-social-media");

		const SOCIAL_LINKS = page.locator("#links-to-my-social-media");

		for (const contact of SITE_CONFIG.contactLinks) {
			const LINK = SOCIAL_LINKS.getByRole("link", {
				name: new RegExp(contact.title, "i"),
			});

			await expect(LINK).toHaveAttribute("target", "_blank");

			const rel = await LINK.getAttribute("rel");
			expect(rel).toContain("noopener");
		}
	});

	test("should validate source code links on project detail pages when present", async ({
		page,
		networkHandlers,
	}) => {
		await test.step("Intercept Last.fm API", async () => {
			await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
				method: "GET",
				fixture: "./tests/mocks/last-fm.json",
			});
		});

		await page.goto("/work");
		await page.waitForURL("**/work");

		const WORK_ITEMS = await page.locator('a[href^="/work/"]').all();
		expect(WORK_ITEMS.length).toBeGreaterThan(0);

		let foundSourceCodeLink = false;

		for (const projectLink of WORK_ITEMS) {
			const href = await projectLink.getAttribute("href");
			if (!href) continue;

			await page.goto(href);
			await page.waitForURL("**/work/**");

			const SOURCE_CODE_LINK = page.getByRole("link", { name: /view source code/i });
			if ((await SOURCE_CODE_LINK.count()) === 0) {
				continue;
			}

			await expect(SOURCE_CODE_LINK).toBeVisible();
			const sourceCodeHref = await SOURCE_CODE_LINK.getAttribute("href");
			expect(sourceCodeHref).toBeTruthy();
			if (sourceCodeHref) {
				expect(sourceCodeHref).toMatch(/^https?:\/\//);
			}

			await expect(SOURCE_CODE_LINK).toHaveAttribute("target", "_blank");
			const rel = await SOURCE_CODE_LINK.getAttribute("rel");
			expect(rel).toContain("noopener");
			foundSourceCodeLink = true;
			break;
		}

		expect(foundSourceCodeLink).toBeTruthy();
	});
});
