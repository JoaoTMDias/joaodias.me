import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./form";

afterEach(cleanup);

describe("<Form />", () => {
	it("should render without errors", () => {
		const component = render(<Form />);
		expect(component).toMatchSnapshot();
	});

	it("should have the submit button disabled by default", async () => {
		const { findByTestId } = render(<Form />);
		const button = await findByTestId("submit-button");

		expect(button).toHaveAttribute("aria-disabled", "true");
	});

	it("should enable the submit button once the form is filled", async () => {
		const { findByTestId, queryAllByTestId } = render(<Form />);
		const inputs = await queryAllByTestId("component-text-input");
		const name = inputs[0];
		const email = inputs[1];
		const message = await findByTestId("component-text-area-input");
		const button = await findByTestId("submit-button");

		fireEvent.change(name, {
			target: {
				value: "name input",
			},
		});

		fireEvent.change(email, {
			target: {
				value: "email@email.com",
			},
		});

		fireEvent.change(message, {
			target: {
				value: "textarea message content here",
			},
		});

		expect(button).toHaveAttribute("aria-disabled", "false");
	});
});
