import React from "react";
import { render, cleanup } from "@testing-library/react";

import { LogoCarousel } from "./logo-carousel.component";

afterEach(cleanup);

describe("<LogoCarousel />", () => {
	it("should render without errors", () => {
		const component = render(<LogoCarousel />);

		expect(component).toMatchSnapshot();
	});
});
