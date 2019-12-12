// Libraries
import React from "react";
import { useSpring, animated, config } from "react-spring";
import { graphql } from "gatsby";
import { Wrapper, List } from "./styles";

// Components
import {
	CallToActionItem,
	CallToActionWrapper,
	Layout,
	A11yPageTitle,
	ContentPage,
	Meta,
	Footer,
	HomePageHero,
} from "../components/index";
import { ProjectItem } from "../components/project";

const from = {
	opacity: 0,
	transform: "translate3d(0, 4rem, 0)",
};

const to = {
	opacity: 1,
	transform: "translate3d(0,0,0)",
};

const IndexPage = ({ location, data }) => {
	const animationProps = useSpring({
		from,
		to,
		config: {
			...config.gentle,
			delay: 500,
		},
	});

	const AnimatedList = animated(List);

	/**
	 *
	 *
	 * @returns
	 */
	function renderPortfolioItems() {
		const queryPath = data.allContentfulPortfolio.edges;

		if (queryPath) {
			return (
				<AnimatedList className="layout__row" style={animationProps}>
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
				</AnimatedList>
			);
		}
		return <p>Loading...</p>;
	}

	if (typeof document !== "undefined") {
		const focusElement = document.querySelector('[href="#main-content"]');

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
