Cypress.Commands.add("getByTestId", (id) => {
	cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add("getByAttr", (attribute, value) => {
	cy.get(`[${attribute}="${value}"]`);
});

Cypress.Commands.add("fillForm", (fields) => {
	fields.forEach(({ alias, value }) => {
		if(typeof value === "string") {
			cy.get(alias).scrollIntoView().type(value, { force: true });
		} else {
			cy.get(alias).scrollIntoView().type(value.text, {
				...value.options,
				force: true
			});
		}
	});
});

Cypress.Commands.add("getAnnouncerText", (message) => {
	cy.getByTestId("component-announcer").contains(message);
});
