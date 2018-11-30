// Libraries
import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import BodyClassName from 'react-body-classname';

// Components
import { ProjectHero, ProjectMeta, ProjectIntroduction } from '../components/project';
import { CallToActionItem, CallToActionWrapper } from '../components/navigation/call-to-action/index';
import Footer from '../components/navigation/footer';
import { Layout, A11yPageTitle, ContentPage } from '../components/index.js';
import { BlobFour } from '../components/ui/blobs/index';

/**
 * Product Page Template
 *
 * @class ProjectPage
 * @extends {React.Component}
 */
class ProjectPage extends PureComponent {
  componentDidMount() {
    const items = Array.from(document.querySelectorAll('.l__project h2, .l__project img, .l__project a'));
    // console.log('items: ', items);

    items.map(item => {
      item.tabIndex = 0;
      return;
    });
  }

  render() {
    const post = get(this.props, 'data.contentfulPortfolio');

    if (post) {
      return (
        <Layout>
          <BodyClassName className="project-details">
            <ContentPage>
              <A11yPageTitle title={`Project page title: ${post.title}`} />

              <Helmet>
                <title>{`${post.title} | João Dias`}</title>
                <script async src="//cdn.embedly.com/widgets/platform.js" charset="UTF-8" />
              </Helmet>
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
              <Footer />
            </ContentPage>
          </BodyClassName>
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
