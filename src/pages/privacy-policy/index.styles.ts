import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";

export const Details = styled.details`
	margin-bottom: ${rem("32px")};

	${above.large`
		&:nth-of-type(1) {
			margin-top: calc(var(--global-margin) * 3);
		}

		margin-bottom: ${rem("48px")};
	`};

	.title {
		font-family: var(--heading-font-family);
		margin-bottom: var(--global-margin);
		color: var(--color-gray9, #3a3e4c);
		cursor: pointer;

		font-size: ${rem("19px")};

		${above.medium`
			font-size: ${rem("20px")};
	`};

		${above.large`
		font-size: ${rem("24px")};
	`};
	}

	.description {
		color: var(--color-gray8, #646b82);
		margin-left: ${rem("24px")};
		font-size: ${rem("16px")};

		${above.large`
		font-size: ${rem("18px")};
	`};
	}

	.title,
	.description {
		&:focus {
			outline-color: var(--color-gray6, #9a9fae);
			outline-width: 1px;
			outline-style: dashed;
			outline-offset: -1px;
		}
	}
`;

export const ArticleWrapper = styled.article`
	border-radius: var(--global-padding);
`;

export const Intro = styled.p`
	font-family: var(--body-font-family);
	color: var(--color-gray7, #82889b);
	font-size: ${rem("16px")};
	columns: 1;

	${above.medium`
		columns: 2;
		column-gap: var(--global-margin);
	`};

	${above.large`
		font-size: ${rem("20px")}
		columns: 2;
		column-gap: $global-margin * 2;
		margin-bottom: calc(var(--global-margin) * 3);
	`};
`;

export default Intro;
