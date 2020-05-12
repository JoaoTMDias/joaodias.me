import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextInput, defaultProps } from "./index";

afterEach(cleanup);

describe("<TextInput />", () => {
	it("should render without errors", () => {
		const component = render(<TextInput id="name" value="" {...defaultProps} />);

		expect(component).toMatchSnapshot();
	});

	it("should call onChange when typing", async () => {
		const onChangeMock = jest.fn();
		const { findByTestId } = render(<TextInput {...defaultProps} id="name" value="" onChange={onChangeMock} />);

		const input = await findByTestId("component-text-input-name");

		fireEvent.change(input, {
			target: {
				value: "teste",
			},
		});

		expect(onChangeMock).toHaveBeenCalled();
	});

	it("should have isFocused class when focused", async () => {
		const { findByTestId } = render(<TextInput {...defaultProps} id="name" value="" />);

		const input = await findByTestId("component-text-input-name");
		const wrapper = await findByTestId("component-text-wrapper");

		fireEvent.focus(input);

		expect(wrapper).toHaveClass("isFocused");
	});

	it("should not have isFocused class when loses focus", async () => {
		const { findByTestId } = render(<TextInput {...defaultProps} id="name" value="" />);

		const input = await findByTestId("component-text-input-name");
		const wrapper = await findByTestId("component-text-wrapper");

		fireEvent.blur(input);

		expect(wrapper).not.toHaveClass("isFocused");
	});

	it("should have helper text", async () => {
		const helperText = "This a helper text";
		const { findByTestId } = render(<TextInput {...defaultProps} id="name" value="" helperText={helperText} />);

		const helper = await findByTestId("component-text-helper");

		expect(helper).toHaveTextContent(helperText);
	});
});
