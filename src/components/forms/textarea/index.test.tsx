import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextAreaInput, defaultProps } from "./index";

afterEach(cleanup);

describe("<TextAreaInput />", () => {
	it("should render without errors", () => {
		const component = render(<TextAreaInput value="" {...defaultProps} />);

		expect(component).toMatchSnapshot();
	});

	it("should call onChange when typing", async () => {
		const onChangeMock = jest.fn();
		const { findByTestId } = render(<TextAreaInput value="" {...defaultProps} onChange={onChangeMock} />);

		const input = await findByTestId("component-text-area-input");

		fireEvent.change(input, {
			target: {
				value: "teste",
			},
		});

		expect(onChangeMock).toHaveBeenCalled();
	});

	it("should have isFocused class when focused", async () => {
		const { findByTestId } = render(<TextAreaInput value="" {...defaultProps} />);

		const input = await findByTestId("component-text-area-input");
		const wrapper = await findByTestId("component-text-area-wrapper");

		fireEvent.focus(input);

		expect(wrapper).toHaveClass("isFocused");
	});

	it("should not have isFocused class when loses focus", async () => {
		const { findByTestId } = render(<TextAreaInput value="" {...defaultProps} />);

		const input = await findByTestId("component-text-area-input");
		const wrapper = await findByTestId("component-text-area-wrapper");

		fireEvent.blur(input);

		expect(wrapper).not.toHaveClass("isFocused");
	});

	it("should have helper text", async () => {
		const helperText = "This a helper text";
		const { findByTestId } = render(<TextAreaInput value="" {...defaultProps} helperText={helperText} />);

		const helper = await findByTestId("component-text-area-helper");

		expect(helper).toHaveTextContent(helperText);
	});
});
