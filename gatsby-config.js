const manifestOptions = {
  name: 'João Dias',
  short_name: 'João Dias',
  description: 'Portfolio of João Dias',
  start_url: 'https://www.joaodias.me/',
  background_color: '#ffffff',
  theme_color: '#e81b1f',
  display: 'standalone',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

const analyticsOptions = {
  trackingId: 'UA-54851814-1',
  head: false,
  anonymize: true,
};

const offlineOptions = {
  cacheId: 'joaodias-cache',
};

const sitemapOptions = {
  output: '/sitemap.xml',
  query: `
      {
          site {
              siteMetadata {
                  siteUrl
              }
          }

          allSitePage {
              edges {
                  node {
                      path
                  }
              }
          }
      }`,
};

const contentfulOptions = {
  spaceId: 'f8k9954psrym',
  accessToken: '1cf769ed8da16b00656e43a1370ca4ee51a727d84b7981eb0dad832cf711d9fd',
};

module.exports = {
  siteMetadata: {
    title: 'João Dias',
    author: 'João Dias',
    url: 'https://joaodias.me',
    siteUrl: 'https://joaodias.me',
    description: 'I am João, a Visual designer and Web developer.',
  },
  plugins: [
    // Typescript
    'gatsby-plugin-typescript',

    // React Helmet
    'gatsby-plugin-react-helmet',

    // Content Sources
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulOptions,
    },

    // Site Configs
    {
      resolve: 'gatsby-plugin-sitemap',
      options: sitemapOptions,
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: offlineOptions,
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions,
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: analyticsOptions,
    },
    'gatsby-plugin-netlify',

    // Images
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',

    // Styling
    'gatsby-plugin-sass',
    'gatsby-plugin-styled-components',
  ],
};
