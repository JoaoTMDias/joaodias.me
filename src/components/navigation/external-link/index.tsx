import React from "react";
import { IExternalLinkProps } from "./types";

export const defaultProps = {
	target: "_blank",
	rel: "noopener noreferrer",
};

export const ExternalLink: React.FunctionComponent<IExternalLinkProps> = ({ to, children, ...props }) => (
	<a href={to} data-testid="component-external-link" {...props}>
		{children}
	</a>
);

ExternalLink.defaultProps = defaultProps;

export default ExternalLink;
