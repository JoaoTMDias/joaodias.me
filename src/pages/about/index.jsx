// Libraries
import React from 'react';
import BodyClassName from 'react-body-classname';
import { graphql } from 'gatsby';

// Components
import Meta from '../../components/general/meta';
import MainContent from '../../components/general/main-content';
import PageTitle from '../../components/ui/page-title';
import { CallToActionItem, CallToActionWrapper } from '../../components/navigation/call-to-action/index';
import {
  asyncComponent,
  Layout,
  A11yPageTitle,
  LogoCarousel,
  LastPlayedSong,
  ContentPage,
} from '../../components/index';

import { BlobOne } from '../../components/ui/blobs/index';

const WhoAmI = asyncComponent(() => {
  return import(`./who-am-i`);
});

const Timeline = asyncComponent(() => {
  return import(`./timeline`);
});

const Footer = asyncComponent(() => {
  return import(`../../components/navigation/footer`);
});

const AboutPage = ({ location, data }) => {
  const renderImage = data => {
    let queryPath = data.allContentfulAsset.edges[0].node;

    //console.log('query path: ', queryPath);

    if (queryPath) {
      return <WhoAmI data={queryPath} />;
    }
    return <p>Loading...</p>;
  };

  return (
    <Layout>
      <BodyClassName className="about">
        <ContentPage>
          <A11yPageTitle title="About the Author" />

          <Meta title="About" location={location} />

          <PageTitle
            title="About me"
            subtitle="Designer, Developer, Dad, Geek, Nerd, Music Lover."
            containerBackgroundColor="var(--color-white)"
          />
          <MainContent
            style={{
              overflowX: 'hidden',
            }}
          >
            {renderImage(data)}
            <LogoCarousel />
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
          <Footer />
        </ContentPage>
      </BodyClassName>
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
  }
`;

export default AboutPage;
