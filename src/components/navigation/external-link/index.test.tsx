import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ExternalLink, defaultProps } from "./index";

afterEach(cleanup);

describe("<ExternalLink />", () => {
	it("should render without errors", () => {
		const component = render(<ExternalLink to="https://www.google.com" {...defaultProps} />);

		expect(component).toMatchSnapshot();
	});

	it("should render an id and a className passed as props", async () => {
		const testId = "testId";
		const testClassName = "testClassName";
		const { findByTestId } = render(
			<ExternalLink id={testId} className={testClassName} to="https://www.google.com" {...defaultProps} />,
		);

		const link = await findByTestId("component-external-link");

		expect(link).toHaveAttribute("id", testId);
		expect(link).toHaveClass(testClassName);
	});
});
