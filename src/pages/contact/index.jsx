/**
 * Import Libraries
 */
import React from "react";

/**
 * Import Components
 */
import {
	A11yPageTitle,
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
		<A11yPageTitle title="Contacts" />
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
				isFile
			/>
			<CallToActionItem
				id="cta-about-page"
				subtitle="João Dias"
				title="UI Designer and Frontend developer, based in Coimbra."
				linkText="Visit the About page"
				linkURL="/about/"
			/>
		</CallToActionWrapper>
		<BlobOne />
	</ContentPage>
);

export default ContactPage;
