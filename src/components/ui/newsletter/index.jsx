// Libraries
import React from 'react';

// Components
import NewsletterForm from './newsletterForm';

// Styling
import styles from './styles.module.scss';

/** ********
 ** Component: NewsletterForm
 ** @type: functional stateless component
 ** @description: Form for the Newsletter Sign Up process
 ********* */
const NewsletterSignUp = ({ backgroundStyle }) => (
  <section
    id="sign-up"
    className={`l__container l__section ${styles.newsletter}`}
    style={{ backgroundColor: backgroundStyle }}
  >
    <div className={`l__row ${styles.newsletter__intro}`}>
      <h3 className={styles.newsletter__title}>Sign up for my newsletter!</h3>
      <p className={styles.newsletter__subtitle}>It's about UI, Development and Productivity Tools.</p>
      <p className={styles.newsletter__subtitle}>And it comes out every 2 weeks (more or less).</p>
      <NewsletterForm />
    </div>
  </section>
);

export default NewsletterSignUp;
