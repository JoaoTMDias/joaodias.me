import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { random } from "@jtmdias/js-utilities";
import PAGE_CONTENT from "../../src/data/index.json";
import LAST_FM_FIXTURE from "../mocks/last-fm.json";
import { SelectedProjects } from "../../src/data/content-types";

const PAGE_SELECTORS = {
  logo: "logo",
  topNav: "Top Navigation",
  topNavLink: "top-nav-link",
  profilePicture: "profile-picture",
  fakeCopyright: "fake-copyright",
  about: "#about",
  introSubtitle: "intro-subtitle",
  introTitle: "intro-title",
  employerLink: "employer-link",
  skill: "skills-item",
  bioPicture: "bio-image",
  bioIntro: "bio-intro",
  bioDescription: "bio-description",
  experience: "professional-experience",
  experienceItem: "experience-item",
  work: "#work",
  workDescription: "#work-description",
  workList: "work-list",
  workItems: {
    item: "work-item",
    title: "work-item-title",
    subtitle: "work-item-subtitle",
    skillsList: "work-item-skills",
    skill: "work-item-skill",
  },
  currentlyListening: {
    container: "currently-listening",
    mainTitle: "currently-listening-main-title",
    albumCover: "currently-listening-album-cover",
    song: "currently-listening-song",
    artist: "currently-listening-artist",
    album: "currently-listening-album",
  },
} as const;

const PAGE_DATA: SelectedProjects = PAGE_CONTENT;

