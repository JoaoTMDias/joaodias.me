/**
 * Import libraries
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { rem } from 'polished';

import Img from 'gatsby-image';

/**
 * Import Styling
 */
import styles from './styles.module.scss';

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cover, id, to, alt, theme, color, type, title, description } = this.props;

    if (cover) {
      return (
        <Item
          id={`${id}`}
          to={`/work/${to}`}
          title={alt}
          className={`item--${theme} ${styles.item}`}
          data-theme={`${theme}`}
          aria-label={`Open project`}
        >
          <LazyLoadImage
            fluid={cover}
            title={alt}
            alt={alt}
            style={{
              position: 'absolute',
            }}
            backgroundColor={`${color}`}
            imgStyle={{
              position: 'relative',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
            aspectRatio={cover.aspectRatio}
            fadeIn
          />
          <div className={`${styles.inner} inner`} style={{ backgroundColor: `${color}` }}>
            <header className={styles.header}>
              <h3 className={`type ${styles.type}`}>{type}</h3>
              <h2 className={`title ${styles.title}`}>{title}</h2>
            </header>

            <div className={styles.content}>
              <p className={`description ${styles.description}`}>{description}</p>
            </div>

            <footer className={styles.footer}>
              <p className={styles.seemore}>View Project</p>
            </footer>
          </div>
        </Item>
      );
    } else {
      return null;
    }
  }
}

PortfolioItem.propTypes = {
  id: PropTypes.string,
};

// ///////////////////
// STYLED COMPONENTS
// ///////////////////
const Item = styled(Link)`
  position: relative;
  overflow: hidden;
  background-color: var(--color-gray2);
  background-repeat: no-repeat;
  background-position: center center !important;
  background-size: cover !important;
  background-color: transparent;
  text-decoration: none;
  margin-bottom: var(--global-margin);
  position: relative;
  transition-property: transform;

  ${props =>
    props.light &&
    css`
      .title,
      .type,
      .description {
        color: var(--color-white);
      }
    `};
`;

const LazyLoadImage = styled(Img)`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${rem('375px')};
  overflow: visible;
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

export default PortfolioItem;
