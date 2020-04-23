const setupLayout = (url = Cypress.config().baseUrl) => {
	cy.log("Setting environment server");
	cy.server();
	cy.visit(url);
	cy.viewport("macbook-13");
};

export { setupLayout };
