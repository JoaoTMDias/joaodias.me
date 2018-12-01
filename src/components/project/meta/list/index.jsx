// Libraries
import React from 'react';

// Components
// import Component from '../components/componentName';

// Styling
import styles from './styles.module.scss';

/** ********
 ** Component: ProjectMetaList
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
const ProjectMetaList = ({ title, children }) => {
  return (
    <ol className={styles.list}>
      <li className={styles.title} tabIndex="-1">
        {title}
      </li>
      {children}
    </ol>
  );
};

export default ProjectMetaList;
