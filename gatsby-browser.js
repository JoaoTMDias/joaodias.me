import { Logger } from "./src/helpers/logger.helper";

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
/**
 * @description When the bundle is downloaded, imports
 * a IntersectionObserver polyfill.
 * @date 2019-01-15
 */
export const onClientEntry = async () => {
	if (typeof IntersectionObserver === `undefined`) {
		await import(`intersection-observer`);
	}
};

/**
 * @description Promise-based window dialog that returns a resolve or a rejection.
 * @date 2019-01-15
 * @param {*} msg
 */
const confirmDialog = msg => {
	return new Promise(function(resolve, reject) {
		let confirmed = window.confirm(msg);

		return confirmed ? resolve(true) : reject(false);
	});
};

export const onServiceWorkerUpdateFound = () => {
	Logger({
		type: `info`,
		message: `A New Update has been found!`,
		showOnProduction: true,
	});
};

/**
 * @description When the service worker detects changes,
 * prompts the user to reload the window and use the latest version.
 * @date 2019-01-15
 */
export const onServiceWorkerUpdateReady = () => {
	confirmDialog(`I've just made a few adjustments.` + `Reload to display the latest version?`)
		.then(() => window.location.reload())
		.catch(err =>
			Logger({
				type: `warning`,
				message: `Service Worker will keep the current version.`,
				showOnProduction: true,
			}),
		);
};
