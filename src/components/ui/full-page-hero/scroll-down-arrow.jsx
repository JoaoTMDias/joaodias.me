// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';

// Components
// import Component from '../components/componentName';

/** ********
 ** Component: ScrollDownArrow
 ** @type: functional stateless component
 ** @description:
 ********* */
const ScrollDownArrow = () => (
  <Anchor title="Scroll down to content" href="#main-content">
    <Icon id="circle-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <title>Scroll down to content</title>
      <circle cx="16" cy="16" r="15" fill="none" stroke="#e0e0e6" strokeWidth="1" />
      <g id="circle-arrow">
        <rect x="17" y="15" width="2" height="2" fill="#231b69" />
        <rect x="19" y="13" width="2" height="2" fill="#231b69" />
        <rect x="15" y="17" width="2" height="2" fill="#231b69" />
        <rect x="13" y="15" width="2" height="2" fill="#231b69" />
        <rect x="11" y="13" width="2" height="2" fill="#231b69" />
      </g>
    </Icon>
  </Anchor>
);

// Styled Components
// Animation
const circleStroke = keyframes`
  0% {
    stroke-dasharray: 128;
    stroke-dashoffset: 240;
    stroke-opacity: 0;
    fill-opacity: 0;
  }
  50% {
    stroke-opacity: 1;
    fill-opacity: 0;
  }
  100% {
    fill: #ffffff;
    stroke-dasharray: 120;
    stroke-dashoffset: 0;
    fill-opacity: 1;
  }
`;

const circleArrow = keyframes`
  0% {
    transform: translateY(-4px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(${rem('-24px')});
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Anchor = styled.a`
  width: auto;
  margin: 0 auto;
  justify-content: flex-start;
  margin-top: ${rem('24px')};
  transition: transform 125ms ${props => props.theme.easeOutCirc};
  animation-name: ${fadeInDown};
  animation-duration: 1000ms;
  animation-delay: 1000ms;
  animation-fill-mode: forwards;
  animation-timing-function: ${props => props.theme.easeOutBack};
  &:hover {
    cursor: pointer;
    #circle-down {
      transform: scale(1.1);
    }
  }

  @media ${props => props.theme.breakpointLarge} {
    display: flex;
  }
`;

const Icon = styled.svg`
  text-align: left;
  float: left;
  width: ${rem('32px')};
  height: ${rem('32px')};
  transition: transform 125ms ${props => props.theme.easeOutCirc};
  @media ${props => props.theme.breakpointMedium} {
    width: ${rem('40px')};
    height: ${rem('40px')};
  }
  @media ${props => props.theme.breakpointLarge} {
    width: ${rem('44px')};
    height: ${rem('44px')};
  }
  circle {
    stroke-dasharray: 128;
    stroke-dashoffset: 240;
    stroke: #e0e0e6;
    animation-name: ${circleStroke};
    animation-duration: 2500ms;
    animation-timing-function: $ease-in-out-circ;
    animation-fill-mode: forwards;
    animation-direction: normal;
  }
  g {
    animation-name: ${circleArrow};
    animation-delay: 1500ms;
    animation-duration: 1000ms;
    animation-timing-function: $ease-out-back;
    animation-fill-mode: forwards;
    animation-direction: normal;
    opacity: 0;
  }
`;

ScrollDownArrow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default ScrollDownArrow;
