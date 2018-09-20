// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';

/** ********
 ** Component: ContentSpinner
 ** @type: functional stateless component
 ** @description: Spinner for content loading UX
 ********* */
const ContentSpinner = props => (
  <Wrapper
    className="spinner__content__wrapper"
    center={props.center}
    size={props.size}
    aria-live="polite"
    aria-hidden="true"
    aria-label="Do not refresh the page"
    role="progressbar"
    tabindex="-1"
    duration={props.duration}
  >
    <svg className="spinner__content__container" viewBox="0 0 50 50">
      <circle className="spinner__content__circle" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  </Wrapper>
);

// Styled Components
const wrapperTimeout = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  60%{
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-48px);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const spinnerRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${props => (props.center ? '100%' : `${rem(`${props.size}px`)}`)};
  margin: 0 auto;
  position: relative;
  display: table;
  display: flex;
  flex-direction: row;
  justify-content: ${props => (props.center ? 'center' : 'inherit')};
  align-items: ${props => (props.center ? 'center' : 'inherit')};
  background-color: transparent;

  animation-name: ${wrapperTimeout};
  animation-duration: 500ms;
  animation-delay: ${props => (props.duration ? `${props.duration}ms` : '3000ms')};
  animation-timing-function: ${props => props.theme.easeInBack};
  animation-fill-mode: forwards;
  opacity: 1;

  user-select: none;
  pointer-events: none;

  .spinner {
    &__content {
      &__container {
        display: table-cell;
        vertical-align: middle;
        display: flex;
        z-index: 2;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: ${props => rem(`${-1 * (props.size / 2)}px`)} 0 0 ${props => rem(`${-1 * (props.size / 2)}px`)};
        width: ${props => rem(`${props.size}px`)};
        height: ${props => rem(`${props.size}px`)};

        animation-name: ${spinnerRotate};
        animation-duration: 2000ms;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
      }

      &__circle {
        stroke: rgb(191, 204, 234);
        stroke-linecap: round;

        animation-name: ${dashAnimation};
        animation-duration: 1500ms;
        animation-timing-function: ${props => props.theme.easeInOutQuint};
        animation-iteration-count: infinite;
        animation-delay: 0;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
      }
    }
  }
`;

ContentSpinner.defaultProps = {
  center: true,
  size: 32,
  duration: 3000,
};

ContentSpinner.propTypes = {
  duration: PropTypes.number,
  center: PropTypes.bool,
  size: PropTypes.number,
};

export default ContentSpinner;
