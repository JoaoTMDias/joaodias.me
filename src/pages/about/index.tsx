// Libraries
import React from "react";
import { graphql } from "gatsby";

// Interfaces
import { Data, AllContentfulSkillsEdge } from "../../data/interfaces/index.interfaces";

// Components
import {
	CallToActionItem,
	CallToActionWrapper,
	Layout,
	A11yPageTitle,
	LogoCarousel,
	LastPlayedSong,
	ContentPage,
	MainContent,
	Meta,
	BlobOne,
	PageTitle,
	SkillsDeck,
} from "../../components/index";

import { WhoAmI } from "../../components/who-am-i";
import { Timeline } from "../../components/vertical-timeline/timeline";

interface IAboutPageProps {
	location: any;
	data: Data;
}

const AboutPage: React.FunctionComponent<IAboutPageProps> = props => {
	const { location, data } = props;
	const renderImage = () => {
		const queryPath = data.allContentfulAsset.edges[0].node;

		if (queryPath) {
			return <WhoAmI data={queryPath} />;
		}
		return <p>Loading...</p>;
	};

	const cards: AllContentfulSkillsEdge[] = data ? data.allContentfulSkills.edges : [];

	return (
		<Layout data={data}>
			<ContentPage>
				<A11yPageTitle title="About the Author" />

				<Meta title="About" location={location} />

				<PageTitle
					title="About me"
					subtitle="Designer, Developer, Dad, Geek, Nerd, Music Lover."
					containerBackgroundColor="var(--color-white, #ffffff)"
				/>
				<MainContent
					style={{
						overflowX: "hidden",
					}}
				>
					{renderImage()}
					<LogoCarousel />
					<SkillsDeck cards={cards} />
					<Timeline />
					<LastPlayedSong />
				</MainContent>
				<CallToActionWrapper>
					<CallToActionItem
						id="cta-resume-paper"
						subtitle="Want it all on paper?"
						title="Check out my resumé"
						linkText="Download in PDF"
						linkURL="/resume/resume-joaodias-en.pdf"
						isFile
					/>
					<CallToActionItem
						id="cta-lets-chat"
						subtitle="Have an idea for a project?"
						title="Let's chat!"
						linkText="Visit the Contacts page"
						linkURL="/contact/"
					/>
				</CallToActionWrapper>
				<BlobOne />
			</ContentPage>
		</Layout>
	);
};

// ////////
// GRAPHQL
// ////////
export const aboutMeQuery = graphql`
	query AboutMeImage {
		allContentfulAsset(filter: { title: { eq: "About me Photo" } }) {
			edges {
				node {
					id
					title
					description
					fluid(maxWidth: 568) {
						src
						srcSet
						srcWebp
						srcSetWebp
						sizes
						aspectRatio
					}
				}
			}
		}
		allContentfulSkills {
			edges {
				node {
					id
					title
					description
					backgroundColor
					icon {
						file {
							url
							contentType
						}
						title
						description
					}
				}
			}
		}
	}
`;

export default AboutPage;
