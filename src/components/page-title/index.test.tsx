import React from "react";
import { render, cleanup } from "@testing-library/react";
import { PageTitle } from "./index";
import { A11yPageTitle } from "./a11ypagetitle";

afterEach(cleanup);

describe("<PageTitle>", () => {
	const expected = {
		title: "title",
		subtitle: "subtitle",
		center: true,
		isProject: true,
		backgroundColor: "var(--color-white, #ffffff)",
	};

	it("should render without error", () => {
		const component = render(<PageTitle backgroundColor={expected.backgroundColor} />);
		expect(component).toMatchSnapshot();
	});

	it("should render a title and a subtitle", async () => {
		const { findByTestId } = render(
			<PageTitle title={expected.title} subtitle={expected.subtitle} backgroundColor={expected.backgroundColor} />,
		);
		const title = await findByTestId("title");
		const subtitle = await findByTestId("subtitle");

		expect(title).toHaveTextContent(expected.title);
		expect(subtitle).toMatchSnapshot(expected.subtitle);
	});

	it("should render class if isProject", async () => {
		const { findByTestId } = render(
			<PageTitle isProject={expected.isProject} backgroundColor={expected.backgroundColor} />,
		);
		const row = await findByTestId("row");
		expect(row).toHaveClass("isProject");
	});

	it("should center the page title", async () => {
		const { findByTestId } = render(<PageTitle center={expected.center} backgroundColor={expected.backgroundColor} />);
		const row = await findByTestId("row");

		expect(row).toHaveClass("isCenter");
	});
});

describe("<A11yPageTitle />", () => {
	const expected = {
		title: "Accessible Title",
	};

	it("should render without error", async () => {
		const component = render(<A11yPageTitle title={expected.title} />);
		const title = await component.findByTestId("a11y-page-title");
		expect(title).toHaveTextContent(`${expected.title}`);
	});
});
