import React from "react";
import { render } from "@testing-library/react";
import { SocialNavigation } from "./index";

describe("<SocialNavigation>", () => {
	it("should render without error", () => {
		const component = render(<SocialNavigation />);
		expect(component).toMatchSnapshot();
	});
});
