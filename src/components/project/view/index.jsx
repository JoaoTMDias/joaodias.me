import React from 'react';

import { ContentPage, Meta } from '../../index';

// Styles
import themeStyles from '../themes.module.scss';
import styles from './styles.module.scss';

const ProjectView = ({ children, className, location, project }) => {
  const flavour = project.theme.light ? 'ProjectItem--light' : 'ProjectItem--dark';

  return (
    <ContentPage className={`${themeStyles[flavour]} ${styles[project.className]} ${className}`}>
      <Meta title={project.title} description={project.description} location={location} />
      {children}
    </ContentPage>
  );
};

export default ProjectView;
