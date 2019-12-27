// Libraries
import * as React from "react";
import { IContentSpinnerProps } from "./types";

import { ContentSpinnerWrapper } from "./styles";

/**
 * @description UX: Loading spinner used for content placeholder
 * @author  João Dias
 * @date  14/December/2018 at 10:37
 * @extends {React.SFC}
 */
export const ContentSpinner: React.FunctionComponent<IContentSpinnerProps> = props => {
	const { size, ...spinnerProps } = props;
	return (
		<ContentSpinnerWrapper tabIndex={-1} {...spinnerProps}>
			<svg className="spinner__container" viewBox="0 0 50 50" width={`${size}`} height={`${size}`}>
				<circle className="spinner__icon" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
			</svg>
		</ContentSpinnerWrapper>
	);
};

ContentSpinner.defaultProps = {
	color: "hsl(0, 0%, 60%)",
	duration: 3000,
	center: true,
	size: 24,
	isTemporary: false,
};

export default ContentSpinner;
