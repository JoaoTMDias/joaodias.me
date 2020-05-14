/* eslint-disable react/no-danger */
/**
 * Import Libraries
 */
import React from "react";
import { graphql } from "gatsby";
import { Details, ArticleWrapper, Intro, List, HorizontalRule } from "./styles";

/**
 * Import Components
 */
import { CallToActionItem, CallToActionWrapper, ContentPage, PageTitle, MainContent } from "../../components/index";
import { Meta } from "../../components/meta";

const PrivacyPolicyPage = ({ location, data }) => {
	const privacyPolicyArray = data.allContentfulPrivacyPolicy.edges;

	return (
		<ContentPage>
			<Meta location={location} />
			<PageTitle title="Privacy Policy" />
			<MainContent>
				<section className="layout__container layout__section">
					<ArticleWrapper className="layout__row">
						<Intro>
							This privacy policy has been compiled to better serve those of you who are concerned with how their
							Personally Identifiable Information (PII) is being used on my website. PII, as described in EU privacy law
							and information security, is information that can be used on its own or with other information to
							identify, contact, or locate a single person, or to identify an individual in context. Please read my
							privacy policy carefully to get a clear understanding of how I collect, use, protect or otherwise handle
							your Personally Identifiable Information in accordance with my website.
						</Intro>

						<HorizontalRule />
						<List>
							{privacyPolicyArray.map((item) => (
								<Details key={item.node.id} id={`${item.node.id}`} data-testid="component-details-wrapper" arial-labelledby={`details-summary-${item.node.id}`}>
									<summary id={`details-summary-${item.node.id}`} data-testid="component-details-title" className="title">
										{`${item.node.summary}`}
									</summary>
									<p className="description" data-testid="component-details-description" dangerouslySetInnerHTML={{ __html: item.node.description.description }} />
								</Details>
							))}
						</List>
					</ArticleWrapper>
				</section>
			</MainContent>

			<CallToActionWrapper>
				<CallToActionItem
					id="cta-home-page"
					subtitle="Read everything?"
					title="Back to the starting point"
					linkText="Go to the home page"
					ariaLabel="Navigate to the home page"
					linkURL="/"
				/>
				<CallToActionItem
					id="cta-contacts-page"
					subtitle="Found an issue with this doc?"
					title="Drop me an email"
					linkText="Go to the contacts page"
					ariaLabel="Navigate to the contacts page"
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
