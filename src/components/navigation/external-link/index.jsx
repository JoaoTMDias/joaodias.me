import React from "react";

const ExternalLink = ({ to, children, ...props }) => (
	<a {...props} href={to} target="_blank" rel="noopener noreferrer">
		{children}
	</a>
);

export default ExternalLink;
