// Libraries
import * as React from "react";
import Helmet from "react-helmet";
import { config } from "../index";

// Component Props
interface IMetaProps {
	title: string;
	description?: string;
	location?: any;
	noIndex?: any;
}

/**
 * @description Meta Configurations
 * @author  João Dias
 * @date  01/December/2018 at 16:57
 * @extends {React.SFC}
 */
export const Meta: React.FunctionComponent<IMetaProps> = props => {
	const { title, description, location, noIndex } = props;
	const mainTitle = `${config.title} - Designer and Developer`;
	const metaTitle: string = title ? `${title} | ${mainTitle}` : mainTitle;
	const metaDescription: string = description || config.description;
	const absoluteUrl = `${config.url}${location.pathname}`;

	const meta = [
		{ name: "description", content: metaDescription },
		{ name: "og:title", content: metaTitle },
		{ name: "og:description", content: metaDescription },
		{ property: "og:url", content: absoluteUrl },
		{ name: "twitter:title", content: metaTitle },
		{ name: "twitter:description", content: metaDescription },
		{ property: "twitter:url", content: absoluteUrl },
	];

	if (noIndex) {
		meta.push({ name: "robots", content: "noindex" });
	}

	return <Helmet title={metaTitle} meta={meta} />;
};

export default Meta;
