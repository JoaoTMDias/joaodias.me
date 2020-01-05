import styled, { keyframes } from "styled-components";
import { above } from "../../../helpers";

export const MaskAnimation = keyframes`
 0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
 }

 90% {
    clip-path: polygon(0 0, 89% 0, 78% 100%, 0% 100%);
 }

 100% {
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
 }
`;

export const Masthead = styled.div`
	width: 100%;
	margin: 0 auto;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 60vh;
	max-height: 20rem;
	background-color: transparent;
	margin-top: 1rem;
	clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
	animation-name: ${MaskAnimation};
	animation-duration: 750ms;
	animation-delay: 250ms;
	animation-fill-mode: forwards;
	animation-timing-function: ease-in-out;

	${above.medium`
    margin-top: 0;
	`};

	${above.large`
    height: 70vh;
    max-height: 40rem;	`};

	${above.xlarge`
    height: 65vh;
	`};
`;

export const BackgroundImage = styled.figure`
	width: 100%;
	height: 100%;
	background-image: ${({ supports, file }: { supports: boolean; file: string }) => {
		if (!file) {
			return "none";
		}

		return supports ? `url(${file}?h=640&fm=webp&q=100)` : `url(${file}?h=640&fm=jpg&q=90&fl=progressive)`;
	}};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: scroll;

	${above.xlarge`
		background-attachment: fixed;
	`};
`;
