// Libraries
import React from 'react';
import styled from 'styled-components';
import { Spring } from 'react-spring';
import { graphql } from 'gatsby';

// Components
import { CallToActionItem, CallToActionWrapper } from '../components/navigation/call-to-action/index';
import { asyncComponent, Layout, A11yPageTitle, ContentPage, Meta, PortfolioItem } from '../components/index';

import { BlobThree } from '../components/ui/blobs/index';

const Footer = asyncComponent(() => {
  return import(`../components/navigation/footer`);
});

const HomePageHero = asyncComponent(() => {
  return import(`../components/ui/full-page-hero/index`);
});

const from = {
  opacity: 0,
  transform: `translate3d(0, 4rem, 0)`,
};

const to = {
  opacity: 1,
  transform: `translate3d(0,0,0)`,
};

const IndexPage = ({ location, data }) => {
  // Latest Article

  const renderPortfolioItems = data => {
    const queryPath = data.allContentfulPortfolio.edges;

    if (queryPath) {
      return (
        <Spring delay={1000} from={from} to={to}>
          {props => {
            return (
              <List className="l__row l__container" style={props}>
                {queryPath.map(item => {
                  return (
                    <PortfolioItem
                      key={`${item.node.id}`}
                      id={`${item.node.id}`}
                      to={item.node.slug}
                      title={item.node.title}
                      theme={item.node.theme}
                      alt={item.node.featuredImage ? item.node.featuredImage.title : ''}
                      cover={item.node.featuredImage ? item.node.featuredImage.fluid : {}}
                      color={item.node.color}
                      type={item.node.date}
                      description={item.node.description ? item.node.description.description : ''}
                      project={item.node}
                    />
                  );
                })}
              </List>
            );
          }}
        </Spring>
      );
    }
    return <p>Loading...</p>;
  };

  if (typeof document !== 'undefined') {
    let focusElement = document.querySelector('[href="#main-content"]');

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
        <Wrapper id="main-content" className="l__container l__section">
          {renderPortfolioItems(data)}
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
        <BlobThree />
        <Footer />
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
            fluid(maxWidth: 1400) {
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

// ////////
// STYLED COMPONENTS
// ////////
const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 0;
`;

const List = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media ${props => props.theme.breakpointMedium} {
    flex-direction: row;
  }
`;

export default IndexPage;
