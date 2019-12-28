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
import { IIndexPageProps, IIndexPageEdge } from "../data/interfaces/index.interfaces";
import { ContentSpinner } from "../components/content-spinner";

const IndexPage: React.FunctionComponent<IIndexPageProps> = ({ location, data }) => {
	/**
	 * Renders the portfolio items
	 *
	 * @returns
	 */
	function renderPortfolioItems() {
		const query = data.allContentfulPortfolio.edges;

		if (query) {
			const list = query.map((item: IIndexPageEdge) => {
				const { id, slug, title, theme, featuredImage, color, date, description } = item.node;

				return (
					<ProjectItem
						alt={featuredImage ? featuredImage.description : ""}
						color={color}
						description={description ? description.description : ""}
						fluid={featuredImage ? featuredImage.fluid : undefined}
						id={id}
						key={id}
						loading="auto"
						theme={theme}
						title={title}
						to={slug}
						type={date}
					/>
				);
			});
			return <List className="layout__row">{list || <ContentSpinner />}</List>;
		}

		return null;
	}

	return (
		<Layout>
			<ContentPage>
				<A11yPageTitle title="Initial Page" />

				<Meta title="Homepage" location={location} />
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
						fluid(maxWidth: 1024, quality: 75) {
							src
							srcSet
							srcWebp
							srcSetWebp
							sizes
							aspectRatio
						}
						description
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
