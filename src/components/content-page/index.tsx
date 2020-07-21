import * as React from "react";

export const ContentPage: React.FunctionComponent = ({ children, ...rest }) => {
	return (
		<section id="content-page" {...rest}>
			{children}
		</section>
	);
};

export default ContentPage;
