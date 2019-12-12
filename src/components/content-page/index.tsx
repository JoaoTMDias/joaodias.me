import * as React from "react";

export const IApp: React.FunctionComponent = ({ children, ...rest }) => {
	React.useEffect(() => {
		const skipButton: HTMLElement | null = document.querySelector(".skip-main");
		const mainContent: HTMLElement | null = document.querySelector("#main-content");

		if (skipButton && mainContent) {
			skipButton.blur();
			mainContent.focus();
		}
	});

	return (
		<section id="content-page" {...rest}>
			{children}
		</section>
	);
};

export default IApp;
