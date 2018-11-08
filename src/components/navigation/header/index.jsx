/**
 * Import Libraries
 */
import React, { Component } from 'react';
import styled from 'styled-components';

/**
 * Import Components
 */
import HeaderPageTitle from './header-page-title';
import BackNavigation from './back-navigation';
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
class Header extends Component {
  constructor(props) {
    super(props);
    // example how to bind object in React ES6
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', debounce(this.handleScroll, 16));
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', debounce(this.handleScroll, 16));
  }

  /**
   * Handles the scrolling distance and the fixed-nav functionality
   *
   * @returns
   * @memberof Header
   */
  handleScroll() {
    const nav = document.querySelector('.utilities--above-the-fold');
    const body = document.body || document.documentElement;
    if (nav) {
      const ScrollPosition = getScrollPosition();
      if (ScrollPosition.y >= 64) {
        body.classList.add('fixed-nav');
      } else if (ScrollPosition.y < 64) {
        body.classList.remove('fixed-nav');
      }
    }

    return false;
  }

  render() {
    return (
      <TopBar id="page-header">
        <Row key="header" className="l__row">
          <Branding />
          <BackNavigation />
          <HeaderPageTitle />
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
  background-color: var(--color-white);
  max-height: var(--navbar-height);
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
  max-height: var(--navbar-height);
`;

export default Header;
