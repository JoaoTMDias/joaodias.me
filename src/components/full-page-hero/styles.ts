import styled from "styled-components";
import { rem } from "polished";
import { fluidType } from "../../helpers";
import { above } from "../../helpers/media-queries.helper";

export const Hero = styled.article`
	background-color: transparent;
	min-height: ${rem("380px")};
	max-height: 50vh;
	display: flex;
	justify-content: flex-start;
	align-items: center;

	${above.medium`
		min-height: ${rem("560px")};
		max-height: 64vh;
	`};

	${above.large`
			max-height: ${rem("560px")};
	`};

	${above.xlarge`
		max-height: ${rem("640px")};
	`};
`;

export const Wrapper = styled.div`
	align-items: center;
	will-change: transform;
	width: 100%;
	padding-left: ${rem("8px")};
	padding-right: ${rem("8px")};
`;

export const Text = styled.div`
	width: 100%;
	height: auto;

	> div {
		min-height: ${rem("72px")};
		@media all and (min-width: ${rem("400px")}) {
			min-height: ${rem("40px")};
			height: auto;
		}
	}
`;

export const Subtitle = styled.h2`
	font-family: var(--body-font-family);
	font-weight: 300;
	color: var(--color-gray9, #3a3e4c);
	letter-spacing: 0;
	margin-bottom: 1.5rem;
	font-size: ${rem("32px")};
	font-size: ${fluidType({
		minFont: 19,
		maxFont: 32,
		minScreen: 320,
		maxScreen: 1440,
	})};

	html[data-theme="dark"] && {
		color: var(--color-gray2);
	}
`;
