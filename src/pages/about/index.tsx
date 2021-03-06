// Libraries
import React from "react";
import { graphql } from "gatsby";

// Interfaces
import { Data, AllContentfulSkillsEdge } from "../../data/interfaces/index.interfaces";

// Components
import {
	CallToActionItem,
	CallToActionWrapper,
	LogoCarousel,
	LastPlayedSong,
	MainContent,
	BlobOne,
	PageTitle,
	SkillsDeck,
	ContentPage,
} from "../../components/index";

import { WhoAmI } from "../../components/who-am-i";
import { Timeline } from "../../components/vertical-timeline/timeline";
import { Meta } from "../../components/meta";

interface IAboutPageProps {
	location: any;
	data: Data;
}

const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
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
		<ContentPage>
			<Meta title="About" location={location} />

			<PageTitle title="About me" subtitle="Designer + Developer" backgroundColor="var(--color-white, #ffffff)" />
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
					ariaLabel="Save my resumé in a PDF format"
					isFile
				/>
				<CallToActionItem
					id="cta-lets-chat"
					subtitle="Have an idea for a project?"
					title="Let's chat!"
					linkText="Visit the Contacts page"
					ariaLabel="Navigate to the contacts page"
					linkURL="/contact/"
				/>
			</CallToActionWrapper>
			<BlobOne />
		</ContentPage>
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
