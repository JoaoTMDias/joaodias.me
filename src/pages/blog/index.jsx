// Libraries
import React from 'react';
import BodyClassName from 'react-body-classname';
import styled from 'styled-components';

// Components
import { Layout, ContentPage, Meta, MainContent, PageTitle } from '../../components/index';
import { CallToActionItem, CallToActionWrapper } from '../../components/navigation/call-to-action';
import Footer from '../../components/navigation/footer';
import ArticleItem from './article-item/index';

const BlogPage = ({ location }) => (
  <Layout>
    <BodyClassName className="blog">
      <ContentPage>
        <Meta title="Blog" location={location} />
        <PageTitle title="Blog" subtitle="Recent Articles" containerBackgroundColor="var(--color-white)" />
        <MainContent>
          <section className="l__container l__section">
            <div className="l__row">
              <List id="articles-grid">
                <ArticleItem />
                <ArticleItem />
                <ArticleItem />
                <ArticleItem />
              </List>
            </div>
          </section>
        </MainContent>
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
            id="cta-contacts-page"
            subtitle="Have an idea for a project?"
            title="Let's chat!"
            linkText="Visit the Contacts page"
            linkURL="/contact/"
          />
        </CallToActionWrapper>
        <Footer />
      </ContentPage>
    </BodyClassName>
  </Layout>
);

const List = styled.ol`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
  list-style-type: none;
`;

export default BlogPage;
