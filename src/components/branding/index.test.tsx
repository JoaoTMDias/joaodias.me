import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Branding } from "./index";

afterEach(cleanup);

describe("<Branding />", () => {
	it("should render without errors", () => {
		const component = render(<Branding />);

		expect(component).toMatchSnapshot();
	});
});
