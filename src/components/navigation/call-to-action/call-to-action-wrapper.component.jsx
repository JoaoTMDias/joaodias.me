/**
 * Import Libraries
 */
import React from "react";
import styled from "styled-components";
import { above } from "../../../helpers/media-queries.helper";

export const CallToActionWrapper = ({ children }) => {
	return (
		<Wrapper className="layout__container layout__section">
			<h2 className="sr-only">Related links</h2>
			<div className="layout__row">{children}</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	flex-direction: row;

	.layout__row {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: var(--global-margin);

		${above.medium`
      grid-template-columns: repeat(2, 1fr);
      grid-gap: calc(var(--global-margin) * 2)
    `};
	}
`;

export default CallToActionWrapper;
