import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ContentSpinner, defaultProps } from "./index";

afterEach(cleanup);

describe("<ContentSpinner />", () => {
	it("should render without errors", () => {
		const component = render(<ContentSpinner />);

		expect(component).toMatchSnapshot();
	});

	it("should render the default spinner", async () => {
		const { findByTestId } = render(<ContentSpinner {...defaultProps} />);
		const spinner = await findByTestId("component-content-spinner");
		const svg = await findByTestId("component-content-svg");
		const color = spinner.getAttribute("color");
		const width = svg.getAttribute("width");
		const height = svg.getAttribute("height");

		expect(color).toBe(defaultProps.color);
		expect(width).toBe(`${defaultProps.size}`);
		expect(height).toBe(`${defaultProps.size}`);
	});

	it("should render a different color", async () => {
		const newColor = "var(--color-success)";
		const { findByTestId } = render(<ContentSpinner color={newColor} />);
		const spinner = await findByTestId("component-content-spinner");
		const color = spinner.getAttribute("color");
		const icon = spinner.querySelector(".spinner__icon");

		expect(color).toBe(newColor);

		if (icon) {
			expect(icon.getAttribute("color")).toBe(newColor);
		}
	});

	it("should center the spinner", async () => {
		const isCenter = true;
		const { findByTestId } = render(<ContentSpinner center={isCenter} />);
		const spinner = await findByTestId("component-content-spinner");

		expect(spinner).toHaveClass("isCenter");
	});

	it("should not center the spinner", async () => {
		const center = false;
		const { findByTestId } = render(<ContentSpinner size={40} delay={1500} temporary center={center} />);
		const spinner = await findByTestId("component-content-spinner");

		expect(spinner).not.toHaveClass("isCenter");
	});

	it("should render custom styles", async () => {
		const customStyles = {
			animationDelay: "3000ms",
		};
		const { findByTestId } = render(<ContentSpinner fullPage duration={5000} size={40} style={customStyles} />);
		const spinner = await findByTestId("component-content-spinner");

		expect(spinner).toHaveStyle(`
			animation-delay: 3000ms;
		`);
	});
});
