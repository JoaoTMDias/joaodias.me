/**
 * Import Libraries
 */
import React from 'react';
import Helmet from 'react-helmet';

/**
 * Site Configurations
 */
import { siteMetadata as config } from '../gatsby-config';

/**
 * Production Configurations
 */
const isProduction = process.env.NODE_ENV === 'production';

const HTML = props => {
  const helmet = Helmet.rewind();
  const openGraphUrl = isProduction ? `${config.url}/share.png` : '/share.png';

  const { headComponents, body, postBodyComponents } = props;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        {/* Meta */}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}

        {headComponents}

        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={openGraphUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@joaotmdias" />
        <meta name="twitter:creator" content="@joaotmdias" />
        <meta property="twitter:image" content={openGraphUrl} />
      </head>
      <body>
        <a class="skip-main" href="#main-content" aria-label="Skip to Main Content" tabIndex="0">
          Skip to Main Content
        </a>
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} tabIndex="-1" />
        {postBodyComponents}
      </body>
    </html>
  );
};

export default HTML;
