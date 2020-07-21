import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../../helpers/media-queries.helper";

export const Wrapper = styled.nav`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-self: center;
	max-height: var(--navbar-height);
	width: 100%;
`;

export const List = styled.ul`
	display: none;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: ${rem("16px")};
	flex-direction: row;
	font-family: var(--body-font-family);
	max-height: var(--navbar-height);
	width: auto;
	display: none;
	margin: 0;
	padding: 0;

	${above.large`
		display: grid;
		visibility: visible;
	`};
`;

export const Item = styled.li`
	display: flex;
	list-style-type: none;
	line-height: ${rem("48px")};
	padding: 0;
	margin-top: 0;
	margin-right: ${rem("16px")};
	margin-bottom: 0;
	margin-left: ${rem("16px")};
	align-items: center;
	justify-content: center;
	position: relative;
	text-align: center;
	flex-wrap: wrap;
	min-width: ${rem("72px")};

	a {
		padding: 0;
		font-family: inherit;
		font-size: ${rem("12px")};
		color: var(--color-gray8, #646b82);
		background-color: transparent;
		letter-spacing: ${rem("2px")};
		line-height: ${rem("48px")};
		text-transform: uppercase;
		text-decoration: none;
		align-items: center;
		justify-content: center;
		display: flex;
		overflow: hidden;
		position: relative;

		&.active {
			color: var(--color-alternate);
			text-decoration: line-through;
			text-decoration-color: var(--color-primary);
		}

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: var(--color-primary);
			transform: translate3d(-100%, 0, 0) translate3d(-1px, 0, 0);
			transition: transform 640ms;
			transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
		}

		&:hover,
		&:focus {
			color: var(--color-alternate);

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
