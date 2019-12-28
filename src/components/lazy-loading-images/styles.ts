import styled, { keyframes, css } from "styled-components";
import { IImageLazyProps } from "./types";

// Styling
export const fadeInImage = keyframes`
	from {
		opacity: 0.1;
	}

	to {
		opacity: 1;
	}
`;

export const Image = styled.img`
	background-color: ${(props: IImageLazyProps) => props.backgroundColor || "transparent"};
	transform: scale(1);

	${(props: IImageLazyProps) => {
		const { animation, speed } = props;

		if (animation) {
			const duration = speed ? `${speed}ms` : "96ms";

			return css`
				opacity: 0;
				animation-fill-mode: forwards;
				animation-name: ${fadeInImage};
				animation-duration: ${duration};
			`;
		}

		return null;
	}};

	object-fit: ${(props: IImageLazyProps) => props.fit || "cover"};
	object-position: ${(props: IImageLazyProps) => `${props.positionTop} ${props.positionLeft}`};
`;

export const Picture = styled.picture`
	width: 100%;
	height: auto;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Placeholder = styled.svg`
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
`;

export const PlaceholderWithColor = styled.div`
	width: 100%;
	height: 100%;
`;
