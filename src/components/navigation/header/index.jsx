// Libraries
import React, { Component } from 'react';

// Components
import HeaderPageTitle from './header-page-title';
import BackNavigation from './back-navigation';
import { Branding } from '../../index';
import LargeNavigation from '../large-navigation';
import SocialNavigation from '../social-navigation';

// Styles
import styles from './header.module.scss';

// Utility functions
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
      <header id="page-header" className={styles.header}>
        <div key="header" className={`l__row ${styles.header__row}`}>
          <Branding />
          <BackNavigation />
          <HeaderPageTitle />
          <LargeNavigation />
          <SocialNavigation />
        </div>
      </header>
    );
  }
}

export default Header;
