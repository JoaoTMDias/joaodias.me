/**
 * Import Libraries
 */
import React from 'react';

/**
 * Styling
 */
import styles from './styles.module.scss';

const CallToActionWrapper = ({ children }) => {
  return (
    <aside className={`l__container l__section ${styles.container}`}>
      <div className={`l__row ${styles.row}`}>{children}</div>
    </aside>
  );
};

export default CallToActionWrapper;
