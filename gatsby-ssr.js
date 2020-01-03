import React from "react";
import Helmet from "react-helmet";
import { Layout } from "./src/components/layout.jsx";

export const onRenderBody = ({ setHtmlAttributes, setBodyAttributes }) => {
	const helmet = Helmet.renderStatic();
	setHtmlAttributes(helmet.htmlAttributes.toComponent());
	setBodyAttributes(helmet.bodyAttributes.toComponent());
};

export const wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>;
};

export default onRenderBody;
