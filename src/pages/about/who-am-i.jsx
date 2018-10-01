// Libraries
import React from 'react';
import PropTypes from 'prop-types';

import Img from 'gatsby-image';

/** asc
 * Data
 */
import ImageWhoAmI from '../../assets/images/img-joaodias-about.jpg';

/**
 *
 * Styling
 *
 */
import styles from './styles.module.scss';

/** ********
 ** Component: WhoAmI
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
const WhoAmI = ({ data }) => (
  <section id="who-am-i" className="l__container l__section">
    <div className={`l__row ${styles.whoAmI}`}>
      <figure id="who-am-i-image" className={styles.whoAmI__image}>
        <Img id={data.id} fluid={data.fluid} title={data.title} alt={data.alt} fadeIn />
      </figure>
      <div id="who-am-i-text" className={styles.whoAmI__text}>
        <h3 className={styles.whoAmI__title}>I make stuff for the web.</h3>
        <h5 className={styles.whoAmI__lead}>
          I’m João — an interface designer and frontend developer based in Coimbra, Portugal.
        </h5>
        <p>
          I’ve been working in this industry for over 9 years and now mostly specialized in UX Design and Web
          Development for all kinds of screen sizes and users.
        </p>
        <p>
          WIT Software is where I work since 2013, and it is one of the most proeminent software companies in Portugal.
        </p>
      </div>
    </div>
  </section>
);

WhoAmI.propTypes = {
  data: PropTypes.object,
};

export default WhoAmI;
