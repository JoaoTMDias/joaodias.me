import styled from "styled-components";
import { theme } from '../../../helpers/theme.helper';

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

			${theme.dark`
					--color-icon: var(--color-gray3, #d0d2d9);
			`};
		}
	}
`;

export const Icon = styled.svg`
	--color-icon: var(--color-gray4);

	width: 3rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	.moon {
		transform: translateY(-0.25rem);
	}

	.sun__rays,
	.sun__sphere,
	.moon__sphere,
	.moon__star,
	.moon__star--small {
		transform-origin: center center;
		fill: var(--color-icon);
	}
`;
