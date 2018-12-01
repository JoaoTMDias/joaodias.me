import React from 'react';
import styles from './styles.module.scss';

const ProjectDescription = ({ children, media }) => (
  <article className={`l__row ${styles.row}`}>
    <div className={styles.media}>{media}</div>
    <div className={styles.information}>{children}</div>
  </article>
);

export default ProjectDescription;
