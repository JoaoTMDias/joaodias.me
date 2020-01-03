import React from "react";
import { render, cleanup } from "@testing-library/react";
import HelloAnimation from "./index";

afterEach(cleanup);

describe("<HelloAnimation />", () => {
	it("should render without errors", () => {
		const component = render(<HelloAnimation />);

		expect(component).toMatchSnapshot();
	});
});
