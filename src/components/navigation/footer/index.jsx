/**
 * Import Libraries
 */
import React from "react";
import styled from "styled-components";
import { rem } from "polished";

/**
 * Import Components
 */
import FooterContent from "./footer-content";
import { above } from "../../../helpers/media-queries.helper";

export const Footer = () => (
	<Wrapper className="layout__container layout__section">
		<FooterContent />
	</Wrapper>
);

/**
 * Styling
 */
const Wrapper = styled.footer`
	align-items: center;
	background-color: var(--body-background);
	bottom: 0;
	flex-direction: column;
	margin-top: ${rem("32px")};
	margin: 0 auto;
	padding-bottom: 0;
	padding-top: ${rem("96px")};
	position: relative;
	width: 100%;

	${above.medium`
      flex-direction: row;
  `};
`;

export default Footer;
