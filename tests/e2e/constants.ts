import PAGE_CONTENT from "../../src/data/index.json";
import { SelectedProjects } from "../../src/data/content-types";

export const PAGE_SELECTORS = {
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

export const PAGE_DATA: SelectedProjects = PAGE_CONTENT;
