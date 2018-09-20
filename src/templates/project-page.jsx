// Libraries
import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import styled from 'styled-components';
import { graphql } from 'gatsby';

// Components
import Layout from '../components/layout';
import {
  ProjectDescription, ProjectHero, ProjectView, ProjectMeta, ProjectIntroduction,
} from '../components/project';
import { CallToActionItem, CallToActionWrapper } from '../components/navigation/call-to-action/index';
import Footer from '../components/navigation/footer';

/**
 * Product Page Template
 *
 * @class ProjectPage
 * @extends {React.Component}
 */
const ProjectPage = (props) => {
  const post = get(props, 'data.contentfulPortfolio');
  const siteTitle = get(props, 'data.site.siteMetadata.title');

  console.log(post.skills);

  return (
    <Layout>
      <div id="content-page">
        <Helmet title={`${post.title} | João Dias`} />
        <ProjectIntroduction
          id={`${post.introduction.internal.contentDigest}`}
          description={`${post.description.description}`}
          title={`${post.title}`}
          text={`${post.introduction.internal.content}`}
        />
        <div id="main-content">
          <ProjectHero id={`hero-${post.slug}`} backgroundImage={post.featuredImage.file.url} />

          <ProjectMeta skills={post.skills} tools={post.tools} client={`${post.client}`} date={`${post.date}`} />
          <Body className="l__row">
            <div
              className="l__project l__section"
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </Body>
        </div>
        <CallToActionWrapper>
          <CallToActionItem
            subtitle="Related Project"
            title="Return to the projects list"
            linkText="Visit the About page"
            linkURL="/about/"
          />
          <CallToActionItem
            subtitle="Related Project"
            title="Let's connect"
            linkText="Check it out"
            linkURL="/contact/"
          />
        </CallToActionWrapper>
        <Footer />
      </div>
    </Layout>
  );
};

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
