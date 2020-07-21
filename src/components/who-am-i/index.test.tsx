import React from "react";
import { render } from "@testing-library/react";
import { WhoAmI } from "./index";

describe("<WhoAmI>", () => {
	it("should render without error", () => {
		const component = render(<WhoAmI />);
		expect(component).toMatchSnapshot();
	});
});
