import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";

export const Wrapper = styled.section`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	.layout__row {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 50vh;
	}

	.skills {
		&__title {
			font-family: var(--body-font-family);
			font-size: ${rem("18px")};
			color: var(--color-gray8, #646b82);
			letter-spacing: 0;
		}

		&__title,
		&__disclaimer {
			width: 80%;
			margin: 0 auto;
			text-align: center;
			line-height: var(--global-lineheight);

			${above.large`
				width: 100%;
			`};
		}

		&__disclaimer {
			font-size: ${rem("12px")};
			color: var(--color-gray8, #646b82);
			font-weight: 300;
		}
	}
`;

export const Item = styled.li`
	position: absolute;
	width: 50vw;
	max-width: ${rem("230px")};
	height: 50vh;
	max-height: ${rem("380px")};
	margin: 0 auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	will-change: transform;
	display: flex;
	align-items: center;
	justify-content: center;

	${above.medium`
		max-width: ${rem("190px")};
	`};
`;

export const Image = styled.figure`
	width: 50vw;
	max-width: ${rem("230px")};
	height: 50vh;
	max-height: ${rem("300px")};

	${above.medium`
		max-width: ${rem("190px")};
	`};

	background-color: white;
	background-size: auto 85%;
	background-repeat: no-repeat;
	background-position: center center;
	will-change: transform;
	border-radius: 10px;
	box-shadow: 0 12px 64px -12px rgba(50, 50, 73, 0.1), 0 8px 8px -8px rgba(50, 50, 73, 0.3);
	margin: 0;
	padding: 0;
`;
