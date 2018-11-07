// Libraries
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';

/** ********
 ** Component: FooterWave
 ** @type: functional stateless component
 ** @description: Wave that sits on top of the footer on some pages
 ********* */
const FooterWave = () => (
  <Wave id="wave">
    <div className="container">
      <svg
        className="svg"
        xmlns="http://www.w3.org/2000/svg"
        height="14"
        viewBox="0 0 54 14"
        preserveAspectRatio="none"
      >
        <path className="path" fill="#FFF" d="M27,10 C21,12 14,14 0,14 L0,0 L54,0 L54,3 C40,3 33,8 27,10 Z" />
      </svg>
    </div>
  </Wave>
);

// Styling
const waveAnimation = keyframes`
    0% {
      d: path('M 27 10C 21 8 14 3 0 3L 0 0L 54 0L 54 14C 40 14 33 12 27 10Z');
    }
    50% {
      d: path('M 27 14C 12 14 5 7 0 7L 0 0L 54 0L 54 7C 49 7 42 14 27 14Z');
    }
    to {
      d: path('M 27 10C 21 12 14 14 0 14L 0 0L 54 0L 54 3C 40 3 33 8 27 10Z');
    }
`;

const Wave = styled.div`
  position: absolute;
  width: 100%;
  height: ${rem('96px')};
  z-index: 1;
  top: 0;
  transform: matrix(1, 0, 0, -1, 0, 0);
  bottom: 0;
  margin-bottom: 0;

  .container {
    position: relative;
    height: 100%;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }

  .svg {
    display: block;
    position: relative;
    width: 100%;
    height: ${rem('96px')};
    overflow: hidden;
  }

  .path {
    width: 100%;
    fill: var(--color-white);
    animation-name: ${waveAnimation};
    animation-duration: 20000ms;
    animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: initial;
    animation-play-state: initial;
    animation-delay: initial;
  }
`;

export default FooterWave;
