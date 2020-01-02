// Libraries
import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Header } from "./navigation/header/index";

// Components
import { Footer } from "./navigation/footer";
import { BottomNavigation } from "./navigation/bottom-navigation";
import SkipLink from "./navigation/skip-link/index";

// Styling
import "./layout.scss";

// Layout Component
export const Layout = ({ children }) => {
	const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

	if (isBrowser) {
		const isInWebAppiOS = window.navigator.standalone == true;
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
					<Header key="page-header" />
					<BottomNavigation key="bottom-navigation" />
					<main aria-label="Main Page Content Wrapper. Press Tab to navigate" key="page-content">
						{children}
					</main>
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
