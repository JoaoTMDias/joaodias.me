/**
 * Import Libraries
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ExternalLink from '../../external-link';

/**
 * Styling
 */
import styles from './styles.module.scss';

const CallToActionItem = (props) => {
  const {
    title, subtitle, linkText, linkURL, isFile,
  } = props;

  if (isFile) {
    return (
      <ExternalLink to={linkURL} className={`${styles.item}`} aria-label="Download file">
        <div className={styles.item__inner}>
          <header className={`fadeIn ${styles.item__top}`}>
            <p className={styles.item__subtitle}>{subtitle}</p>
            <h1 className={styles.item__title}>{title}</h1>
          </header>
          <footer className={styles.item__bottom}>
            <p className={`fadeIn ${styles.item__link}`}>{linkText}</p>
          </footer>
        </div>
      </ExternalLink>
    );
  }
  return (
    <Link to={linkURL} className={`${styles.item}`}>
      <div className={styles.item__inner}>
        <header className={`fadeIn ${styles.item__top}`}>
          <p className={styles.item__subtitle}>{subtitle}</p>
          <h1 className={styles.item__title}>{title}</h1>
        </header>
        <footer className={styles.item__bottom}>
          <p className={`fadeIn ${styles.item__link}`}>{linkText}</p>
        </footer>
      </div>
    </Link>
  );
};

CallToActionItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkText: PropTypes.string,
  linkURL: PropTypes.string,
  isFile: PropTypes.bool,
};

export default CallToActionItem;
