/**
 * Import Libraries
 */
import React, { Component } from 'react';
import { Link } from 'gatsby';

/**
 * Import Styles
 */
import styles from './styles.module.scss';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class BottomNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previousScrollPosition: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    const body = document.body || document.documentElement;

    this.setState({
      previousScrollPosition: window.pageYOffset,
    });

    if (body.classList.contains('project-details')) {
      document.addEventListener('scroll', debounce(this.handleScroll, 16));
    }
  }

  componentWillUnmount() {
    const body = document.body || document.documentElement;

    if (body.classList.contains('project-details')) {
      document.removeEventListener('scroll', debounce(this.handleScroll, 16));
    }
  }

  /**
   * Handles the scrolling distance and the fixed-nav functionality
   *
   * @returns
   * @memberof Header
   */
  handleScroll() {
    const body = document.body || document.documentElement;
    const bottomNavBar = document.getElementById('bottom-navigation-bar');

    if (body.classList.contains('project-details')) {
      if (bottomNavBar) {
        let currentScrollPosition = window.pageYOffset;
        if (this.previousScrollPosition > currentScrollPosition) {
          bottomNavBar.style.bottom = '0';
        } else {
          bottomNavBar.style.bottom = '-3rem';
        }
        this.previousScrollPosition = currentScrollPosition;
        return true;
      }
    }

    return false;
  }

  render() {
    return (
      <nav id="bottom-navigation-bar" className={styles.container}>
        <ul className={`l__row ${styles.wrapper}`}>
          <li className={styles.item} title="Go to Homepage">
            <Link
              className={styles.link}
              to="/"
              activeClassName={styles.active}
              aria-label="Click to go to the Homepage"
              tabIndex="0"
            >
              <figure className={styles.link__icon} tabIndex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Homepage Icon</title>
                  <path
                    className={styles.link__filled}
                    fill="#fff"
                    d="M23.87 10.83L12 0 .13 10.83a.4.4 0 0 0 0 .58.43.43 0 0 0 .59 0L2.48 9.8V24H9.1v-7.58a2.9 2.9 0 0 1 5.8 0V24h6.62V9.8l1.78 1.63a.46.46 0 0 0 .29.11.43.43 0 0 0 .3-.13.4.4 0 0 0-.02-.58z"
                  />
                  <path
                    className={styles.link__stroke}
                    fill="#fff"
                    d="M23.87 10.83L12 0 .13 10.83a.41.41 0 0 0 0 .58.43.43 0 0 0 .3.13.46.46 0 0 0 .29-.11L2.48 9.8V24H9.1v-7.58a2.9 2.9 0 0 1 5.8 0V24h6.62V9.8l1.78 1.63a.46.46 0 0 0 .29.11.43.43 0 0 0 .3-.13.4.4 0 0 0-.02-.58zm-3.35-1V23H15.9v-6.58a3.9 3.9 0 0 0-7.8 0V23H3.48V9.13L12 1.35l8.52 7.78z"
                  />
                </svg>
              </figure>

              <span className={styles.link__label} tabIndex="-1">
                Home
              </span>
            </Link>
          </li>

          <li className={styles.item} title="Go to my About page">
            <Link
              className={styles.link}
              to="/about"
              activeClassName={styles.active}
              aria-label="Click to go to the About page"
              tabIndex="0"
            >
              <figure className={styles.link__icon} tabIndex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>About Icon</title>
                  <g id="about--filled">
                    <path
                      className={styles.link__filled}
                      fill="#fff"
                      d="M10.1 3.64a2.66 2.66 0 0 0 1 .22 2.57 2.57 0 0 0 2.39-1.62l.14-.35L14 2a8.27 8.27 0 0 1 3.21 1.73A5.56 5.56 0 0 0 12.64 0 4 4 0 0 0 12 0a5.57 5.57 0 0 0-4 1.63A5.49 5.49 0 0 0 6.67 4a3.43 3.43 0 0 1 3.43-.36z"
                    />
                    <path
                      className={styles.link__filled}
                      fill="#fff"
                      d="M8 5.62h1.68a1.4 1.4 0 0 1 1.06.5h2.52a1.4 1.4 0 0 1 1.06-.5H16A1.38 1.38 0 0 1 17.38 7v.27a8.14 8.14 0 0 0 .18-2 7.12 7.12 0 0 0-3.41-2.36 3.39 3.39 0 0 1-3 1.79 3.26 3.26 0 0 1-1.38-.29 2.55 2.55 0 0 0-3 .6l-.31.39a.86.86 0 0 0 0 .16 8.12 8.12 0 0 0 .19 1.65V7A1.38 1.38 0 0 1 8 5.62z"
                    />
                    <rect
                      className={styles.link__filled}
                      width="2.93"
                      height="2.93"
                      x="13.69"
                      y="6.38"
                      fill="#fff"
                      rx=".63"
                      ry=".63"
                    />
                    <rect
                      className={styles.link__filled}
                      width="2.93"
                      height="2.93"
                      x="7.38"
                      y="6.38"
                      fill="#fff"
                      rx=".63"
                      ry=".63"
                    />
                    <path
                      className={styles.link__filled}
                      fill="#fff"
                      d="M14 12.33A5.06 5.06 0 0 0 16.34 10a1.27 1.27 0 0 1-.34.05h-1.68a1.38 1.38 0 0 1-1.38-1.38V7v-.12h-1.9V8.68a1.38 1.38 0 0 1-1.38 1.38H8a1.36 1.36 0 0 1-.29 0 5.08 5.08 0 0 0 2.36 2.31 1 1 0 0 1 .64.95v.27a1 1 0 0 1-1 1h-.1L12 17l2.39-2.4h-.09a1 1 0 0 1-1-1v-.28a1 1 0 0 1 .7-.99z"
                    />
                    <path
                      className={styles.link__filled}
                      fill="#fff"
                      d="M16.85 14.57h-1.24L12 18.18l-3.61-3.61H7.15a5 5 0 0 0-5 4.33l.15.21.11.14.29.37a11.24 11.24 0 0 0 1.12 1.17.46.46 0 0 0 .18.11l.36.31.12.1.36.29.13.09.21.15v-2.13H6v2.68l.33.18.23.12.39.19.19.08.5.21h.11c.43.16.86.29 1.31.41h.1l.56.12h.16l.5.07H11.27L12 24h1.57l.5-.07h.17l.55-.12h.1c.45-.12.88-.25 1.31-.41h.11l.5-.21.19-.29.39-.18.23-.12.33-.19H18v-2.7h.86v2.13l.21-.15.13-.09.36-.29.12-.1.32-.31a.46.46 0 0 0 .07-.07 12.38 12.38 0 0 0 1.12-1.17l.29-.37.11-.14.15-.21a5 5 0 0 0-4.89-4.37z"
                    />
                  </g>
                  <g id="about--stroke">
                    <path
                      className={styles.link__stroke}
                      fill="#fff"
                      d="M24 12a12 12 0 0 0-24 0 11.89 11.89 0 0 0 2 6.65l.09.12.22.3.09.13.3.37.08.11a12 12 0 0 0 1.53 1.52l.1.09.36.28.15.11.36.25.19.13.51.31.36.21.22.11.39.19.2.09.47.2.14.06a11.41 11.41 0 0 0 1.33.41h.05c.2.05.4.1.6.13h.17l.51.08H11.31L12 24H13.58l.51-.08h.17c.2 0 .4-.08.6-.13h.05a11.41 11.41 0 0 0 1.33-.41l.14-.06.47-.2.2-.09.39-.19.22-.11.36-.21.51-.31.19-.13.36-.25.15-.11.36-.28.1-.09a12 12 0 0 0 1.52-1.51.76.76 0 0 0 .08-.11l.3-.37.09-.13.22-.3.09-.12A11.89 11.89 0 0 0 24 12zM9.9 4.93a3.22 3.22 0 0 0 1.3.27A3.18 3.18 0 0 0 14 3.53a6.62 6.62 0 0 1 3.18 2.2c.12 2.44-1.32 5.81-3.36 6.58a1 1 0 0 0-.63.89v.25a.94.94 0 0 0 1 1h.08L12 16.63 9.77 14.4h.08a.94.94 0 0 0 1-1v-.2a.94.94 0 0 0-.6-.88c-1.92-.71-3.4-4-3.4-6.32v-.15l.29-.36a2.36 2.36 0 0 1 2.76-.56zM2.24 17.48A11.06 11.06 0 0 1 .8 12 11.23 11.23 0 0 1 8 1.54l-.23.21A6 6 0 0 0 6 6c0 2.65 1.68 6.24 3.92 7.07a.13.13 0 0 1 .08.13v.25a.15.15 0 0 1-.15.15H7.48a5.45 5.45 0 0 0-5.24 3.88zM21 18.64a.64.64 0 0 0-.1.13c-.09.11-.18.23-.28.34a12 12 0 0 1-1.05 1.09.23.23 0 0 1-.07.07l-.33.29-.11.09-.34.27-.12.08-.2.14v-2h-.8v2.49h-.05l-.3.17-.25.2-.36.18-.18.08-.47.19h-.1a10.74 10.74 0 0 1-1.22.38h-.09l-.52.11h-.16l-.47.07h-.18l-.47.05h-1.62l-.47-.05h-.18l-.44-.01h-.16l-.52-.11H9.3a10.74 10.74 0 0 1-1.22-.38h-.1l-.47-.19-.18-.08L7 22l-.22-.11-.3-.17V19.2H5.6v2l-.2-.2h-.12l-.34-.27-.11-.09-.33-.29-.07-.07a12 12 0 0 1-1-1.09c-.1-.11-.19-.23-.28-.34a.64.64 0 0 0-.1-.13 1.43 1.43 0 0 0-.14-.2 4.67 4.67 0 0 1 4.64-4h1.08L12 17.77l3.37-3.37h1.15a4.67 4.67 0 0 1 4.64 4 1.43 1.43 0 0 0-.16.24zm.74-1.16a5.45 5.45 0 0 0-5.24-3.88h-2.35a.15.15 0 0 1-.15-.15v-.25a.14.14 0 0 1 .11-.14c2.58-1 4.18-5 3.85-7.8a6 6 0 0 0-2-3.72A11.21 11.21 0 0 1 23.2 12a11.06 11.06 0 0 1-1.44 5.48z"
                    />
                  </g>
                </svg>
              </figure>
              <span className={styles.link__label} tabIndex="-1">
                About
              </span>
            </Link>
          </li>
          {/* <li className={styles.item} title="Go to my Blog page">
        <Link
          className={styles.link}
          to="/blog"
          activeClassName={styles.active}
          activeStyle={{
            color: 'rgba(0, 0, 255, 1)',
          }}
        >
          <figure className={styles.link__icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none">
                <circle cx="19.646" cy="11.335" r="1" fill="#000" />
                <circle cx="3.936" cy="11.335" r="1" fill="#000" />
                <circle cx="5.246" cy="12.644" r="1" fill="#000" />
                <circle cx="7.864" cy="12.644" r="1" fill="#000" />
                <circle cx="6.555" cy="13.953" r="1" fill="#000" />
                <circle cx="9.173" cy="13.953" r="1" fill="#000" />
                <circle cx="10.482" cy="15.262" r="1" fill="#000" />
                <circle cx="13.1" cy="15.262" r="1" fill="#000" />
                <circle cx="14.409" cy="13.953" r="1" fill="#000" />
                <circle cx="11.791" cy="16.571" r="1" fill="#000" />
                <circle cx="15.718" cy="12.644" r="1" fill="#000" />
                <circle cx="18.336" cy="12.644" r="1" fill="#000" />
                <circle cx="17.027" cy="13.953" r="1" fill="#000" />
                <path
                  fill="#5C5C5C"
                  d="M19.8802909,14.3109818 L23.9794909,11.9690182 L19.7659636,9.57643636 L23.9794909,7.16901818 L11.9899636,0.360436364 L0,7.16901818 L4.21352727,9.57643636 L0,11.9690182 L4.21352727,14.3764364 L0,16.7690182 L11.9899636,23.6190545 L23.9799273,16.7690182 L19.7664,14.3764364 L19.7973818,14.3585455 C19.8279273,14.3472 19.8532364,14.3288727 19.8802909,14.3109818 Z M11.9899636,1.36363636 L22.2165818,7.1712 L18.8840727,9.07549091 L18.8840727,9.07549091 L11.9904,13.0141091 L1.76334545,7.1712 L11.9899636,1.36363636 Z M4.85629091,10.2148364 C4.92698182,10.3601455 5.07316364,10.4622545 5.24552727,10.4622545 C5.36334545,10.4622545 5.46894545,10.4146909 5.54749091,10.3387636 L6.53454545,10.9025455 C6.30327273,10.9134545 6.11825455,11.1010909 6.11825455,11.3349818 C6.11825455,11.5758545 6.31374545,11.7713455 6.55461818,11.7713455 C6.79549091,11.7713455 6.99098182,11.5758545 6.99098182,11.3349818 C6.99098182,11.2594909 6.96698182,11.1922909 6.93338182,11.1303273 L11.4410182,13.7057455 C11.3904,13.7768727 11.3546182,13.8593455 11.3546182,13.9531636 C11.3546182,14.1940364 11.5501091,14.3895273 11.7909818,14.3895273 C12.0318545,14.3895273 12.2273455,14.1940364 12.2273455,13.9531636 C12.2273455,13.9309091 12.2181818,13.9121455 12.2146909,13.8907636 L16.6010182,11.3847273 C16.6267636,11.6011636 16.8039273,11.7709091 17.0273455,11.7709091 C17.2682182,11.7709091 17.4637091,11.5754182 17.4637091,11.3345455 C17.4637091,11.1927273 17.3917091,11.0722909 17.2865455,10.9928727 L18.2474182,10.4439273 C18.2770909,10.4504727 18.3050182,10.4618182 18.3364364,10.4618182 C18.5301818,10.4618182 18.6885818,10.3335273 18.7457455,10.1589818 L18.8853818,10.0791273 L22.2165818,11.9707636 L21.3512727,12.4651636 C21.2827636,12.3137455 21.1317818,12.2072727 20.9550545,12.2072727 C20.7141818,12.2072727 20.5186909,12.4027636 20.5186909,12.6436364 C20.5186909,12.7378909 20.5549091,12.8203636 20.6055273,12.8914909 L18.8840727,13.8750545 L18.8840727,13.8750545 L16.0965818,15.4677818 C16.1306182,15.4058182 16.1550545,15.3377455 16.1550545,15.2618182 C16.1550545,15.0209455 15.9595636,14.8254545 15.7186909,14.8254545 C15.4778182,14.8254545 15.2823273,15.0209455 15.2823273,15.2618182 C15.2823273,15.4961455 15.4682182,15.6837818 15.6999273,15.6942545 L14.7124364,16.2584727 C14.6338909,16.1825455 14.5278545,16.1345455 14.4096,16.1345455 C14.1687273,16.1345455 13.9732364,16.3300364 13.9732364,16.5709091 C13.9732364,16.6058182 13.9854545,16.6368 13.9933091,16.6695273 L11.9904,17.8136727 L9.58298182,16.4382545 C9.52625455,16.2632727 9.36741818,16.1345455 9.17323636,16.1345455 C9.14138182,16.1345455 9.11301818,16.1463273 9.08334545,16.1528727 L8.12290909,15.6043636 C8.22807273,15.5245091 8.30050909,15.4045091 8.30050909,15.2622545 C8.30050909,15.0213818 8.10501818,14.8258909 7.86414545,14.8258909 C7.64072727,14.8258909 7.46312727,14.9965091 7.43781818,15.2129455 L3.05061818,12.7069091 C3.05367273,12.6855273 3.06327273,12.6663273 3.06327273,12.6440727 C3.06327273,12.4032 2.86778182,12.2077091 2.62690909,12.2077091 C2.52261818,12.2077091 2.43098182,12.2491636 2.35592727,12.3102545 L1.76290909,11.9716364 L4.85629091,10.2148364 Z M22.2161455,16.7712 L11.9895273,22.6141091 L1.76334545,16.7712 L5.09410909,14.8795636 L11.9899636,18.8190545 L18.8853818,14.8795636 L22.2161455,16.7712 Z"
                />
              </g>
            </svg>
          </figure>
          <span className={styles.link__label}>Blog</span>
        </Link>
      </li> */}
          <li className={styles.item} title="Go to Contact page">
            <Link
              className={styles.link}
              to="/contact"
              activeClassName={styles.active}
              aria-label="Click to go to the Contacts page"
              tabIndex="0"
            >
              <figure className={styles.link__icon} tabIndex="-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>Contact Icon</title>
                  <path
                    className={styles.link__stroke}
                    fill="#fff"
                    d="M14.73 19.83l-5-7.12 12.82-8.2zM8.91 18.1l.55-4.42 1.82 2.6zM21.14 4.48l-12 7.68-7.35-2.41zm2.77-1.34a.43.43 0 0 0-.36-.14h-.09L.3 9.33a.38.38 0 0 0-.3.37.4.4 0 0 0 .28.39l8.47 2.79L8 19a.41.41 0 0 0 .2.4.46.46 0 0 0 .2 0 .41.41 0 0 0 .24-.08l3.11-2.38 2.72 3.89a.37.37 0 0 0 .32.17.39.39 0 0 0 .33-.22L24 3.58a.39.39 0 0 0-.09-.44z"
                  />
                  <path
                    className={styles.link__filled}
                    fill="#fff"
                    d="M14.94 20.86l-5.75-8.22L24 3.17l-9.06 17.69zM8.21 18.86l.64-5.1 2.1 3.01-2.74 2.09zM22.33 3.14L8.48 12.01 0 9.22l22.33-6.08z"
                  />
                </svg>
              </figure>
              <span className={styles.link__label} tabIndex="-1">
                Contact
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default BottomNavigation;
