// Libraries
import { rem } from "polished";
import * as React from "react";
import styled from "styled-components";
import { above } from "../../../helpers/media-queries.helper";

/**
 * @description Skip Link to Main Content
 * @author  João Dias
 * @date  07/December/2018 at 23:19
 * @extends {React.FC}
 */
export const SkipLink = () => {
	return <Link href="#main-content">Skip to Main Content</Link>;
};

// Styling
const Link = styled.a`
	&:not(:focus) {
		border: 0;
		bottom: 0;
		clip-path: inset(50%);
		clip: rect(0 0 0 0);
		height: 1px;
		left: ${rem("-9999px")};
		margin: -1px;
		opacity: 0;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		width: 1px;
	}

	background-color: var(--color-primary);
	border-radius: ${rem("36px")};
	bottom: ${rem("64px")};
	display: flex;
	font-size: ${rem("12px")};
	font-weight: bold;
	height: ${rem("36px")};
	justify-content: center;
	left: 0;
	letter-spacing: 1px;
	line-height: ${rem("36px")};
	margin-left: auto;
	margin-right: auto;
	opacity: 1;
	outline-color: var(--color-gray1, #ecedf0);
	padding: 0 ${rem("8px")};
	position: fixed;
	right: 0;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: all 64ms var(--default-timing-function);
	width: calc(100% - 11.25rem);
	z-index: 3;

	&,
	&:focus,
	&:hover {
		color: var(--color-white, #ffffff);
	}

	${above.medium`
		width: ${rem("200px")};
	`};

	${above.large`
		position: absolute;
		top: ${rem("32px")};
		left: ${rem("112px")};
		right: auto;
	`};
`;

export default SkipLink;
