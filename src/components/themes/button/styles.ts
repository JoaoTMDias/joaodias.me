import styled from "styled-components";

export const Wrapper = styled.button`
	-webkit-appearance: none;
	appearance: none;
	width: 3rem;
	height: 3rem;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: none;
	background: transparent;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	&:hover,
	&:focus {
		svg {
			--color-icon: var(--color-gray8);

			html[data-theme="dark"] && {
				--color-icon: var(--color-gray3, #d0d2d9);
			}
		}
	}
`;

export const Icon = styled.svg`
	--color-icon: var(--color-gray2);

	width: 3rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	.sun__rays,
	.sun__sphere,
	.moon__sphere,
	.moon__star,
	.moon__star--small {
		transform-origin: center center;
		fill: var(--color-icon);
	}
`;
