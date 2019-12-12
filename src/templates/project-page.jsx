// Libraries
import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import get from "lodash/get";
import styled from "styled-components";
import { graphql } from "gatsby";

// Components
import { ProjectHero, ProjectMeta, ProjectIntroduction } from "../components/project";
import {
	Layout,
	CallToActionItem,
	CallToActionWrapper,
	Footer,
	A11yPageTitle,
	ContentPage,
	BlobFour,
} from "../components/index.js";

/**
 * Product Page Template
 *
 * @class ProjectPage
 * @extends {React.Component}
 */
class ProjectPage extends PureComponent {
	componentDidMount() {
		const items = Array.from(
			document.querySelectorAll(".layout__project h2, .layout__project img, .layout__project a"),
		);
		// console.log('items: ', items);

		items.map(item => {
			item.tabIndex = 0;
			return;
		});
	}

	render() {
		const post = get(this.props, "data.contentfulPortfolio");
		if (post) {
			return (
				<Layout>
					<ContentPage>
						<A11yPageTitle title={`Project page title: ${post.title}`} />

						<Helmet>
							<title>{`${post.title} | João Dias`}</title>
							<script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8" />
							<body className="project" />
						</Helmet>
						<ProjectIntroduction
							id={`${post.introduction.internal.contentDigest}`}
							description={`${post.description.description}`}
							title={`${post.title}`}
							text={`${post.introduction.internal.content}`}
						/>
						<div id="main-content">
							<ProjectHero id={`hero-${post.slug}`} backgroundImage={post.featuredImage.file.url} />

							<ProjectMeta
								skills={post.skills}
								tools={post.tools}
								client={`${post.client}`}
								date={`${post.date}`}
							/>
							<Body className="layout__row">
								<div
									className="layout__project layout__section"
									// eslint-disable-next-line
									dangerouslySetInnerHTML={{
										__html: post.body.childMarkdownRemark.html,
									}}
								/>
							</Body>
						</div>
						<CallToActionWrapper>
							<CallToActionItem
								id="cta-home-page"
								subtitle="Related Project"
								title="Return to the projects list"
								linkText="Back to the Homepage"
								linkURL="/"
							/>
							<CallToActionItem
								id="cta-contacts-page"
								subtitle="Related Project"
								title="Let's connect"
								linkText="Check it out"
								linkURL="/contact/"
							/>
						</CallToActionWrapper>
						<BlobFour />
					</ContentPage>
				</Layout>
			);
		}
		return <p>Loading...</p>;
	}
}

export default ProjectPage;

export const pageQuery = graphql`
	query ProjectPostQuery($slug: String!) {
		contentfulPortfolio(slug: { eq: $slug }) {
			id
			slug
			title
			introduction {
				internal {
					content
					contentDigest
				}
			}
			description {
				description
			}
			featuredImage {
				file {
					url
				}
				description
			}
			skills
			tools
			client
			date(fromNow: true, locale: "en-us")
			body {
				id
				childMarkdownRemark {
					html
					timeToRead
				}
			}
		}
	}
`;

const Body = styled.article`
	display: flex;
	align-items: center;
	margin-bottom: 10vh;
	flex-direction: column;
`;
