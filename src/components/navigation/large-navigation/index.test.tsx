import React from "react";
import { render, cleanup } from "@testing-library/react";

import { LargeNavigation } from "./index";

afterEach(cleanup);

describe("<LargeNavigation />", () => {
	it("should render without errors", () => {
		const component = render(<LargeNavigation />);

		expect(component).toMatchSnapshot();
	});
});
