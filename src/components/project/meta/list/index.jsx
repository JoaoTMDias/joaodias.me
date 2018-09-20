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
  <ul className={classnames(styles.list)}>
    <li className={styles.title}>{title}</li>
    {children}
  </ul>
);

export default ProjectMetaList;
