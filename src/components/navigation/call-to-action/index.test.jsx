import React from "react";
import { render, cleanup } from "@testing-library/react";

import { CallToActionWrapper, CallToActionItem } from "./index";

afterEach(cleanup);

describe("<CallToAction />", () => {
	it("should render without errors", () => {
		const component = render(
			<CallToActionWrapper>
				<CallToActionItem
					id="cta-resume-paper"
					subtitle="Want it all on paper?"
					title="Check out my resumé"
					linkText="Download in PDF"
					linkURL="/resume/resume-joaodias-en.pdf"
					ariaLabel="Save my resumé in a PDF format"
					isFile
				/>
				<CallToActionItem
					id="cta-lets-chat"
					subtitle="Have an idea for a project?"
					title="Let's chat!"
					linkText="Visit the Contacts page"
					linkURL="/contact/"
					ariaLabel="Navigate to the contacts page"
				/>
			</CallToActionWrapper>,
		);

		expect(component).toMatchSnapshot();
	});
});
