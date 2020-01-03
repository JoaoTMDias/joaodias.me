import styled, { keyframes } from "styled-components";
import { above } from "../../../helpers";
import supportsWebP from "supports-webp";

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
	animation-duration: 1500ms;
	animation-delay: 500ms;
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
	background-image: ${(props: { backgroundImage: string }) => {
		if (props.backgroundImage) {
			let src = "";

			supportsWebP.then(supported => {
				if (supported) {
					src = `url(${props.backgroundImage}?h=640&fm=webp&q=100)`;
				} else {
					src = `url(${props.backgroundImage}?h=640&fm=jpg&q=90&fl=progressive)`;
				}
			});
			return src;
		}

		return "none";
	}};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	background-attachment: scroll;

	${above.xlarge`
		background-attachment: fixed;
	`};
`;
