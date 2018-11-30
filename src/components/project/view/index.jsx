import React from 'react';
import classNames from 'classnames';

import { ContentPage } from '../../index';
import Meta from '../../general/meta';

import themeStyles from '../themes.module.scss';
import styles from './styles.module.scss';

const ProjectView = ({ children, className, location, project }) => (
  <ContentPage
    className={classNames(
      themeStyles[project.theme.light ? 'ProjectItem--light' : 'ProjectItem--dark'],
      styles[project.className],
      className
    )}
  >
    <Meta title={project.title} description={project.description} location={location} />
    {children}
  </ContentPage>
);

export default ProjectView;
