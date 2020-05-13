/* eslint-disable jest/expect-expect */
// / <reference types="cypress" />
import { setupLayout } from "../mocks/setupLayout";

const PAGE_URL = `${Cypress.config().baseUrl}/contact`;

const EXPECTED = {
	name: "John Doe",
	email: "email@johndoe.com",
	message: "This is a debugging message",
	invalid: {
		name: {
			empty: "A name is required",
			min: "Minimum of 3 characters",
			max: "The maximum is 50 characters",
		},
		email: {
			empty: "An email is required",
			invalid: "That's not really an email, is it?",
			min: "Minimum of 3 characters",
			max: "The maximum is 50 characters",
		},
		message: {
			empty: "A message is required",
			min: "Minimum of 10 characters",
			max: "The maximum is 500. Try typing a shorter message.",
		},
	},
};

describe("Contact", () => {
	beforeEach(() => {
		setupLayout(PAGE_URL);
		cy.route({
			method: "POST",
			url: "/",
			body: {
				"form-name": "contact-page-form",
				name: EXPECTED.name,
				email: EXPECTED.email,
				message: EXPECTED.message
			},
		}).as("formSubmit");
	});

	describe("Form", () => {
		beforeEach(() => {
			cy.getByTestId("contact-page-form").as("formWrapper");

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

		describe("Form submission", () => {
			it("should display a success message", () => {
				cy.fillForm([
					{
						alias: "@nameInput",
						value: EXPECTED.name,
					},
					{
						alias: "@emailInput",
						value: EXPECTED.email,
					},
					{
						alias: "@messageTextarea",
						value: {
							text: EXPECTED.message,
							options: {
								force: true,
							},
						},
					},
				]);

				cy.get("@submitButton").scrollIntoView({
					offset: {
						top: -50,
						left: 0,
					},
				});
				cy.get("@submitButton").click({
					force: true,
				});

				cy.getByTestId("success-message").scrollIntoView().should("exist");
				cy.get(".success__image").should("exist");
				cy.get("#success-title").contains("Off it goes!");
				cy.get("#success-message").contains(
					"Thanks! Your message has been sent to me, so i'll get back to you as soon as I can. In the mean time, feel free to browser my site wherever you want.",
				);
			});
		});

		describe("inline validation", () => {
			it("should not show any errors by default", () => {
				cy.get("@nameInputWrapper").should("not.have.class", "has-errors");
				cy.get("@emailInputWrapper").should("not.have.class", "has-errors");
				cy.get("@messageTextareaWrapper").should("not.have.class", "has-errors");
			});

			describe("should show an error", () => {
				describe("when name...", () => {
					it("is empty", () => {
						cy.get("@nameInput").focus().blur();
						cy.get("@nameInputWrapper").find(".helper").contains(EXPECTED.invalid.name.empty);
					});

					it("has less than the minimum", () => {
						cy.get("@nameInput").focus().type("ab").blur();
						cy.get("@nameInputWrapper").find(".helper").contains(EXPECTED.invalid.name.min);
					});

					describe("has more than the maximum", () => {
						it("natively limited by the browser", () => {
							cy.get("@nameInput").focus().type("TL7K9xAEa7D_z98N]H{S.-g2d[jAUv%3Wqf:vJ4w^#e$e'u@`77").blur();
							cy.get("@nameInputWrapper").find(".helper").should("not.exist");
						});

						it("limited by javascript", () => {
							cy.get("@nameInput").then((element) => {
								element.attr("maxLength", "");
							});
							cy.get("@nameInput").focus().type("TL7K9xAEa7D_z98N]H{S.-g2d[jAUv%3Wqf:vJ4w^#e$e'u@`77").blur();
							cy.get("@nameInputWrapper").find(".helper").contains(EXPECTED.invalid.name.max);
						});
					});
				});

				describe("when email...", () => {
					it("is empty", () => {
						cy.get("@emailInput").focus().blur();
						cy.get("@emailInputWrapper").find(".helper").contains(EXPECTED.invalid.email.empty);
					});

					it("is not valid", () => {
						cy.get("@emailInput").focus().type("email-at-email.com").blur();
						cy.get("@emailInputWrapper").find(".helper").contains(EXPECTED.invalid.email.invalid);
					});

					describe("has more than the maximum", () => {
						it("natively limited by the browser", () => {
							cy.get("@emailInput")
								.focus()
								.type("nikxeizpcltkvhxeqnwbauiwtqtmhhjppxhofwvjoidqpbkpyjoidqpbkpy@gmail.com")
								.blur();
							cy.get("@emailInputWrapper").find(".helper").contains(EXPECTED.invalid.email.invalid);
							cy.get("@emailInputWrapper").find(".helper").should("not.contain.text", EXPECTED.invalid.email.max);
						});

						it("limited by javascript", () => {
							cy.get("@emailInput").then((element) => {
								element.attr("maxLength", "");
							});
							cy.get("@emailInput")
								.focus()
								.type("nikxeizpcltkvhxeqnwbauiwtqtmhhjppxhofwvjoidqpbkpyjoidqpbkpy@gmail.com")
								.blur();
							cy.get("@emailInputWrapper").find(".helper").contains(EXPECTED.invalid.email.max);
						});
					});
				});

				describe("when message...", () => {
					it("is empty", () => {
						cy.get("@messageTextarea").focus().blur();
						cy.get("@messageTextareaWrapper").find(".helper").contains(EXPECTED.invalid.message.empty);
					});

					it("has less than the minimum", () => {
						cy.get("@messageTextarea").focus().type("ab").blur();
						cy.get("@messageTextareaWrapper").find(".helper").contains(EXPECTED.invalid.message.min);
					});

					describe("has more than the maximum", () => {
						it("natively limited by the browser", () => {
							cy.get("@messageTextarea").invoke("attr", "maxLength").should("be", "500");
						});
					});
				});
			});
		});

		describe("submit button", () => {
			it("should be disabled by default", () => {
				cy.get("@submitButton").invoke("attr", "aria-disabled").should("be", true);
			});

			describe("should stay disabled when some fields are left empty or invalid", () => {
				describe("when name is...", () => {
					it("empty", () => {
						cy.fillForm([
							{
								alias: "@emailInput",
								value: EXPECTED.email,
							},
							{
								alias: "@messageTextarea",
								value: {
									text: EXPECTED.message,
									options: {
										force: true,
									},
								},
							},
						]);

						cy.get("@submitButton").focus().invoke("attr", "aria-disabled").should("be", true);
					});
				});

				describe("when email is...", () => {
					it("empty", () => {
						cy.fillForm([
							{
								alias: "@nameInput",
								value: EXPECTED.name,
							},
							{
								alias: "@messageTextarea",
								value: {
									text: EXPECTED.message,
									options: {
										force: true,
									},
								},
							},
						]);
						cy.get("@submitButton").focus().invoke("attr", "aria-disabled").should("be", true);
					});

					it("invalid", () => {
						cy.fillForm([
							{
								alias: "@nameInput",
								value: EXPECTED.name,
							},
							{
								alias: "@emailInput",
								value: "emailatjohndoe.com",
							},
							{
								alias: "@messageTextarea",
								value: {
									text: EXPECTED.message,
									options: {
										force: true,
									},
								},
							},
						]);
						cy.get("@submitButton").focus().invoke("attr", "aria-disabled").should("be", true);
					});
				});

				describe("when message is...", () => {
					it("empty", () => {
						cy.fillForm([
							{
								alias: "@nameInput",
								value: EXPECTED.name,
							},
							{
								alias: "@emailInput",
								value: EXPECTED.email,
							},
						]);
						cy.get("@submitButton").focus().invoke("attr", "aria-disabled").should("be", true);
					});
				});
			});

			it("should be enabled when all fields are filled correctly", () => {
				cy.fillForm([
					{
						alias: "@nameInput",
						value: EXPECTED.name,
					},
					{
						alias: "@emailInput",
						value: EXPECTED.email,
					},
					{
						alias: "@messageTextarea",
						value: {
							text: EXPECTED.message,
							options: {
								force: true,
							},
						},
					},
				]);

				cy.get("@submitButton").focus().invoke("attr", "aria-disabled").should("be", false);
			});
		});
	});
});
