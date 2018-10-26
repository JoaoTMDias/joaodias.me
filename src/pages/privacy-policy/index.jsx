/**
 * Import Libraries
 */
import React from 'react';
import BodyClassName from 'react-body-classname';
import styled from 'styled-components';
import { rem } from 'polished';
import { graphql } from 'gatsby';

/**
 * Import Components
 */
import Layout from '../../components/layout';
import Meta from '../../components/general/meta';
import ContentPage from '../../components/content-page';
import PageTitle from '../../components/ui/page-title';
import { CallToActionItem, CallToActionWrapper } from '../../components/navigation/call-to-action/index';
import Footer from '../../components/navigation/footer';

/**
 *
 * Styling
 *
 */
import styles from './styles.module.scss';

const PrivacyPolicyPage = ({ location, data }) => {
  const privacyPolicyArray = data.allContentfulPrivacyPolicy.edges;

  return (
    <Layout>
      <BodyClassName className="privacy-policy">
        <ContentPage>
          <Meta location={location} />
          <PageTitle title="Privacy Policy" />

          <section id="about-video" className="l__container l__section">
            <article className={`l__row ${styles.wrapper}`}>
              <p className={styles.intro}>
                This privacy policy has been compiled to better serve those of you who are concerned with how their
                'Personally Identifiable Information' (PII) is being used on my website. PII, as described in EU privacy
                law and information security, is information that can be used on its own or with other information to
                identify, contact, or locate a single person, or to identify an individual in context. Please read my
                privacy policy carefully to get a clear understanding of how I collect, use, protect or otherwise handle
                your Personally Identifiable Information in accordance with my website.
              </p>

              <hr />
              {privacyPolicyArray.map(item => (
                <Details key={item.node.id} id={`${item.node.id}`}>
                  <summary className="title">{`${item.node.summary}`}</summary>
                  <p className="description">{`${item.node.description.description}`}</p>
                  <hr />
                </Details>
              ))}
            </article>
          </section>

          <CallToActionWrapper>
            <CallToActionItem
              id="cta-home-page"
              subtitle="Read everything?"
              title="Back to the starting point"
              linkText="Go to the home page"
              linkURL="/"
            />
            <CallToActionItem
              id="cta-contacts-page"
              subtitle="Found an issue with this doc?"
              title="Drop me an email"
              linkText="Go to the contacts page"
              linkURL="/contacts/"
            />
          </CallToActionWrapper>
          <Footer />
        </ContentPage>
      </BodyClassName>
    </Layout>
  );
};

// Graphql
export const privacyPolicyQuery = graphql`
  query PrivacyPolicyItems {
    allContentfulPrivacyPolicy(sort: { fields: [createdAt], order: ASC }) {
      edges {
        node {
          id
          createdAt
          summary
          description {
            description
          }
        }
      }
    }
  }
`;

// Styled Components
const Details = styled.details`
  margin-bottom: ${rem('32px')};
  @media ${props => props.theme.breakpointLarge} {
    margin-bottom: ${rem('48px')};
  }

  .title {
    font-family: ${props => props.theme.headerFontFamily};
    margin-bottom: ${props => props.theme.globalMargin};
    color: ${props => props.theme.gray9};
    cursor: pointer;

    font-size: ${rem('19px')};

    @media ${props => props.theme.breakpointMedium} {
      font-size: ${rem('20px')};
    }

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('24px')};
    }

    &:focus,
    &:hover,
    &:active {
      outline-color: $gray4;
      outline-width: 1px;
      outline-style: dashed;
    }
  }

  .description {
    color: ${props => props.theme.gray8};
    margin-left: ${rem('24px')};
    font-size: ${rem('16px')};

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('18px')};
    }
  }
`;

export default PrivacyPolicyPage;
