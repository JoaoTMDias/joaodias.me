import styled, { keyframes } from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";
import { theme } from "../../helpers/theme.helper";

export const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const morph = keyframes`
  from {border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;}
  to {border-radius: 40% 60%;}
`;

export const Container = styled.figure`
	width: 100%;
	height: 100%;
	animation-name: ${spin};
	animation-duration: 60000ms;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
	position: relative;
`;

export const Shape = styled.div`
	position: relative;
	overflow: hidden;

	.gatsby-image-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		z-index: 5;
		width: 100%;
		height: 100%;
		border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
		transition: border-radius 1s ease-out;
		animation-name: ${morph};
		animation-duration: 56000ms;
		animation-timing-function: ease-in-out;
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-fill-mode: both;
		animation-play-state: running;
	}

	img,
	source {
		width: 110% !important;
		height: 110% !important;
		position: absolute;
		left: -5% !important;
		top: -5% !important;
		display: flex;
		animation-name: ${spin};
		animation-duration: 56000ms;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: reverse;
		overflow: hidden;
	}
`;

export const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	align-items: center;

	${above.large`
    grid-template-columns: repeat(2, 1fr);
	`};

	${above.xlarge`
    grid-gap: calc(var(--global-margin) * 2);
	`};

	${above.xxlarge`
    grid-gap: calc(var(--global-margin) * 3);
	`};

	.image {
		position: relative;
		border: 1px dashed var(--color-gray4, #c0c3cc);
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 50%;
			border: 1px dashed var(--color-gray4, #c0c3cc);
			transform: scale(1.42);
		}
	}

	.text {
		p {
			color: var(--color-gray8, #646b82);
			font-weight: 300;
		}
	}

	.title {
		font-weight: 300;
		font-size: ${rem("24px")};
		font-family: var(--heading-font-family);

		${above.large`
			font-size: ${rem("28px")};
		`};
	}

	.lead {
		font-family: var(--body-font-family);
		color: var(--color-gray9, #3a3e4c);
		font-size: ${rem("19px")};

		${above.medium`
			font-size: ${rem("20px")};
		`};

		${above.large`
			font-size: ${rem("20px")};
		`};
	}

	${theme.dark`
		.image {
			border-color: var(--color-gray9);

			&::before {
				border-color: var(--color-gray9);
			}
		}

		.title {
			color: var(--color-gray1);
		}

		.lead,
		.text p {
			color: var(--color-gray4);
		}
	`};
`;

export default Content;
