import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";
import { theme } from "../../helpers/theme.helper";

export const Details = styled.details`
	margin-bottom: ${rem("32px")};

	${above.large`
		margin-bottom: ${rem("48px")};
	`};

	.title {
		font-family: var(--heading-font-family);
		margin-bottom: var(--global-margin);
		color: var(--color-gray9, #3a3e4c);
		cursor: pointer;

		font-size: ${rem("18px")};

		${above.large`
			font-size: ${rem("20px")};
		`};
	}

	.description {
		color: var(--color-gray8, #646b82);
		margin-left: ${rem("24px")};
		font-size: ${rem("16px")};
	}

	.title,
	.description {
		&:focus {
			outline-color: var(--color-gray8, #9a9fae);
			outline-width: 1px;
			outline-style: dashed;
			outline-offset: -1px;
		}
	}

	${theme.dark`
		.title {
			color: var(--color-gray5);

			&:hover {
				color: var(--color-gray3);
			}
		}

		.description {
			color: var(--color-gray5);
		}

		&[open] {
			.title {
				color: var(--color-gray1);
			}

			.description {
				color: var(--color-gray1);
			}
		}
	`}
`;

export const ArticleWrapper = styled.article`
	border-radius: var(--global-padding);
`;

export const HorizontalRule = styled.hr`
	background-image: url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift 5s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%239a9fae' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E");
	background-position: 0 100%;
	background-size: auto 3px;
	background-repeat: repeat-x;
	text-decoration: none;
	border: none;
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	height: 3px;
`;

export const List = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1rem;

	${above.large`
		grid-gap: 1rem 2rem;
		grid-template-columns: repeat(2, 1fr);
	`}
`;

export const Intro = styled.p`
	font-family: var(--body-font-family);
	color: var(--color-gray7, #82889b);
	font-size: ${rem("16px")};
	columns: 1;
	line-height: 1.618;

	${above.medium`
		columns: 2;
		column-gap: var(--global-margin);
	`};

	${above.large`
		font-size: ${rem("20px")}
		columns: 2;
		column-gap: calc(var(--global-margin) * 2);
		margin-bottom: calc(var(--global-margin) * 1.5);
	`};

	${theme.dark`
		color: var(--color-gray2);
	`}
`;

export default Intro;
