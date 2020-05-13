/**
 * Import Libraries
 */
import React from "react";

/**
 * Import Components
 */
import {
	CallToActionItem,
	CallToActionWrapper,
	ContentPage,
	MainContent,
	BlobOne,
	Form,
	PageTitle,
} from "../../components/index";
import { Meta } from "../../components/meta";

const ContactPage = ({ location }) => (
	<ContentPage>
		<Meta title="Contacts" location={location} />
		<PageTitle title="Contacts" subtitle="Let's work together." backgroundColor="var(--color-white, #ffffff)" />
		<MainContent className="layout__container">
			<Form />
		</MainContent>
		<CallToActionWrapper>
			<CallToActionItem
				id="cta-resume-pdf"
				subtitle="Want it all on paper?"
				title="Check out my resumé"
				linkText="Download in PDF"
				linkURL="/resume/resume-joaodias-en.pdf"
				ariaLabel="Save my resumé in a PDF format"
				isFile
			/>
			<CallToActionItem
				id="cta-about-page"
				subtitle="João Dias"
				title="UI Designer and Frontend developer, based in Coimbra."
				linkText="Visit the About page"
				ariaLabel="Navigate to the about page"
				linkURL="/about/"
			/>
		</CallToActionWrapper>
		<BlobOne />
	</ContentPage>
);

export default ContactPage;
