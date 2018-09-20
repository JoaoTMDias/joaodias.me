/**
 * Import libraries
 */
import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Img from 'gatsby-image';
// import GracefulImage from '../../ui/graceful-image/index';

/**
 * Import Styling
 */
import styles from './styles.module.scss';

const PortfolioItem = project => (
  <Item
    to={`/work/${project.to}`}
    title={project.alt}
    className={`item--${project.theme} ${styles.item}`}
    data-theme={`${project.theme}`}
  >
    <LazyLoadImage
      fluid={project.cover}
      title={project.alt}
      alt={project.alt}
      style={{
        position: 'absolute',
      }}
      backgroundColor={`${project.color}`}
      imgStyle={{
        position: 'relative',
        objectFit: 'cover',
        objectPosition: 'center center',
      }}
      fadeIn
    />
    <div className={styles.inner} style={{ backgroundColor: `${project.color}` }}>
      <header className={styles.header}>
        <h3 className={`type ${styles.type}`}>{project.type}</h3>
        <h2 className={`title ${styles.title}`}>{project.title}</h2>
      </header>

      <div className={styles.content}>
        <p className={`description ${styles.description}`}>{project.description}</p>
      </div>

      <footer className={styles.footer}>
        <p className={styles.seemore}>View Project</p>
      </footer>
    </div>
  </Item>
);

export default PortfolioItem;

// ///////////////////
// STYLED COMPONENTS
// ///////////////////
const Item = styled(Link)`
  background-color: ${props => props.theme.gray2};
  background-repeat: no-repeat;
  background-position: center center !important;
  background-size: cover !important;
  background-color: transparent;
  text-decoration: none;
  margin-bottom: ${props => props.theme.globalMargin};
  position: relative;
  transition-property: transform;

  ${props => props.light
    && css`
      .title,
      .type,
      .description {
        color: ${props.theme.white};
      }
    `} &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32);
    z-index: -1;
    opacity: 0;
    transform: scale(0.95);
    transition: all 250ms ease-in-out;
    will-change: transform;
  }

  &:hover {
    &:before {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32);
    }
  }
`;

const LazyLoadImage = styled(Img)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${rem('375px')};
  overflow: hidden;
  background-size: cover;
  background-position: center center;

  @media ${props => props.theme.breakpointMedium} {
    height: ${rem('414px')};
  }

  @media ${props => props.theme.breakpointLarge} {
    height: ${rem('480px')};
  }

  @media ${props => props.theme.breakpointXlarge} {
    height: ${rem('560px')};
  }

  > div {
    padding-bottom: 0 !important;
  }
`;
