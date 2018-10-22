// Libraries
import React from 'react';
import styled from 'styled-components';

//import Loadable from 'react-loadable'
import { graphql } from 'gatsby';

// Components
import asyncComponent from '../components/hoc/asyncComponent';
import { CallToActionItem, CallToActionWrapper } from '../components/navigation/call-to-action/index';
import Layout from '../components/layout';
import ContentPage from '../components/content-page/index';
import Meta from '../components/general/meta/index';
import PortfolioItem from '../components/project/item/portfolioitem';

const Footer = asyncComponent(() => {
  return import(`../components/navigation/footer`);
});

const HomePageHero = asyncComponent(() => {
  return import(`../components/ui/full-page-hero/index`);
});

const IndexPage = ({ location, data }) => {
  // Latest Article

  const renderPortfolioItems = data => {
    const queryPath = data.allContentfulPortfolio.edges;

    if (queryPath) {
      return (
        <List className="l__row l__container">
          {queryPath.map(item => {
            return (
              <PortfolioItem
                key={`${item.node.id}`}
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
    }
    return <p>Loading...</p>;
  };

  let focusElement = document.querySelector('[href="#main-content"]');

  if (focusElement) {
    focusElement.focus();
  }

  return (
    <Layout>
      <ContentPage>
        <Meta location={location} />
        <HomePageHero />
        <Wrapper id="main-content" className="l__container l__section">
          {renderPortfolioItems(data)}
        </Wrapper>
        <CallToActionWrapper>
          <CallToActionItem
            subtitle="João Dias"
            title="Know more about me"
            linkText="Visit the About page"
            linkURL="/about/"
          />
          <CallToActionItem
            subtitle="Like reading?"
            title="My latest thoughts"
            linkText="Visit my Blog on Medium.com"
            linkURL="/contact/"
          />
        </CallToActionWrapper>
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
