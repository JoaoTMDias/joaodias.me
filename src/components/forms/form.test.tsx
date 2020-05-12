import React from "react";
import user from "@testing-library/user-event";
import { render, cleanup, waitFor } from "@testing-library/react";
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
		const { getByTestId } = render(<Form />);
		const name = await getByTestId("component-text-input-name");
		const email = await getByTestId("component-text-input-email");
		const message = await getByTestId("component-text-area-input");
		const button = await getByTestId("submit-button");

		user.type(name, "name input");
		user.type(email, "email@email.com");
		user.type(message, "textarea message content here");

		await waitFor(() => {
			expect(button).toHaveAttribute("aria-disabled", "false");
		});
	});
});
