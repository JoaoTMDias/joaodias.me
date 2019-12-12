const Promise = require("bluebird");
const path = require("path");
//const Critters = require('critters-webpack-plugin');

/////////////////////
// CREATE PAGES
/////////////////////
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
		const projectPage = path.resolve("./src/templates/project-page.jsx");
		resolve(
			graphql(`
				{
					allContentfulPortfolio {
						edges {
							node {
								id
								title
								slug
							}
						}
					}
				}
			`).then(result => {
				if (result.errors) {
					console.log(result.errors);
					reject(result.errors);
				}

				const posts = result.data.allContentfulPortfolio.edges;
				posts.forEach((post, index) => {
					createPage({
						path: `/work/${post.node.slug}/`,
						component: projectPage,
						context: {
							slug: post.node.slug,
						},
					});
				});
			}),
		);
	});
};

/////////////////////
// WEBPACK CONFIGURATION
/////////////////////
// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     plugins: [
//       new Critters({
//         keyframes: 'critical'
//       })
//     ],
//   });
// }
