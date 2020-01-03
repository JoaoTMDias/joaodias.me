import Helmet from "react-helmet";
import React from "react";

const onRenderBody = ({ setHeadComponents, setHtmlAttributes, setBodyAttributes }) => {
	const helmet = Helmet.renderStatic();
	setHtmlAttributes(helmet.htmlAttributes.toComponent());
	setBodyAttributes(helmet.bodyAttributes.toComponent());
	setHeadComponents([
		helmet.title.toComponent(),
		helmet.link.toComponent(),
		helmet.meta.toComponent(),
		helmet.noscript.toComponent(),
		helmet.script.toComponent(),
		helmet.style.toComponent(),
		<link rel="dns-prefetch" key="dns-prefetch-contentful-images" href="https://images.ctfassets.net" />,
	]);
};

export default onRenderBody;
