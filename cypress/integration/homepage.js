/// <reference types="cypress" />
import { setupLayout } from "../mocks/setupLayout";

const THEMES = ["dark", "light"];

describe("Homepage", () => {
	beforeEach(() => {
		setupLayout();
	});

	describe("Theme", () => {
		let theme;
		beforeEach(() => {
			theme = window.matchMedia("(prefers-color-scheme: dark)") ? THEMES[0] : THEMES[1];
			cy.getByTestId("html-element").as("htmlElement");
			cy.getByTestId("component-theme-button-toggle").as("themeToggle");
		});

		it("should load the correct theme", () => {
			cy.get(`@htmlElement`).contains(theme);
			cy.get(`@themeToggle`).get(`[data-current-theme=${theme}]`).should("exist");
		});

		it("should change the current theme", () => {
			switch (theme) {
				case THEMES[0]:
					cy.get(`@themeToggle`).click();
					cy.get(`@htmlElement`).invoke("attr", "data-theme").should("be", THEMES[1]);
					break;

				default:
				case THEMES[1]:
					cy.get(`@themeToggle`).click();
					cy.get(`@themeToggle`).invoke("attr", "data-theme").should("be", THEMES[0]);
					break;
			}
		});
	});
});
