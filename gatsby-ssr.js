const React = require("react");
const { Helmet } = require("react-helmet")
const { Layout } = require("./src/components/layout");

exports.onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
  pluginOptions
) => {
	const helmet = Helmet.renderStatic();
	setHtmlAttributes(helmet.htmlAttributes.toComponent());
	setBodyAttributes(helmet.bodyAttributes.toComponent());
}

exports.wrapPageElement = ({ element, props }) => {
	return <Layout {...props}>{element}</Layout>;
};
