import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers";

export const Container = styled.div`
	margin-top: calc(var(--global-margin) * 3) !important;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: var(--global-margin);

	${above.medium`
		grid-template-columns: repeat(2, 1fr);
		grid-gap: calc(var(--global-margin) * 2);
	`};
`;

export const Row = styled.div`
	order: 2;
	margin-top: var(--global-margin);

	${above.medium`
  	margin-top: 0;
	`};

	${above.large`
  	order: 1;
	`};

	.title {
		text-align: left;
		line-height: 1.1;
		color: var(--color-gray9);
		margin-bottom: var(--global-margin);
		width: 100%;

		${above.medium`
			font-size: ${rem("40px")};
		`};

		${above.large`
			font-size: ${rem("48px")};
		`};
	}

	.subtitle {
		font-family: var(--body-font-family);
		text-align: left;
		line-height: 1.09375;
		color: var(--color-gray8);
		margin-bottom: var(--global-margin);
		width: 100%;
		font-size: ${rem("20px")};

		${above.medium`
			font-size: ${rem("24px")};
		`};

		${above.medium`
			font-size: ${rem("32px")};
		`};
	}

	.code {
		font-size: ${rem("18px")};
		font-family: var(--body-font-family);
		color: var(--color-gray8);
		margin-bottom: calc(var(--color-gray8) * 1.5);
	}

	.list {
		list-style-type: none;
		margin-left: 0;
		padding-left: 0;

		li {
			font-size: ${rem("16px")};

			&:nth-child(2n) {
				padding-top: var(--global-padding);
				padding-bottom: var(--global-padding);
			}
		}

		a {
			color: var(--color-primary);
		}
	}
`;

export const Image = styled.figure`
	max-width: 100%;
	height: auto;
	order: 1;

	img {
		width: 100%;
		height: auto;
	}

	${above.large`
  	order: 2;
	`};
`;
