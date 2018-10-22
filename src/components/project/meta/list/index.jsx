// Libraries
import React from 'react';
import classnames from 'classnames';

// Components
// import Component from '../components/componentName';

// Styling
import styles from './styles.module.scss';

/** ********
 ** Component: ProjectMetaList
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
const ProjectMetaList = ({ title, children }) => (
  <ol className={classnames(styles.list)}>
    <li className={styles.title} tabIndex="-1">
      {title}
    </li>
    {children}
  </ol>
);

export default ProjectMetaList;
