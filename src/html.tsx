/* eslint-disable react/no-danger */
// Libraries
import * as React from "react";
import Helmet, { HelmetData } from "react-helmet";

// Favicons
import favicon from "../static/favicon.ico";
import favicon16 from "../static/favicon-16x16.png";
import favicon32 from "../static/favicon-32x32.png";
import favicon194 from "../static/favicon-194x194.png";
import maskIcon from "../static/safari-pinned-tab.svg";
import appleTouchIcon from "../static/apple-touch-icon.png";

// Launch Splash Screens
import appleiPhone5 from "../static/splash-screens/apple-iphone5_splash.png";
import appleiPhone6 from "../static/splash-screens/apple-iphone6_splash.png";
import appleiPhonePlus from "../static/splash-screens/apple-iphoneplus_splash.png";
import appleiPhoneX from "../static/splash-screens/apple-iphonex_splash.png";
import appleiPhoneXR from "../static/splash-screens/apple-iphone-xr_splash.png";
import appleiPhoneXSMax from "../static/splash-screens/apple-iphone-xsmax_splash.png";
import appleiPad from "../static/splash-screens/apple-ipad_splash.png";
import appleIpadPro1 from "../static/splash-screens/apple-ipad-pro1_splash.png";
import appleIpadPro3 from "../static/splash-screens/apple-ipad-pro3_splash.png";
import appleIpadPro2 from "../static/splash-screens/apple-ipad-pro2_splash.png";

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
		<html
			lang="en"
			prefix="http://ogp.me/ns#"
			i18n-values="dir:textdirection"
			itemType="http://schema.org/WebPage"
			dir="ltr"
		>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />

				{/* Meta */}
				<link rel="preload" href="/fonts/jd-sans-light.woff2" as="font" crossOrigin="true" />
				<link rel="preconnect dns-prefetch" href="https://images.ctfassets.net" />

				<meta name="description" content="João Dias" />
				<meta
					name="viewport"
					content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover"
				/>
				<meta name="HandheldFriendly" content="true" />
				<meta name="MobileOptimized" content="375" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-TileColor" content="#e81b1f" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />

				<link rel="apple-touch-icon" type="image/png" sizes="180x180" href={appleTouchIcon} />
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
					href={appleiPhone5}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
					href={appleiPhone6}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
					href={appleiPhonePlus}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
					href={appleiPhoneX}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
					href={appleiPhoneXR}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
					href={appleiPhoneXSMax}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
					href={appleiPad}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
					href={appleIpadPro1}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
					href={appleIpadPro2}
				/>
				<link
					rel="apple-touch-startup-image"
					media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
					href={appleIpadPro3}
				/>
				<link rel="shortcut icon" type="image/png" href={favicon} />
				<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
				<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
				<link rel="icon" type="image/png" sizes="194x194" href={favicon194} />
				<link rel="mask-icon" href={maskIcon} color="#e81b1f" />

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
				<noscript id="no-javascript" className="no-javascript">
					<h1 className="no-javascript__title">
						I need you to activate Javascript in order to see my website
						<span role="img" aria-label="A nerdy-looking emoji">
							🤓
						</span>
						.
					</h1>
				</noscript>
				<div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
				{postBodyComponents}
			</body>
		</html>
	);
};

export default HTML;
