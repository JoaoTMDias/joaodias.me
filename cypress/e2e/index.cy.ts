import PAGE_CONTENT from "../../src/data/index.json";
import { SelectedProjects } from "../../src/data/content-types";
import setupLayout from "../helpers/setupLayout";
import LastFMFixture from "../fixtures/last-fm.json";

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
    skill: "work-item-skill"
  },
  currentlyListening: {
    container: "currently-listening",
    mainTitle: "currently-listening-main-title",
    albumCover: "currently-listening-album-cover",
    song: "currently-listening-song",
    artist: "currently-listening-artist",
    album: "currently-listening-album"
  }
}

const PAGE_DATA: SelectedProjects = PAGE_CONTENT;

beforeEach(() => {
  cy.intercept("GET", "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jtmdias&api_key=60caa5e07c4a12ec3d677cf8c2f6f804&format=json", { fixture: "last-fm.json" }).as("getRecentTracks");
  cy.injectAxe();
  setupLayout();
  cy.wait("@getRecentTracks");

});

describe("Homepage", () => {
  it("should load the website", () => {
    cy.url().should("include", "http://localhost:3000/");
    cy.title().should("equal", PAGE_DATA.title);
  });

  it("should load the hero section correctly", () => {
    // Logo should be visible
    cy.findByTestId(PAGE_SELECTORS.logo).should("be.visible");

    // Top Navigation links should all be visible and their targets should also be on the DOM
    cy.findByRole("navigation", { name: PAGE_SELECTORS.topNav }).should("be.visible");
    cy.findAllByTestId(PAGE_SELECTORS.topNavLink).each(($element) => {
      expect($element).to.be.visible;

      cy.get($element.attr("href")).should("exist");
    });

    // Main Photo should be visible
    cy.findByTestId(PAGE_SELECTORS.profilePicture).should("be.visible");

    // And the fake copyright should be visible
    cy.findByTestId(PAGE_SELECTORS.fakeCopyright).should("be.visible");
  });
});


describe("Intro", () => {
  it("should be possible to visit the section by clicking on the top nav link", () => {
    cy.findByRole("link", { name: PAGE_DATA.header["main-navigation"][0].label }).realClick();
    cy.get(PAGE_SELECTORS.about).should("be.visible").scrollIntoView();
    cy.findByTestId(PAGE_SELECTORS.introSubtitle).should("have.text", PAGE_DATA.about.intro.subtitle);
    cy.findByTestId(PAGE_SELECTORS.introTitle).should("have.text", "I'm João, a web developer and accessibility advocate from\n      Coimbra, Portugal");
  });

  it("The link to the employer is correct", () => {
    const expectedLink = PAGE_DATA.about.intro["currently-at"].href;

    cy.findByTestId(PAGE_SELECTORS.employerLink).scrollIntoView().should("have.attr", "href", expectedLink);
  });
});

describe("Skills", () => {
  it("should display all skills on the page", () => {
    cy.findAllByTestId(PAGE_SELECTORS.skill).each(($skill) => {
      expect($skill).not.to.be.hidden;
    });
  });
});

describe("Bio", () => {
  it("should display all elements", () => {
    cy.findByTestId(PAGE_SELECTORS.bioPicture).should("exist");
    cy.findByTestId(PAGE_SELECTORS.bioIntro).should("exist");
    cy.findAllByTestId(PAGE_SELECTORS.bioDescription).should("exist");
  });
});

describe("Work Experience", () => {
  it("should display all elements", () => {
    cy.findByTestId(PAGE_SELECTORS.experience).should("exist").scrollIntoView();

    // Should have the current jobs section visible
    cy.findAllByTestId(PAGE_SELECTORS.experienceItem).filter("[data-current]").should("have.length", 1).and("exist");

    // The other jobs should have the length of 4
    cy.findAllByTestId(PAGE_SELECTORS.experienceItem).filter(":not([data-current])").should("exist").within(() => {
      cy.get(".item").should("have.length", 4);
    });

    // The download button should be visible and the PDF should be available
    cy.findByLabelText(PAGE_DATA.about.experience.download.label).should("be.visible").then(($link) => {
      cy.request($link.prop("href")).its("status").should("equal", 200);
    });
  });
});

describe("Selected Work", () => {
  it("should display all elements", () => {
    // Section should exist and have an accessible description
    cy.get(PAGE_SELECTORS.work).should("exist").scrollIntoView();
    cy.get(PAGE_SELECTORS.workDescription).should("have.text", PAGE_DATA.work.description);
    cy.findByTestId(PAGE_SELECTORS.workList).should("be.visible");

    // Each work item should have:
    // - the correct id
    // - the correct aria-label
    // - the correct title
    // - the corret subtitle
    // - the correct amount of skills
    cy.findAllByTestId(PAGE_SELECTORS.workItems.item).should("have.length", PAGE_DATA.work.data.length).each(($item, index) => {
      const item = PAGE_DATA.work.data[index];
      cy.wrap($item).should("have.attr", "id", item.id).and("have.attr", "aria-label", `${item.title}, ${item.shortDescription}`).within(() => {
        cy.findByTestId(PAGE_SELECTORS.workItems.title).should("have.text", item.title);
        cy.findByTestId(PAGE_SELECTORS.workItems.subtitle).should("have.text", item.shortDescription);

        cy.findAllByTestId(PAGE_SELECTORS.workItems.skill).each(($skill) => item.skills.includes($skill.text()));
      });
    });
  });

  it("should open a project and display its contents", () => {
    const randomIndex = Cypress._.random(0, PAGE_DATA.work.data.length - 1);

    const chosenItemData = PAGE_DATA.work.data[randomIndex];

    cy.findAllByTestId(PAGE_SELECTORS.workItems.item).eq(randomIndex).scrollIntoView().should("be.visible").realClick();
  });
});

describe("Currently Playing", () => {
  it("should display the currently playing song", () => {
    const { container, mainTitle, albumCover, song, album, artist } = PAGE_SELECTORS.currentlyListening;
    cy.findByTestId(container).scrollIntoView().should("be.visible");
    cy.findByTestId(albumCover).should("be.visible");
    cy.findByTestId(song).should("have.text", `${LastFMFixture.recenttracks.track[0].name}. This link will open in a new tab`);
    cy.findByTestId(album).should("have.text", LastFMFixture.recenttracks.track[0].album["#text"]);
    cy.findByTestId(artist).should("have.text", LastFMFixture.recenttracks.track[0].artist["#text"]);
  });
});

describe("Contacts", () => {
  it("should display the social media links", () => {
    const { title, instagram, github, twitter, linkedin } = PAGE_DATA.footer["social-media"];

    cy.findByRole("heading", { level: 3, name: title }).should("be.visible");
    cy.findByRole("link", { name: instagram.label }).should("be.visible");
    cy.findByRole("link", { name: github.label }).should("be.visible");
    cy.findByRole("link", { name: twitter.label }).should("be.visible");
    cy.findByRole("link", { name: linkedin.label }).should("be.visible");

  });
});
