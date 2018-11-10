/**
 * Import Libraries
 */
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { rem } from 'polished';

/**
 * Import Components
 */
import FooterWave from './wave/index';
import FooterContent from './content/index';

const Footer = () => (
  <Wrapper className="l__container l__section">
    <FooterContent />
  </Wrapper>
);

/**
 * Styling
 */
const Wrapper = styled.footer`
  width: 100%;
  margin: 0 auto;
  bottom: 0;
  align-items: center;
  position: relative;
  background-color: transparent;
  margin-top: ${rem('32px')};
  padding-top: ${rem('96px')};

  padding-bottom: 0;
  flex-direction: column;

  @media ${props => props.theme.breakpointMedium} {
    flex-direction: row;
  }
`;

export default Footer;
