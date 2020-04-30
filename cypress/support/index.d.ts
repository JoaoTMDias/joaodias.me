/// <reference types="cypress" />

interface IFieldValue {
	text: string;
	options?: Partial<Cypress.TypeOptions>;
}

interface IFields {
	alias: string;
	value: string | IFieldValue;
}

declare namespace Cypress {
	interface Chainable<Subject> {
		getByTestId(id: string): Chainable<any>;
		getByAttr(attribute: string, value: string): Chainable<any>;
		fillForm(fields: IFields[]): Chainable<any>;
		getAnnouncerText(message: string): Chainable<any>;
	}
}
