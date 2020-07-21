import styled from "styled-components";
import { rem } from "polished";
import { Link } from "gatsby";
import { above } from "../../../helpers/media-queries.helper";
import { responsiveHeading } from "../../../helpers/responsive-typography.helpers";
import { EHeadingSize } from "../../../data/constants/headings";
import { theme } from "../../../helpers/theme.helper";

// ///////////////////
// STYLED COMPONENTS
// ///////////////////
export const Item = styled(Link)`
	position: relative;
	overflow: hidden;
	background-color: var(--color-gray2, #dfe0e5);
	background-repeat: no-repeat;
	background-position: center center !important;
	background-size: cover !important;
	background-color: transparent;
	text-decoration: none;
	position: relative;
	height: auto;
	grid: span 1;

	${above.large`
			&:nth-child(1),
			&:nth-child(4),
			&:nth-child(7) {
				grid-column: span 2;
			}

			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(5),
			&:nth-child(6) {
				grid-column: span 1;
			}

			&:nth-child(8),
			&:nth-child(9) {
				grid-column: span 1;
				max-height: rem-calc(370);
			}
	`}

	&:nth-child(even) {
		background-position: 25% center !important;
	}

	&:hover,
	&:focus {
		box-shadow: 0 24px 64px var(--color-gray4, #c0c3cc);

		.inner {
			opacity: 1;
			transition: opacity 128ms var(--default-timing-function);
			transform: scale(1, 1);

			&__header,
			&__content,
			&__footer {
				opacity: 1;
			}
		}

		${theme.dark`
			box-shadow: 0 24px 64px var(--color-gray10);
		`};
	}

	picture {
		display: block;
		width: 100%;
		height: 100%;
	}

	.item__image,
	img,
	source {
		position: relative;
		object-fit: cover;
		object-position: center center;
		width: 100%;
		height: 100%;
	}

	.lazy-loading-image__wrapper {
		background-position: center center;
		background-size: cover;
		bottom: 0;
		display: block;
		left: 0;
		overflow: hidden;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		height: 100%;
		min-height: ${rem("375px")};

		> div,
		figure {
			padding-bottom: 0 !important;
		}
	}
`;

export const Inner = styled.div`
	align-items: flex-start;
	background-color: var(--color-alternate, #0037ea);
	color: var(--color-white, #ffffff);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	opacity: 0;
	padding: ${rem("24px")};
	position: relative;
	width: 100%;
	height: 100%;
	min-height: ${rem("360px")};

	.inner {
		&__header,
		&__content,
		&__footer {
			width: 100%;
			display: flex;
			flex: 1;
			opacity: 0;
			background-color: var(--color-alternate, #0037ea);
			color: var(--color-white, #ffffff);
		}

		&__header {
			align-items: flex-start;
			flex-direction: column;
		}

		&__content {
			align-items: center;

			p {
				font-family: var(--body-font-family);
				opacity: 1;
				text-rendering: geometricPrecision;
			}
		}

		&__footer {
			align-items: flex-end;
		}

		&__description {
			display: flex;
			flex: 1;
			justify-content: flex-start;
			margin: 0;
			${responsiveHeading(EHeadingSize.SMALL, 6)};
			background: transparent;

			${above.medium`
				${responsiveHeading(EHeadingSize.MEDIUM, 5)};
			`};

			${above.large`
				${responsiveHeading(EHeadingSize.LARGE, 5)};
			`};
		}

		&__title {
			line-height: 1;
			margin-bottom: 0;
			${responsiveHeading(EHeadingSize.LARGE, 2)};
			font-family: var(--heading-font-family);
			font-weight: 300;

			${above.medium`
				${responsiveHeading(EHeadingSize.MEDIUM, 5)};
			`};
		}

		&__type {
			font-family: var(--body-font-family);
			font-size: ${rem("12px")};
			letter-spacing: 2px;
			margin-bottom: calc(var(--global-margin) * 0.5);
			text-transform: uppercase;
		}

		&__seemore {
			${responsiveHeading(EHeadingSize.MEDIUM, 6)};
			border-radius: ${rem("50px")};
			border: 2px solid white;
			margin-bottom: 0;
			opacity: 1;
			padding: calc(var(--global-padding) * 0.5) var(--global-padding);
			transform: scale(1);
			transition-duration: 100ms;
			transition-property: opacity background-color;
			transition-timing-function: var(--default-timing-function);
			background-color: var(--color-alternate, #0037ea);
			color: var(--color-white, #ffffff);

			${above.large`
				${responsiveHeading(EHeadingSize.LARGE, 6)};
			`};

			&:hover,
			&:focus,
			&:active {
				background-color: var(--color-white, #ffffff);
				color: var(--color-primary);
			}
		}

		&__type,
		&__title,
		&__description {
			background-color: var(--color-alternate, #0037ea);
			color: var(--color-white, #ffffff);
		}
	}
`;
