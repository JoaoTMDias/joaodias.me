import { PAGE_SELECTORS } from "./constants";
import { expect, test } from "./utils";

test.beforeEach(async ({ page, networkHandlers }) => {
	await page.setViewportSize({ width: 1440, height: 900 });

	await test.step("Intercept Last.fm API", async () => {
		await networkHandlers.intercept("https://ws.audioscrobbler.com/2.0/**", {
			method: "GET",
			fixture: "./tests/mocks/last-fm.json",
		});
	});
});

test.describe("Skip Links", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");
	});

	test("should display skip links when focused", async ({ page }) => {
		// Skip links are typically hidden until focused
		// Press Tab to focus the first skip link
		await page.keyboard.press("Tab");

		// Check that skip links are visible (they should appear when focused)
		const skipLinks = page.locator('[class*="skip"]');
		const skipLinksCount = await skipLinks.count();
		expect(skipLinksCount).toBeGreaterThan(0);
	});

	test("should navigate to content section when clicking the main skip link", async ({ page }) => {
		await page.waitForLoadState("networkidle");

		const skipToContent = page.getByRole("link", {
			name: "Skip to main content of the page",
		});

		await skipToContent.focus();
		await expect(skipToContent).toBeVisible();
		await skipToContent.click();

		await page.waitForURL("**/#content");
		await expect(page.locator("#content")).toBeVisible();
		expect(page.url()).toContain("#content");
	});

	test("should navigate to contact section when clicking the social skip link", async ({
		page,
	}) => {
		await page.waitForLoadState("networkidle");

		const skipToContact = page.getByRole("link", {
			name: "Skip to my Social media links",
		});

		await skipToContact.focus();
		await expect(skipToContact).toBeVisible();
		await skipToContact.click();

		await page.waitForURL("**/#links-to-my-social-media");
		await expect(page.locator("#links-to-my-social-media")).toBeVisible();
		expect(page.url()).toContain("#links-to-my-social-media");
	});
});

test.describe("Responsive Navigation and Theme", () => {
	test("should open the mobile navigation menu on small screens", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		const MOBILE_TOGGLE = page.locator("#mobile-navigation-toggle");
		const MOBILE_NAV = page.locator("#mobile-navigation");

		await expect(MOBILE_TOGGLE).toBeVisible();
		await expect(MOBILE_NAV).toBeHidden();

		await MOBILE_TOGGLE.click();
		await expect(MOBILE_NAV).toBeVisible();

		const languageSwitcher = MOBILE_NAV.getByRole("link", {
			name: "Language: Português",
		});
		await expect(languageSwitcher).toBeVisible();
		await expect(languageSwitcher).toHaveAttribute("href", "/pt/");

		const MOBILE_LINKS = MOBILE_NAV.getByRole("link");
		await expect(MOBILE_LINKS.first()).toBeVisible();
		expect(await MOBILE_LINKS.count()).toBeGreaterThan(0);

		const currentPageLink = MOBILE_NAV.locator('a[aria-current="page"]');
		const currentPageIcon = currentPageLink.locator("svg");
		const linkColor = await currentPageIcon.evaluate(
			(element) => getComputedStyle(element.parentElement as HTMLElement).color,
		);

		expect(await currentPageIcon.evaluate((element) => element.namespaceURI)).toBe(
			"http://www.w3.org/2000/svg",
		);
		await expect(currentPageIcon).toHaveCSS("fill", linkColor);
		await expect(currentPageIcon.locator("path")).not.toHaveAttribute("fill");
	});

	test("should keep every mobile navigation link reachable in a short viewport", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 220 });
		await page.goto("/");

		const mobileToggle = page.locator("#mobile-navigation-toggle");
		const mobileNavigation = page.locator("#mobile-navigation");

		await mobileToggle.click();
		await expect(mobileNavigation).toBeVisible();

		const navigationMetrics = await mobileNavigation.evaluate((element) => ({
			overflowY: getComputedStyle(element).overflowY,
			clientHeight: element.clientHeight,
			scrollHeight: element.scrollHeight,
		}));

		expect(navigationMetrics.overflowY).toBe("auto");
		expect(navigationMetrics.scrollHeight).toBeGreaterThan(navigationMetrics.clientHeight);

		const lastLink = mobileNavigation.getByRole("link").last();
		await lastLink.focus();

		await expect(lastLink).toBeFocused();
		await expect(lastLink).toBeInViewport();
	});

	test("should toggle the theme switch and persist the preference", async ({ page }) => {
		await page.goto("/");
		await page.waitForURL("http://localhost:4321/");

		const themeLabel = page.locator("label:has(#theme-switch)");
		const THEME_SWITCH = page.getByRole("switch");
		await expect(THEME_SWITCH).toBeVisible();
		await expect(THEME_SWITCH).not.toHaveAttribute("aria-checked");
		await expect(THEME_SWITCH).toHaveAttribute("data-theme-switch-initialized", "true");

		const initialTheme = await page.evaluate(() =>
			document.documentElement.getAttribute("data-theme"),
		);
		const nextTheme = initialTheme === "dark" ? "light" : "dark";

		if (initialTheme === "dark") {
			await expect(THEME_SWITCH).toBeChecked();
		} else {
			await expect(THEME_SWITCH).not.toBeChecked();
		}

		await themeLabel.click();

		await expect(page.locator("html")).toHaveAttribute("data-theme", nextTheme);
		await expect(THEME_SWITCH).toHaveJSProperty("checked", nextTheme === "dark");
		expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(nextTheme);
	});

	test("should follow system theme changes without a saved preference", async ({ page }) => {
		await page.emulateMedia({ colorScheme: "dark" });
		await page.goto("/");

		const themeSwitch = page.getByRole("switch");
		await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
		await expect(themeSwitch).toBeChecked();

		await page.emulateMedia({ colorScheme: "light" });

		await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
		await expect(themeSwitch).not.toBeChecked();
		await expect(themeSwitch).not.toHaveAttribute("aria-checked");
	});
});

test.describe("Logo Navigation", () => {
	test("should navigate to homepage when clicking logo from projects page", async ({ page }) => {
		await page.goto("/work");
		await page.waitForURL("**/work");

		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();

		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});

	test("should navigate to homepage when clicking logo from project detail page", async ({
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

		const WORK_ITEMS = page.locator('a[href^="/work/"]');
		const WORK_ITEMS_COUNT = await WORK_ITEMS.count();
		expect(WORK_ITEMS_COUNT).toBeGreaterThan(0);

		const FIRST_PROJECT_LINK = WORK_ITEMS.first();
		const href = await FIRST_PROJECT_LINK.getAttribute("href");
		expect(href).toBeTruthy();

		await page.goto(href!);
		await page.waitForURL(`**/work/**`);

		// Click logo
		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();
		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});

	test("should navigate to homepage when clicking logo from about page", async ({ page }) => {
		await page.goto("/about");
		await page.waitForURL("**/about");

		const LOGO = page.getByTestId(PAGE_SELECTORS.logo);
		await expect(LOGO).toBeVisible();

		await LOGO.click();
		await page.waitForURL("http://localhost:4321/");

		expect(page.url()).toBe("http://localhost:4321/");
	});
});
