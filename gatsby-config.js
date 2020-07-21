// ///////////////////
// CONFIGURATIONS
// ///////////////////
const manifestOptions = {
	name: "João Dias",
	short_name: "Joao Dias",
	description: "Portfolio of João Dias",
	start_url: "/",
	background_color: "#ffffff",
	theme_color: "#e81b1f",
	display: "standalone",
	icons: [
		{
			src: "/android-chrome-48x48.png",
			sizes: "48x48",
			type: "image/png",
		},
		{
			src: "/android-chrome-72x72.png",
			sizes: "72x72",
			type: "image/png",
		},
		{
			src: "/android-chrome-96x96.png",
			sizes: "96x96",
			type: "image/png",
		},
		{
			src: "/android-chrome-144x144.png",
			sizes: "144x144",
			type: "image/png",
		},
		{
			src: "/android-chrome-192x192.png",
			sizes: "192x192",
			type: "image/png",
		},
		{
			src: "android-chrome-512x512.png",
			sizes: "512x512",
			type: "image/png",
		},
	],
};

const offlineOptions = {
	cacheId: "joaotmdias-cache",
};

const sitemapOptions = {
	output: "/sitemap.xml",
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
	spaceId: "f8k9954psrym",
	accessToken: "1cf769ed8da16b00656e43a1370ca4ee51a727d84b7981eb0dad832cf711d9fd",
};

module.exports = {
	siteMetadata: {
		title: "João Dias",
		author: "João Dias",
		url: "https://joaodias.me",
		siteUrl: "https://joaodias.me",
		description: "I am João, a Frontend developer and Visual Designer",
	},

	plugins: [
		// Typescript
		"gatsby-plugin-typescript",

		// React Helmet
		"gatsby-plugin-react-helmet",

		// Content Sources
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-contentful",
			options: contentfulOptions,
		},
		{
			resolve: "gatsby-plugin-sitemap",
			options: sitemapOptions,
		},
		"gatsby-plugin-netlify",

		// Images
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",

		// Styling
		{
			resolve: "gatsby-plugin-styled-components",
			options: {
				displayName: true,
			},
		},
		"gatsby-plugin-sass",

		// PWA
		{
			resolve: "gatsby-plugin-manifest",
			options: manifestOptions,
		},
		{
			resolve: "gatsby-plugin-offline",
			options: offlineOptions,
		},
	],
};
