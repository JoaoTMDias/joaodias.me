import React from "react";
import { render, cleanup } from "@testing-library/react";
import { HomePageHero } from "./index";

afterEach(cleanup);

describe("<HomePageHero />", () => {
	it("should render without errors", () => {
		const component = render(<HomePageHero />);

		expect(component).toMatchSnapshot();
	});
});
