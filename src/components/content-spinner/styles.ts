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
	height: ${(props: IContentSpinnerProps) => {
		if (props.fullPage) {
			return "100vh";
		}
		if (props.center) {
			return "100%";
		}
		return `${props.size}px`;
	}};
	margin: 0 auto;
	position: relative;
	display: table;
	display: flex;
	flex-direction: row;
	justify-content: ${(props: IContentSpinnerProps) => (props.center ? "center" : "inherit")};
	align-items: ${(props: IContentSpinnerProps) => (props.center ? "center" : "inherit")};
	background-color: transparent;
	opacity: 1;
	user-select: none;
	pointer-events: none;

	${(props: IContentSpinnerProps) =>
		props.temporary &&
		css`
			animation-name: ${hideTimeout};
			animation-duration: 500ms;
			animation-delay: ${props.duration ? `${props.duration}ms` : "3000ms"};
			animation-timing-function: var(--default-timing-function);
			animation-fill-mode: forwards;
		`};

	.spinner {
		&__content {
			display: table-cell;
			vertical-align: middle;
			display: flex;
			z-index: 2;
			position: absolute;
			top: 50%;
			left: 50%;

			${(props: IContentSpinnerProps) =>
				props.size &&
				css`
					margin-top: ${rem(`${-1 * (props.size * 0.5)}px`)};
					margin-right: 0;
					margin-bottom: 0;
					margin-left: ${rem(`${-1 * (props.size * 0.5)}px`)}

					width: ${rem(`${props.size}px`)};
					height: ${rem(`${props.size}px`)};
				`};

			animation-name: ${spinnerRotate};
			animation-duration: ${(props: IContentSpinnerProps) => `${props.duration}ms`};
			animation-timing-function: linear;
			animation-delay: 0s;
			animation-iteration-count: infinite;
			animation-direction: normal;
			animation-fill-mode: none;
			animation-play-state: running;
		}

		&__icon {
			stroke: ${(props: IContentSpinnerProps) => `${props.color}`};
			stroke-linecap: round;

			animation-name: ${dashAnimation};
			animation-duration: ${(props: IContentSpinnerProps) => (props.duration ? `${props.duration * 0.5}ms` : "3000ms")};
			animation-timing-function: var(--default-timing-function);
			animation-iteration-count: infinite;
			animation-delay: 0;
			animation-direction: normal;
			animation-fill-mode: none;
			animation-play-state: running;

			${(props: IContentSpinnerProps) =>
				props.delay &&
				css`
					animation-delay: ${props.delay ? `${props.delay}ms` : "1000ms"};
				`};
		}
	}
`;

export default ContentSpinnerWrapper;
