import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { TextInput, defaultProps } from "./index";
import { ITextInputProps } from "../types";

afterEach(cleanup);

let props: ITextInputProps;

describe("<TextInput />", () => {
	beforeEach(() => {
		props = {
			...defaultProps,
			id: "name",
			value: "",
		};
	});

	it("should render without errors", () => {
		const component = render(<TextInput {...props} />);

		expect(component).toMatchSnapshot();
	});

	it("should call onChange when typing", async () => {
		const onChangeMock = jest.fn();
		props = {
			...props,
			onChange: onChangeMock,
		};
		const { findByTestId } = render(<TextInput {...props} />);

		const input = await findByTestId("component-text-input-name");

		fireEvent.change(input, {
			target: {
				value: "teste",
			},
		});

		expect(onChangeMock).toHaveBeenCalled();
	});

	it("should have isFocused class when focused", async () => {
		const { findByTestId } = render(<TextInput {...props} />);

		const input = await findByTestId("component-text-input-name");
		const wrapper = await findByTestId("component-text-wrapper");

		fireEvent.focus(input);

		expect(wrapper).toHaveClass("isFocused");
	});

	it("should not have isFocused class when loses focus", async () => {
		const { findByTestId } = render(<TextInput {...props} />);

		const input = await findByTestId("component-text-input-name");
		const wrapper = await findByTestId("component-text-wrapper");

		fireEvent.blur(input);

		expect(wrapper).not.toHaveClass("isFocused");
	});

	it("should have helper text", async () => {
		const helperText = "This a helper text";
		props = {
			...props,
			helperText,
		};
		const { findByTestId } = render(<TextInput {...props} />);

		const helper = await findByTestId("component-text-helper");

		expect(helper).toHaveTextContent(helperText);
	});
});
