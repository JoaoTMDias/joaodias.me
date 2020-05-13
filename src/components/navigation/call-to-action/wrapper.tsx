/**
 * Import Libraries
 */
import React from "react";
import { Wrapper } from "./index.styles";

interface ICallToActionWrapperProps {
	children: React.ReactNode;
}

export const CallToActionWrapper: React.FunctionComponent<ICallToActionWrapperProps> = ({ children }) => {
	return (
		<Wrapper className="layout__container layout__section">
			<h2 className="sr-only">Related links</h2>
			<div className="layout__row">{children}</div>
		</Wrapper>
	);
};

export default CallToActionWrapper;
