/// <reference types="cypress" />

import { setupLayout } from "../mocks/setupLayout";
import { API_LAST_FM } from "../constants/api";

const PAGE_URL = `${Cypress.config().baseUrl}/about`;

const EXPECTED = {
	currentPlaying: {
		artist: "Soen",
		title: "Covenant",
		album: "Lotus",
		url: "https://www.last.fm/music/Soen/_/Covenant",
	},
};

describe("About", () => {
	beforeEach(() => {
		setupLayout(PAGE_URL);
		cy.route({
			method: "GET",
			url: API_LAST_FM,
			status: 200,
			response: "fx:last-fm",
		}).as("currentlyListening");
	});

	describe("Current Playing", () => {
		beforeEach(() => {
			cy.get("#last-played-song").as("lastPlayedSong");
			cy.get("@lastPlayedSong").scrollIntoView();
			cy.wait("@currentlyListening");
		});

		it("should render the first song", () => {
			cy.getByTestId("last-played-title").contains(EXPECTED.currentPlaying.title);
			cy.getByTestId("last-played-title").invoke("attr", "href").should("be", EXPECTED.currentPlaying.url);
			cy.getByTestId("last-played-artist").contains(EXPECTED.currentPlaying.artist);
			cy.getByTestId("last-played-album").contains(EXPECTED.currentPlaying.album);
		});
	});
});
