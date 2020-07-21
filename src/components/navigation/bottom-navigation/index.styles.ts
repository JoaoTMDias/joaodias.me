import styled from "styled-components";
import { rem } from "polished";
import { Link } from "gatsby";
import { above } from "../../../helpers/media-queries.helper";

export const Wrapper = styled.nav`
	width: 100%;
	background-color: var(--color-gray0, #f9f9fa);
	height: auto;
	margin-right: auto;
	margin-left: auto;
	bottom: 0;
	position: fixed;
	box-shadow: 0px -2px 0px var(--color-gray0, #f9f9fa);
	z-index: 11;
	transition-property: bottom;
	transition-duration: 300ms;
	transition-timing-function: var(--default-timing-function);
	transition-delay: 300ms;

	${above.large`
			display: none;
	`};
`;

export const List = styled.ul`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	height: 100%;
`;

export const Item = styled.li`
	width: 100%;
	height: 100%;
	list-style-type: none;
	text-align: center;

	&:hover,
	&:focus {
		font-weight: 500;
	}
	.icon {
		svg {
			fill: var(--color-primary);
		}
	}
`;

export const TabLink = styled(Link)`
	background-color: transparent;
	height: var(--navbar-height);
	min-height: var(--navbar-height);

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	transition: all 200ms ease-in-out;
	.link {
		&__label,
		&__icon {
			opacity: 1;
		}

		&__label {
			width: 100%;
			font-size: ${rem("10px")};
			line-height: 1.428571429;
			font-family: var(--body-font-family);
			color: var(--color-gray7, #82889b);
		}

		&__icon {
			width: ${rem("24px")};
			height: ${rem("24px")};
			border-radius: ${rem("24px")};
		}

		&__filled {
			display: none;
		}

		&__stroke {
			display: flex;
			fill: var(--color-gray7, #82889b);
		}
	}

	&.is-active {
		background-color: var(--color-gray1, #ecedf0);

		.link {
			&__label,
			&__icon {
				opacity: 1;
			}

			&__label {
				color: var(--color-black, #030304);
			}

			&__filled {
				display: flex;
				fill: var(--color-black, #030304);
			}

			&__stroke {
				display: none;
			}
		}
	}
`;
