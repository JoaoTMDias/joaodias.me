import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextAreaInput, defaultProps } from "./index";
import { ITextAreaInputProps } from "../types";

afterEach(cleanup);

let props: ITextAreaInputProps;

describe("<TextAreaInput />", () => {
	beforeEach(() => {
		props = {
			...defaultProps,
			value: "",
		};
	});
	it("should render without errors", () => {
		const component = render(<TextAreaInput {...props} />);

		expect(component).toMatchSnapshot();
	});

	it("should call onChange when typing", async () => {
		const onChangeMock = jest.fn();
		props = {
			...props,
			onChange: onChangeMock,
		};
		const { findByTestId } = render(<TextAreaInput {...props} />);

		const input = await findByTestId("component-text-area-input");

		fireEvent.change(input, {
			target: {
				value: "teste",
			},
		});

		expect(onChangeMock).toHaveBeenCalled();
	});

	it("should have isFocused class when focused", async () => {
		const { findByTestId } = render(<TextAreaInput {...props} />);

		const input = await findByTestId("component-text-area-input");
		const wrapper = await findByTestId("component-text-area-wrapper");

		fireEvent.focus(input);

		expect(wrapper).toHaveClass("isFocused");
	});

	it("should not have isFocused class when loses focus", async () => {
		const { findByTestId } = render(<TextAreaInput {...props} />);

		const input = await findByTestId("component-text-area-input");
		const wrapper = await findByTestId("component-text-area-wrapper");

		fireEvent.blur(input);

		expect(wrapper).not.toHaveClass("isFocused");
	});

	it("should have helper text", async () => {
		const helperText = "This a helper text";
		props = {
			...props,
			helperText,
		};
		const { findByTestId } = render(<TextAreaInput {...props} />);

		const helper = await findByTestId("component-text-area-helper");

		expect(helper).toHaveTextContent(helperText);
	});
});
