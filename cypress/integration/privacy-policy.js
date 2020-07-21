// / <reference types="cypress" />
import { setupLayout } from "../mocks/setupLayout";

const PAGE_URL = `${Cypress.config().baseUrl}/privacy-policy`;

describe("Homepage", () => {
	beforeEach(() => {
		setupLayout(PAGE_URL);
	});

	describe("Details", () => {
		beforeEach(() => {
			cy.getByTestId("component-details-wrapper").as("detailsWrapper");
			cy.getByTestId("component-details-title").as("detailsTitle");
			cy.getByTestId("component-details-description").as("detailsDescription");
		});

		it("should have all details closed by default", () => {
			cy.get(`@detailsWrapper`).should("not.have.attr", "open");
		});

		it("should open one of the details on click", () => {
			cy.get(`@detailsTitle`).first().click({ force: true });
			cy.get(`@detailsWrapper`).first().should("have.attr", "open");
		});

		it("should close one of the details on click", () => {
			cy.get(`@detailsTitle`).first().click({ force: true }).click({ force: true });
			cy.get(`@detailsWrapper`).first().should("not.have.attr", "open");
		});
	});
});
