import styled from "styled-components";
import { rem } from "polished";
import { ExternalLink } from "../external-link";
import { above } from "../../../helpers/media-queries.helper";

// Styles
export const Container = styled.nav`
	max-height: var(--navbar-height);
	display: flex;
	width: 100%;
`;

export const List = styled.ul`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-gap: ${rem("16px")};
	font-family: var(--body-font-family);
	max-height: $navbar-height;
	padding: 0;
	margin: 0 auto;
	width: 100%;

	${above.large`
		grid-gap: 0;
		max-width: calc(3rem * 5);
	`};
`;

export const Item = styled.li`
	display: flex;
	list-style-type: none;
	line-height: ${rem("48px")};
	padding: 0 ${rem("8px")};
	margin: 0;
	align-items: flex-start;
	justify-content: center;
	position: relative;

	${above.large`
		padding: 0;
	`};

	&:last-item {
		margin-right: 0;
	}

	a {
		padding: ${rem("12px")} 0px;
		font-family: inherit;
		font-size: ${rem("14px")};
		color: var(--color-gray8, #646b82);
		letter-spacing: ${rem("0.5px")};
		line-height: ${rem("48px")};
		text-transform: uppercase;
		text-decoration: none;
		align-items: center;
		display: flex;
		overflow: hidden;
		position: relative;

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: $color-primary;
			transform: translate3d(-100%, 0, 0) translate3d(-1px, 0, 0);
			transition: transform 640ms;
			transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		}

		&:hover,
		&:focus {
			color: var(--color-alternate);
			fill: var(--color-alternate);
			&:after {
				transform: translate3d(0%, 0, 0);
			}
			&:before {
				transform: translate3d(100%, 0, 0) translate3d(1px, 0, 0);
			}
		}

		&:active {
			outline: 1;
		}
	}
`;

export const Link = styled(ExternalLink)`
	width: ${rem("32px")};
	height: ${rem("48px")};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	${above.large`
		width: ${rem("48px")};
	`};

	&:hover,
	&:focus {
		.social__fill {
			fill: var(--color-alternate);
		}
	}

	svg {
		width: ${rem("24px")};
		height: ${rem("24px")};
		display: flex;
	}
`;
