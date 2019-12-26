/* eslint-disable react/no-danger */
// Libraries
import * as React from "react";
import Helmet, { HelmetData } from "react-helmet";

// Configurations
import { config } from "./components/index";

// Component Props
interface IHTMLProps {
	headComponents: any;
	body: any;
	postBodyComponents: any;
}

const isProduction: boolean = process.env.NODE_ENV === "production";

/**
 * @description HTML Starter File
 * @author  João Dias
 * @date  01/December/2018 at 16:19
 * @extends {React.FunctionComponent}
 */
const HTML: React.FunctionComponent<IHTMLProps> = props => {
	const helmet: HelmetData = Helmet.rewind();
	const openGraphUrl: string = isProduction ? `${config.url}/share.png` : "/share.png";
	const { headComponents, body, postBodyComponents } = props;

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />

				{/* Meta */}
				<link rel="preconnect dns-prefetch" href="https://stats.g.doubleclick.net" />
				<link rel="preconnect dns-prefetch" href="https://images.ctfassets.net" />
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
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
				{postBodyComponents}
			</body>
		</html>
	);
};

export default HTML;
