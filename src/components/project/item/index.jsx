/**
 * Import libraries
 */
import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';

/**
 * Import Styling
 */
import themeStyles from '../themes.module.scss';
import styles from './styles.module.scss';

const ProjectItem = ({ project }) => (
  <Link
    to={`/work/${project.slug}`}
    className={classNames(
      styles.project__item,
      themeStyles[project.theme.light ? 'ProjectItem--light' : 'ProjectItem--dark'],
      `${project.className}`,
    )}
    style={{
      backgroundImage: `url(${project.cover})`,
      backgroundColor: `${project.theme.background}`,
    }}
  >
    <div
      className={styles.project__inner}
      style={{ backgroundColor: `${project.theme.background}` }}
    >
      <header className={classNames(styles.project__top)}>
        <h3 className={styles.project__type}>{project.type}</h3>
        <h2 className={styles.project__title}>{project.title}</h2>
      </header>

      <div className={styles.project__center}>
        <p className={styles.project__description}>{project.description}</p>
      </div>

      <footer className={classNames(styles.project__bottom)}>
        <p className={styles.project__seemore}>View Project</p>
      </footer>
    </div>
  </Link>
);

export default ProjectItem;
