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
import A11yPageTitle from '../../components/page-title';
import { BlobTwo } from '../../components/ui/blobs/index';


const ContactPage = ({ location }) => (
  <Layout>
    <BodyClassName className="contact">
      <ContentPage>
        <A11yPageTitle title="Contacts" />
        <Meta title="Contacts" location={location} />
        <PageTitle title="Contacts" subtitle="Let's work together." containerBackgroundColor="var(--color-white)" />
        <div id="main-content" className="l__container">
          <Form />
        </div>
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
            title="UI Designer and Frontend developer, based in Coimbra."
            linkText="Visit the About page"
            linkURL="/about/"
          />
        </CallToActionWrapper>
        <BlobTwo />
        <Footer />
      </ContentPage>
    </BodyClassName>
  </Layout>
);

export default ContactPage;
