/**
 * Import Libraries
 */
import React from 'react';
import Helmet from 'react-helmet';
import BodyClassName from 'react-body-classname';

/**
 * Import Components
 */
import Layout from '../../components/layout';
import Meta from '../../components/general/meta';
import ContentPage from '../../components/content-page';
import PageTitle from '../../components/ui/page-title';
import { CallToActionItem, CallToActionWrapper } from '../../components/navigation/call-to-action/index';
import Footer from '../../components/navigation/footer';
import Form from '../../components/general/forms/form';

const ContactPage = ({ location }) => (
  <Layout>
    <BodyClassName className="contact">
      <ContentPage>
        <Meta title="Contacts" location={location} />
        <PageTitle
          title="Contacts"
          subtitle="Let's work together."
          containerBackgroundColor="var(--color-white, #ffffff)"
        />
        <div className="l__container">
          <Form />
        </div>
        <CallToActionWrapper>
          <CallToActionItem
            subtitle="João Dias"
            title="UI Designer and Frontend developer, based in Coimbra."
            linkText="Visit the About page"
            linkURL="/about/"
          />
          <CallToActionItem
            subtitle="Want it all on paper?"
            title="Check out my resumé"
            linkText="Download in PDF"
            linkURL="/resume/resume-joaodias-en.pdf"
          />
        </CallToActionWrapper>
        <Footer />
      </ContentPage>
    </BodyClassName>
  </Layout>
);

export default ContactPage;
