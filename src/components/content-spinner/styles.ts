import styled, { keyframes, css } from "styled-components";
import { rem } from "polished";
import { IContentSpinnerProps } from "./types";

// /////////
// STYLING
// /////////

// Animations
const hideTimeout = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

const spinnerRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Markup
export const ContentSpinnerWrapper = styled.div`
	width: 100%;
	height: ${({ fullPage, center, size }: IContentSpinnerProps) => {
		if (fullPage) {
			return "100vh";
		}
		if (center) {
			return "100%";
		}
		return `${size}px`;
	}};
	margin: 0 auto;
	position: relative;
	display: table;
	display: flex;
	flex-direction: row;
	justify-content: ${({ center }: IContentSpinnerProps) => (center ? "center" : "inherit")};
	align-items: ${({ center }: IContentSpinnerProps) => (center ? "center" : "inherit")};
	background-color: transparent;
	opacity: 1;
	user-select: none;
	pointer-events: none;

	${({ temporary, duration }: IContentSpinnerProps) => {
		if (temporary) {
			return css`
				animation-name: ${hideTimeout};
				animation-duration: 500ms;
				animation-delay: ${`${duration}ms`};
				animation-timing-function: var(--default-timing-function);
				animation-fill-mode: forwards;
			`;
		}
	}};

	.spinner {
		&__container {
			display: table-cell;
			vertical-align: middle;
			display: flex;
			z-index: 2;
			position: absolute;
			top: 50%;
			left: 50%;

			${({ size }: IContentSpinnerProps) => {
				if (size) {
					return css`
						margin-top: ${rem(`${-1 * (size * 0.5)}px`)};
						margin-right: 0;
						margin-bottom: 0;
						margin-left: ${rem(`${-1 * (size * 0.5)}px`)}

						width: ${rem(`${size}px`)};
						height: ${rem(`${size}px`)};
					`;
				}
			}};

			animation-name: ${spinnerRotate};
			animation-duration: ${({ duration }: IContentSpinnerProps) => `${duration}ms`};
			animation-timing-function: linear;
			animation-delay: 0s;
			animation-iteration-count: infinite;
			animation-direction: normal;
			animation-fill-mode: none;
			animation-play-state: running;
		}

		&__icon {
			stroke: ${({ color }: IContentSpinnerProps) => `${color}`};
			stroke-linecap: round;

			animation-name: ${dashAnimation};
			animation-duration: ${({ duration }: IContentSpinnerProps) => duration && `${duration * 0.5}ms`};
			animation-timing-function: var(--default-timing-function);
			animation-iteration-count: infinite;
			animation-delay: 0;
			animation-direction: normal;
			animation-fill-mode: none;
			animation-play-state: running;

			${({ delay }: IContentSpinnerProps) => {
				if (delay) {
					return css`
						animation-delay: ${delay && `${delay}ms`};
					`;
				}
			}};
		}
`;

export default ContentSpinnerWrapper;
