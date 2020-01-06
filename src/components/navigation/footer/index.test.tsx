import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "./index";

describe("<Footer>", () => {
	it("should render without error", () => {
		const component = render(<Footer />);
		expect(component).toMatchSnapshot();
	});
});
