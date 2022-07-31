import setupLayout from "../helpers/setupLayout";

beforeEach(() => {
  cy.injectAxe();
  setupLayout();
});

describe("Homepage", () => {
  it("should load the website", () => {
    cy.url().should("include", "http://localhost:3000/");
  })
});