test.beforeEach(async ({ page }) => {
  await page.route("https://ws.audioscrobbler.com/2.0/**", (route) => {
    return route.fulfill({ path: "./tests/mocks/last-fm.json" });
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  expect(await page.url()).toContain("http://localhost:4321/");
});

test.describe("Homepage", () => {
  test("should load the website", async ({ page }) => {
    const PAGE_TITLE = await page.title();

    expect(PAGE_TITLE).toBe(PAGE_DATA.title);
  });

  test("should load the hero section correctly", async ({ page }) => {
    // Logo should be visible
    const PAGE_LOGO = page.getByTestId(PAGE_SELECTORS.logo);
    await expect(PAGE_LOGO).toBeVisible();

    // Top Navigation links should all be visible and their targets should also be on the DOM
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

test.describe("Intro", () => {
  test("should be possible to visit the section by clicking on the top nav link", async ({
    page,
  }) => {
    const NAV_LINK = page.getByRole("link", { name: PAGE_DATA.header["main-navigation"][0].label });
    await NAV_LINK.click();

    expect(await page.url()).toContain("#about");

    const ABOUT_SECTION = page.locator(PAGE_SELECTORS.about);
    await expect(ABOUT_SECTION).toBeVisible();

    const INTRO_SUBTITLE = page.getByTestId(PAGE_SELECTORS.introSubtitle);
    await expect(INTRO_SUBTITLE).toHaveText(PAGE_DATA.about.intro.subtitle);

    const INTRO_TITLE = page.getByTestId(PAGE_SELECTORS.introTitle);
    await expect(INTRO_TITLE).toHaveText(
      "I'm João, a web developer and accessibility advocate from Coimbra, Portugal"
    );
  });

  test("The link to the employer is correct", async ({ page }) => {
    const EXPECTED_LINK = PAGE_DATA.about.intro["currently-at"].href;
    const EMPLOYER_LINK = page.getByTestId(PAGE_SELECTORS.employerLink);
    await EMPLOYER_LINK.scrollIntoViewIfNeeded();
    await expect(EMPLOYER_LINK).toHaveAttribute("href", EXPECTED_LINK);
  });
});

test.describe("Skills", () => {
  test("should display all skills on the page", async ({ page }) => {
    const SKILLS = page.locator(".skills");
    await SKILLS.scrollIntoViewIfNeeded();
    await expect(SKILLS).toBeVisible();

    const SKILLS_LIST = await page.getByTestId(PAGE_SELECTORS.skill).all();

    for (const skill of SKILLS_LIST) {
      expect(skill).toBeDefined();
    }
  });
});

test.describe("Bio", () => {
  test("should display all elements", async ({ page }) => {
    const BIO_PICTURE = await page.getByTestId(PAGE_SELECTORS.bioPicture);
    const BIO_INTRO = await page.getByTestId(PAGE_SELECTORS.bioIntro);
    const BIO_DESCRIPTION = await page.getByTestId(PAGE_SELECTORS.bioDescription).all();

    await expect(BIO_PICTURE).toBeVisible();
    await expect(BIO_INTRO).toBeVisible();
    await expect(BIO_DESCRIPTION.length).toBeGreaterThan(0);
  });
});

test.describe("Work Experience", () => {
  test("should display all elements", async ({ page }) => {
    const EXPERIENCE = page.getByTestId(PAGE_SELECTORS.experience);
    const PRESENT_JOB = EXPERIENCE.locator(".present");
    const PAST_JOBS = EXPERIENCE.locator(".past");

    await EXPERIENCE.scrollIntoViewIfNeeded();
    await expect(EXPERIENCE).toBeDefined();

    const CURRENT_JOB = await PRESENT_JOB.locator(
      `[data-testid="${PAGE_SELECTORS.experienceItem}"][data-current]`
    );
    const OTHER_JOBS = await PAST_JOBS.locator(
      `[data-testid="${PAGE_SELECTORS.experienceItem}"]:not([data-current]) .item`
    ).all();

    expect(CURRENT_JOB).toBeDefined();
    expect(OTHER_JOBS).toHaveLength(6);

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

test.describe("Selected Work", () => {
  test("should display all elements", async ({ page }) => {
    // Section should exist and have an accessible description
    const WORK_SECTION = page.locator(PAGE_SELECTORS.work);
    const WORK_DESCRIPTION = page.locator(PAGE_SELECTORS.workDescription);
    const WORK_LIST = page.getByTestId(PAGE_SELECTORS.workList);
    const WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();

    await WORK_SECTION.scrollIntoViewIfNeeded();
    await expect(WORK_SECTION).toBeVisible();
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
        `${ITEM_DATA.title}, ${ITEM_DATA.shortDescription}`
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

  test("should open a project and display its contents", async ({ page }) => {
    const RANDOM_INDEX = random(0, PAGE_DATA.work.data.length - 1);
    const CHOSEN_ITEM_DATA = PAGE_DATA.work.data[RANDOM_INDEX];

    const ALL_WORK_ITEMS = await page.getByTestId(PAGE_SELECTORS.workItems.item).all();
    const WORK_ITEM = ALL_WORK_ITEMS[RANDOM_INDEX];

    await WORK_ITEM.scrollIntoViewIfNeeded();
    await expect(WORK_ITEM).toBeVisible();
    await WORK_ITEM.click();

    // @todo check the rest of the content
  });
});

test.describe("Currently Playing", () => {
  test("should display the currently playing song", async ({ page }) => {
    const { container, mainTitle, albumCover, song, album, artist } =
      PAGE_SELECTORS.currentlyListening;

    const CONTAINER = page.getByTestId(container);
    const ALBUM_COVER = page.getByTestId(albumCover);
    const SONG = page.getByTestId(song);
    const ALBUM = page.getByTestId(album);
    const ARTIST = page.getByTestId(artist);

    await CONTAINER.scrollIntoViewIfNeeded();
    await expect(CONTAINER).toBeVisible();
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

test.describe("Contacts", () => {
  test("should display the social media links", async ({ page }) => {
    const { title, instagram, github, twitter, linkedin } = PAGE_DATA.footer["social-media"];

    const CONTACTS_TITLE = page.getByRole("heading", { level: 3, name: title });
    const INSTAGRAM_LINK = page.getByRole("link", { name: instagram.label });
    const GITHUB_LINK = page.getByRole("link", { name: github.label });
    const TWITTER_LINK = page.getByRole("link", { name: twitter.label });
    const LINKEDIN_LINK = page.getByRole("link", { name: linkedin.label });

    await expect(CONTACTS_TITLE).toBeVisible();
    await expect(INSTAGRAM_LINK).toBeVisible();
    await expect(GITHUB_LINK).toBeVisible();
    await expect(TWITTER_LINK).toBeVisible();
    await expect(LINKEDIN_LINK).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("should have no accessibility violations", async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
