/**
 * Import Libraries
 */
import React from "react";
import { graphql } from "gatsby";
import { Details, ArticleWrapper, Intro } from "./styles";

/**
 * Import Components
 */
import {
	Layout,
	A11yPageTitle,
	CallToActionItem,
	CallToActionWrapper,
	ContentPage,
	PageTitle,
} from "../../components/index";
import { Meta } from "../../components/meta";

const PrivacyPolicyPage = ({ location, data }) => {
	const privacyPolicyArray = data.allContentfulPrivacyPolicy.edges;

	return (
		<ContentPage>
			<A11yPageTitle title="Privacy Policy" />

			<Meta location={location} />
			<PageTitle title="Privacy Policy" />

			<section id="about-video" className="layout__container layout__section">
				<ArticleWrapper className="layout__row">
					<Intro>
						This privacy policy has been compiled to better serve those of you who are concerned with how their
						Personally Identifiable Information (PII) is being used on my website. PII, as described in EU privacy law
						and information security, is information that can be used on its own or with other information to identify,
						contact, or locate a single person, or to identify an individual in context. Please read my privacy policy
						carefully to get a clear understanding of how I collect, use, protect or otherwise handle your Personally
						Identifiable Information in accordance with my website.
					</Intro>

					<hr />
					{privacyPolicyArray.map(item => (
						<Details key={item.node.id} id={`${item.node.id}`} arial-labelledby={`details-summary-${item.node.id}`}>
							<summary id={`details-summary-${item.node.id}`} className="title">
								{`${item.node.summary}`}
							</summary>
							<p className="description">{`${item.node.description.description}`}</p>
							<hr />
						</Details>
					))}
				</ArticleWrapper>
			</section>

			<CallToActionWrapper>
				<CallToActionItem
					id="cta-home-page"
					subtitle="Read everything?"
					title="Back to the starting point"
					linkText="Go to the home page"
					linkURL="/"
				/>
				<CallToActionItem
					id="cta-contacts-page"
					subtitle="Found an issue with this doc?"
					title="Drop me an email"
					linkText="Go to the contacts page"
					linkURL="/contacts/"
				/>
			</CallToActionWrapper>
		</ContentPage>
	);
};

// Graphql
export const privacyPolicyQuery = graphql`
	query PrivacyPolicyItems {
		allContentfulPrivacyPolicy(sort: { fields: [createdAt], order: ASC }) {
			edges {
				node {
					id
					createdAt
					summary
					description {
						description
					}
				}
			}
		}
	}
`;

export default PrivacyPolicyPage;
