import React from "react";
import { render } from "@testing-library/react";
import { SkipLink } from "./index";

describe("<SkipLink>", () => {
	it("should render without error", () => {
		const component = render(<SkipLink />);
		expect(component).toMatchSnapshot();
	});
});
