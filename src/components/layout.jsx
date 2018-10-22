// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

// Components
import Header from './navigation/header';
import BottomNavigation from './navigation/bottom-navigation';

// Styling
import './layout.scss';

// Favicons
import favicon from '../../static/favicon.ico';
import favicon16 from '../../static/favicon-16x16.png';
import favicon32 from '../../static/favicon-32x32.png';
import favicon194 from '../../static/favicon-194x194.png';
import maskIcon from '../../static/safari-pinned-tab.svg';
import appleTouchIcon from '../../static/apple-touch-icon.png';

const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../assets/styles/global/' +
  '_settings.scss');

// Layout Component
const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <div id="page-content" tabIndex="-1">
            <Helmet
              htmlAttributes={{
                lang: 'en',
                prefix: 'http://ogp.me/ns#',
                'i18n-values': 'dir:textdirection',
                itemscope: undefined,
                itemtype: 'http://schema.org/WebPage',
                dir: 'ltr',
              }}
              title="joaodias.me - Welcome"
              meta={[
                { charset: 'utf-8' },
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
                {
                  name: 'viewport',
                  content:
                    'width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover',
                },
                { name: 'HandheldFriendly', content: 'true' },
                { name: 'MobileOptimized', content: '375' },
                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'msapplication-TileColor', content: '#f64f52' },
              ]}
              link={[
                {
                  rel: 'apple-touch-icon',
                  type: 'image/png',
                  sizes: '180x180',
                  href: `${appleTouchIcon}`,
                },
                {
                  rel: 'shortcut icon',
                  type: 'image/png',
                  href: `${favicon}`,
                },
                {
                  rel: 'icon',
                  type: 'image/png',
                  sizes: '16x16',
                  href: `${favicon16}`,
                },
                {
                  rel: 'icon',
                  type: 'image/png',
                  sizes: '32x32',
                  href: `${favicon32}`,
                },
                {
                  rel: 'icon',
                  type: 'image/png',
                  sizes: '194x194',
                  href: `${favicon194}`,
                },
                {
                  rel: 'mask-icon',
                  href: `${maskIcon}`,
                  color: '#f64f52',
                },
              ]}
            />

            <Header key="page-header" />
            <main key="page-content">{children}</main>

            <BottomNavigation key="bottom-navigation" />
          </div>
        </ThemeProvider>
      </React.Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
