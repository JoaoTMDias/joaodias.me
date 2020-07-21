import React from "react";
import { render, cleanup } from "@testing-library/react";

import { Header } from "./index";

afterEach(cleanup);

describe("<Header />", () => {
	it("should render without errors", () => {
		const component = render(<Header />);

		expect(component).toMatchSnapshot();
	});
});
