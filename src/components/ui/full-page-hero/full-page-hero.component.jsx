/**
 * Libraries
 */
import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { rem } from 'polished';
import { Spring } from 'react-spring';
import { responsiveTypography } from '../../../helpers/helpers';

import { HelloAnimation } from '../../index';

const from = {
  opacity: 0,
  transform: `translate3d(0, 1.5rem, 0)`,
};

const to = {
  opacity: 1,
  transform: `translate3d(0,0,0)`,
};

/**
 * Full Page Hero
 */
class HomePageHero extends PureComponent {
  render() {
    return (
      <Hero className="l__row utilities--above-the-fold">
        <Wrapper>
          <HelloAnimation />
          <Text aria-label="Page subtitle: I'm João, a frontend developer and designer.">
            <Spring from={from} to={to}>
              {props => {
                return <Subtitle style={props}>I'm João, a frontend developer and designer.</Subtitle>;
              }}
            </Spring>
          </Text>
        </Wrapper>
      </Hero>
    );
  }
}

/**
 * Styles
 */
const Hero = styled.article`
  background-color: transparent;
  min-height: ${rem('480px')};
  max-height: 50vh;
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
  font-family: var(--body-font-family);
  font-weight: 300;
  color: var(--color-gray9);
  letter-spacing: 0;
  margin-bottom: 1.5rem;
  font-size: ${rem('32px')};
  font-size: ${responsiveTypography({
    minFont: 19,
    maxFont: 32,
    minWidth: 320,
    maxWidth: 1440,
  })};
`;

export default HomePageHero;
