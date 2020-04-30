/// <reference types="cypress" />
import { setupLayout } from "../mocks/setupLayout";

const PAGE_URL = `${Cypress.config().baseUrl}/contact`;

const EXPECTED = {
	name: "John Doe",
	email: "email@johndoe.com",
	message: "This is a debugging message"
};

describe("Contact", () => {
	beforeEach(() => {
		setupLayout(PAGE_URL);
		cy.route({
			method: "POST",
			url: "/",
			body: {
				"form-name": "contact-form",
				"name": EXPECTED.name,
				"email": EXPECTED.email,
				"message": EXPECTED.message,
				"wasSent": true
			},
		}).as("formSubmit");
	});

	describe("Form", () => {
		beforeEach(() => {
			cy.getByTestId("contact-form").as("formWrapper");

			cy.get("label[for='name']").as("nameInputWrapper");
			cy.get("@nameInputWrapper").find(".label").as("nameInputLabel");
			cy.get("@nameInputWrapper").find(".input").as("nameInput");

			cy.get("label[for='email']").as("emailInputWrapper");
			cy.get("@emailInputWrapper").find(".label").as("emailInputLabel");
			cy.get("@emailInputWrapper").find(".input").as("emailInput");

			cy.get("label[for='message']").as("messageTextareaWrapper");
			cy.get("@messageTextareaWrapper").find(".label").as("messageTextareaLabel");
			cy.get("@messageTextareaWrapper").find(".input").as("messageTextarea");

			cy.getByTestId("submit-button").as("submitButton");
		});

		describe("submit button", () => {
			it("should be disabled by default", () => {
				cy.get("@submitButton").invoke("attr", "aria-disabled").should("be", true);
			});

			describe("should stay disabled when some fields are left empty or invalid", () => {
				it("empty: name", () => {
					cy.fillForm([
						{
							alias: "@emailInput",
							value: EXPECTED.email
						},
						{
							alias: "@messageTextarea",
							value: {
								text: EXPECTED.message,
								options: {
									force: true
								}
							}
						},
					]);

					cy.get("@submitButton")
						.focus()
						.invoke("attr", "aria-disabled")
						.should("be", true);
				});

				it("empty: email", () => {
					cy.fillForm([
						{
							alias: "@nameInput",
							value: EXPECTED.name
						},
						{
							alias: "@messageTextarea",
							value: {
								text: EXPECTED.message,
								options: {
									force: true
								}
							}
						},
					]);
					cy.get("@submitButton")
						.focus().invoke("attr", "aria-disabled").should("be", true);
				});

				it("invalid: email", () => {
					cy.fillForm([
						{
							alias: "@nameInput",
							value: EXPECTED.name
						},
						{
							alias: "@emailInput",
							value: "emailatjohndoe.com"
						},
						{
							alias: "@messageTextarea",
							value: {
								text: EXPECTED.message,
								options: {
									force: true
								}
							}
						},
					]);
					cy.get("@submitButton")
						.focus().invoke("attr", "aria-disabled").should("be", true);
				});

				it("empty: message", () => {
					cy.fillForm([
						{
							alias: "@nameInput",
							value: EXPECTED.name
						},
						{
							alias: "@emailInput",
							value: EXPECTED.email
						},
					]);
					cy.get("@submitButton")
						.focus().invoke("attr", "aria-disabled").should("be", true);
				});
			});

			it("should be enabled when all fields are filled correctly", () => {
				cy.fillForm([
					{
						alias: "@nameInput",
						value: EXPECTED.name
					},
					{
						alias: "@emailInput",
						value: EXPECTED.email
					},
					{
						alias: "@messageTextarea",
						value: {
							text: EXPECTED.message,
							options: {
								force: true
							}
						}
					},
				]);

				cy.get("@submitButton")
					.focus()
					.invoke("attr", "aria-disabled")
					.should("be", false);
			});
		});
	});
});
