import Helmet from "react-helmet";

const onRenderBody = ({ setHtmlAttributes, setBodyAttributes }) => {
	const helmet = Helmet.renderStatic();
	setHtmlAttributes(helmet.htmlAttributes.toComponent());
	setBodyAttributes(helmet.bodyAttributes.toComponent());
};

export default onRenderBody;
