import React from "react";
import { render, cleanup } from "@testing-library/react";

import { IApp } from "./index";

afterEach(cleanup);

describe("<IApp />", () => {
	it("should render without errors", () => {
		const component = render(
			<IApp>
				<p>teste</p>
			</IApp>,
		);

		expect(component).toMatchSnapshot();
	});

	it("should render a child component ", async () => {
		const { findByTestId } = render(
			<IApp>
				<p data-testid="test">test</p>
			</IApp>,
		);
		const child = await findByTestId("test");

		expect(child.textContent).toBe("test");
	});
});
