// Libraries
import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Header } from "./navigation/header/index";
import { BottomNavigation } from "./navigation/bottom-navigation";
import SkipLink from "./navigation/skip-link/index";

// Styling
import "./layout.scss";

// Components
const Footer = loadable(/* webpackChunkName: "footer" */ () => pMinDelay(import("./navigation/footer"), 200));

// Layout Component
export const Layout = ({ children }) => {
	const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

	if (isBrowser) {
		const isInWebAppiOS = window.navigator.standalone === true;
		const isInWebAppChrome = window.matchMedia("(display-mode: standalone)").matches;
		const body = document.body || document.documentElement;

		if (isInWebAppiOS || isInWebAppChrome) {
			body.setAttribute("data-fullscreen", "true");
		}
	}

	return (
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
			render={() => (
				<>
					<SkipLink />
					<Header />
					<BottomNavigation />
					<main>{children}</main>
					<Footer />
				</>
			)}
		/>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
