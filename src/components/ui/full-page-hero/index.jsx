/**
 * Libraries
 */
import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import Typing from 'react-typing-animation';
// import ExternalLink from '../../navigation/external-link';
import { responsiveTypography } from '../../../helpers/helpers';

import HelloAnimation from '../../hello/index';
import ScrollDownArrow from './scroll-down-arrow';

/**
 * Full Page Hero
 */
class HomePageHero extends PureComponent {
  render() {
    return (
      <Hero className="l__row utilities--above-the-fold">
        <Wrapper>
          <HelloAnimation />
          <Text>
            <Typing speed={50}>
              <Subtitle>I'm João, a web developer and designer.</Subtitle>
            </Typing>
          </Text>
          <ScrollDownArrow />

          {/* <Paragraph className="fadeInUp">
            I'm also the author &amp; host of a&nbsp;
            <ExternalLink to="https://coffeeonmykeyboard.com">podcast and monthly newsletter</ExternalLink>.
          </Paragraph> */}
        </Wrapper>
      </Hero>
    );
  }
}

export default HomePageHero;

/**
 * Styles
 */
const Hero = styled.article`
  background-color: ${props => props.theme.white};
  height: 80vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media ${props => props.theme.breakpointMedium} {
    min-height: ${rem('560px')};
    max-height: 64vh;
  }

  @media ${props => props.theme.breakpointLarge} {
    max-height: ${rem('560px')};
  }

  @media ${props => props.theme.breakpointHd} {
    max-height: ${rem('640px')};
  }
`;

const Wrapper = styled.div`
  align-items: center;
  will-change: transform;
  width: 100%;
  padding-left: ${rem('8px')};
  padding-right: ${rem('8px')};
`;

const Text = styled.div`
  width: 100%;
  height: auto;

  > div {
    min-height: ${rem('72px')};
    @media all and (min-width: ${rem('400px')}) {
      min-height: ${rem('40px')};
      height: auto;
    }
  }
`;

const Subtitle = styled.h2`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: 300;
  color: ${props => props.theme.gray9};
  letter-spacing: 0;
  margin-bottom: 1.5rem;
  font-size: ${rem('32px')};
  ${responsiveTypography({
    minFont: 19,
    maxFont: 32,
    minWidth: 320,
    maxWidth: 1440,
  })};
`;

/*
const fadeInUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(2rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;


const Paragraph = styled.p`
  font-family: ${props => props.theme.bodyFontFamily};
  font-weight: 300;
  color: ${props => props.theme.gray6};
  letter-spacing: 0;
  animation-name: ${fadeInUp};
  animation-delay: 1000ms;
  animation-timing-function: ${props => props.theme.easeOutExpo};
  animation-duration: 2000ms;
  animation-direction: initial;
  animation-fill-mode: forwards;

  a {
    color: ${props => props.theme.gray9};
    border-bottom: 1px dotted ${props => props.theme.gray9};
  }

  &:nth-child(1) {
    animation-delay: 1000ms;
  }

  @media ${props => props.theme.breakpointLarge} {
    letter-spacing: 0;
  }
  font-size: ${rem('20px')};

  ${responsiveTypography({
    minFont: 17,
    maxFont: 20,
  })};
`;

const IsTyping = keyframes`
  from {
    opacity: 0;
  }
`;

const Cursor = styled.span`
  animation: ${IsTyping} 1s infinite;
`;

*/
