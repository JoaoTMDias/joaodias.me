// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import styled, { keyframes } from 'styled-components';

/**
 *
 * Styling
 *
 */
import styles from './styles.module.scss';

/** ********
 ** Component: WhoAmI
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
class WhoAmI extends PureComponent {
  renderImage(data) {
    if (data) {
      return (
        <Container>
          <Shape>
            <Img fluid={data.fluid} title={data.title} alt={data.alt} fadeIn />
          </Shape>
        </Container>
      );
    }

    return false;
  }

  render() {
    const { data } = this.props;
    return (
      <section id="who-am-i" className="l__container l__section">
        <div className={`l__row ${styles.whoAmI}`}>
          <div id="who-am-i-image" className={styles.whoAmI__image}>
            {this.renderImage(data)}
          </div>
          <div id="who-am-i-text" className={styles.whoAmI__text}>
            <h3 className={styles.whoAmI__title}>I make stuff for the web.</h3>
            <h4 className={styles.whoAmI__lead}>
              I’m João — an interface designer and frontend developer based in Coimbra, Portugal.
            </h4>
            <p>
              I’ve been working in this industry for over 9 years and now mostly specialized in UX Design and Web
              Development for all kinds of screen sizes and users.
            </p>
            <p>
              WIT Software is where I work since 2013, and it is one of the most proeminent software companies in
              Portugal.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const morph = keyframes`
  from {border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;}
  to {border-radius: 40% 60%;}
`;

const Container = styled.figure`
  width: 100%;
  height: 100%;
  animation-name: ${spin};
  animation-duration: 20000ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  position: relative;
`;

const Shape = styled.div`
  position: relative;
  overflow: hidden;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 5;
    width: 100%;
    height: 100%;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transition: border-radius 1s ease-out;
    animation-name: ${morph};
    animation-duration: 16000ms;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-play-state: running;
  }

  img,
  source {
    width: 110% !important;
    height: 110% !important;
    position: absolute;
    left: -5% !important;
    top: -5% !important;
    display: flex;
    animation-name: ${spin};
    animation-duration: 20000ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: reverse;
    overflow: hidden;
  }
`;

WhoAmI.propTypes = {
  // eslint-disable-next-line
  data: PropTypes.object,
};

export default WhoAmI;
