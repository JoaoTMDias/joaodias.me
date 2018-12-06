/**
 * Import Libraries
 */
import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { graphql } from 'gatsby';

/**
 * Import Components
 */
import {
  Layout,
  A11yPageTitle,
  CallToActionItem,
  CallToActionWrapper,
  Footer,
  ContentPage,
  Meta,
  PageTitle,
} from '../../components/index';

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
      <ContentPage>
        <A11yPageTitle title="Privacy Policy" />

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
              <Details key={item.node.id} id={`${item.node.id}`} arial-labelledby={`details-summary-${item.node.id}`}>
                <summary id={`details-summary-${item.node.id}`} className="title" tabIndex="0">{`${
                  item.node.summary
                }`}</summary>
                <p className="description" tabIndex="0">{`${item.node.description.description}`}</p>
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
    font-family: var(--heading-font-family);
    margin-bottom: var(--global-margin);
    color: var(--color-gray9);
    cursor: pointer;

    font-size: ${rem('19px')};

    @media ${props => props.theme.breakpointMedium} {
      font-size: ${rem('20px')};
    }

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('24px')};
    }
  }

  .description {
    color: var(--color-gray8);
    margin-left: ${rem('24px')};
    font-size: ${rem('16px')};

    @media ${props => props.theme.breakpointLarge} {
      font-size: ${rem('18px')};
    }
  }

  .title,
  .description {
    &:focus {
      outline-color: var(--color-gray6);
      outline-width: 1px;
      outline-style: dashed;
      outline-offset: -1px;
    }
  }
`;

export default PrivacyPolicyPage;
