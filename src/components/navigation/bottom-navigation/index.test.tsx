import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BottomNavigation } from "./index";

afterEach(cleanup);

describe("<BottomNavigation />", () => {
	it("should render without errors", () => {
		const component = render(<BottomNavigation />);

		expect(component).toMatchSnapshot();
	});

	it("should have the first link active", async () => {
		const { queryAllByTestId } = render(<BottomNavigation />);

		const links = await queryAllByTestId("tab-link");
		const firstLink = await links[0];

		expect(firstLink).toHaveClass("is-active");
	});
});
