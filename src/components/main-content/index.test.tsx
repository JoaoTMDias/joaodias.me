import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MainContent } from "./index";

afterEach(cleanup);

describe("<MainContent />", () => {
	it("should render without errors", () => {
		const component = render(
			<MainContent
				className="main-content-test-classname"
				style={{
					fontSize: 12,
				}}
			>
				<p>child</p>
			</MainContent>,
		);

		expect(component).toMatchSnapshot();
	});
});
