/**
 * Import Libraries
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Import Components
 */
import Branding from '../../general/branding';
import LargeNavigation from '../large-navigation';
import SocialNavigation from '../social-navigation';

const getScrollPosition = (el = window) => ({
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Page Header
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    // example how to bind object in React ES6
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    return window.addEventListener('scroll', debounce(this.handleScroll, 16));
  }

  componentWillUnmount() {
    return window.removeEventListener('scroll', debounce(this.handleScroll, 16));
  }

  /**
   * Handles the scrolling distance and the fixed-nav functionality
   *
   * @returns
   * @memberof Header
   */
  handleScroll() {
    const nav = document.querySelector('.utilities--above-the-fold');
    if (nav) {
      const ScrollPosition = getScrollPosition();
      if (ScrollPosition.y >= 64) {
        document.body.classList.add('fixed-nav');
      } else if (ScrollPosition.y < 64) {
        document.body.classList.remove('fixed-nav');
      }
    }

    return false;
  }

  render() {
    return (
      <TopBar id="page-header" role="banner">
        <Row key="header" className="l__row">
          <Branding />
          <LargeNavigation />
          <SocialNavigation />
        </Row>
      </TopBar>
    );
  }
}

/**
 *  Styling
 */
const TopBar = styled.header`
  background-color: ${props => props.theme.white};
  max-height: ${props => props.theme.navbarHeight};
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;

  @media ${props => props.theme.breakpointLarge} {
    background-color: transparent;
    margin-top: 24px;
    position: relative;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: ${props => props.theme.navbarHeight};
`;

export default Header;
