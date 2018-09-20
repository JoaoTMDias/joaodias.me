/**
 * Import Libraries
 */
import React from 'react';
import classnames from 'classnames';

/**
 * Styling
 */
import styles from './styles.module.scss';

const CallToActionWrapper = ({ children }) => (
  <aside className={classnames('l__container', 'l__section', styles.container)}>
    <div className={classnames('l__row', styles.row)}>{children}</div>
  </aside>
);

export default CallToActionWrapper;
