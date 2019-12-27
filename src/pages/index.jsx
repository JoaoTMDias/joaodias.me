// Libraries
import React from "react";
import { graphql } from "gatsby";
import { Wrapper, List } from "./styles";

// Components
import {
	CallToActionItem,
	CallToActionWrapper,
	Layout,
	A11yPageTitle,
	ContentPage,
	HomePageHero,
} from "../components/index";
import { ProjectItem } from "../components/project";
import { Meta } from "../components/meta";

const IndexPage = ({ location, data }) => {
	/**
	 *
	 *
	 * @returns
	 */
	function renderPortfolioItems() {
		const queryPath = data.allContentfulPortfolio.edges;

		if (queryPath) {
			return (
				<List className="layout__row">
					{queryPath.map(item => {
						return (
							<ProjectItem
								key={`${item.node.id}`}
								id={`${item.node.id}`}
								to={item.node.slug}
								title={item.node.title}
								theme={item.node.theme}
								alt={item.node.featuredImage ? item.node.featuredImage.title : ""}
								cover={item.node.featuredImage ? item.node.featuredImage.fluid : {}}
								color={item.node.color}
								type={item.node.date}
								description={item.node.description ? item.node.description.description : ""}
								project={item.node}
							/>
						);
					})}
				</List>
			);
		}
		return <p>Loading...</p>;
	}

	if (typeof document !== "undefined") {
		const focusElement = document.querySelector("[href='#main-content']");

		if (focusElement) {
			focusElement.focus();
		}
	}

	return (
		<Layout>
			<ContentPage>
				<A11yPageTitle title="Initial Page" />

				<Meta location={location} />
				<HomePageHero />
				<Wrapper id="main-content" className="layout__container layout__section">
					{renderPortfolioItems()}
				</Wrapper>
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
						title="Know more about me"
						linkText="Visit the About page"
						linkURL="/about/"
					/>
				</CallToActionWrapper>
			</ContentPage>
		</Layout>
	);
};

// ////////
// GRAPHQL
// ////////
export const latestProjectsQuery = graphql`
	query ProjectsList {
		allContentfulPortfolio {
			edges {
				node {
					id
					slug
					title
					description {
						description
					}
					color
					featuredImage {
						id
						title
						fluid(maxWidth: 1024, maxHeight: 560, quality: 80) {
							src
							srcSet
							srcWebp
							srcSetWebp
							sizes
							aspectRatio
						}
					}
					theme
					date(fromNow: true, locale: "en-us")
					category {
						title
					}
				}
			}
		}
	}
`;

export default IndexPage;
