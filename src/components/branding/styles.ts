// Libraries
import { Link } from "gatsby";
import styled from "styled-components";

// Styling
export const Brand = styled(Link)`
	display: flex;
	align-self: flex-start;
	width: 3rem;
	text-decoration: none;
	margin: 0;
`;

export const Logo = styled.svg`
	display: inline-block;
	width: 3rem;
	height: 3rem;
	margin: 0;
	vertical-align: middle;
	transition-property: all;
	transition-duration: 112ms;
	transition-timing-function: var(--default-timing-function);

	.brand__hair {
		fill: var(--color-black, #030304);
	}

	.brand__glasses {
		fill: var(--color-black, #030304);
	}

	&:hover,
	&:focus {
		transform: scale(1.2) rotate(10deg);

		.brand__hair {
			fill: var(--color-primary);
		}

		.brand__glasses {
			transform: translateY(2px);
			fill: var(--color-primary);
		}
	}

	&:active {
		transform: scale(1.4) rotate(-10deg);

		.brand__hair {
			fill: var(--color-primary);
		}

		.brand__glasses {
			transform: translateY(2px);
			fill: var(--color-alternate);
		}
	}
`;
