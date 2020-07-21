import React from "react";
import { render, cleanup } from "@testing-library/react";
import { ContentPage } from "./index";

afterEach(cleanup);

describe("<ContentPage />", () => {
	it("should render without errors", () => {
		const component = render(
			<ContentPage>
				<p>teste</p>
			</ContentPage>,
		);

		expect(component).toMatchSnapshot();
	});

	it("should render a child component ", async () => {
		const { findByTestId } = render(
			<ContentPage>
				<p data-testid="test">test</p>
			</ContentPage>,
		);
		const child = await findByTestId("test");

		expect(child.textContent).toBe("test");
	});
});
