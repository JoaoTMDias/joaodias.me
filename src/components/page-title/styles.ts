import styled, { css } from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";
import { IPageTitleProps } from "./types";
import { theme } from "../../helpers/theme.helper";

export const Container = styled.section`
	width: 100%;
	margin: 0 auto;
	align-items: center;
	height: 48vh;
	min-height: ${rem("280px")};
	max-height: ${rem("560px")};
	text-align: center;
	background-color: transparent;
	background-position: center bottom;
	overflow: hidden;
	text-align: center;
	position: relative;

	${above.large`
    height: 65vh;
    min-height: ${rem("384px")};
	`};

	${above.xlarge`
    min-height: ${rem("448px")};
	`};
`;

export const Row = styled.div<IPageTitleProps>`
	will-change: transform;
	padding: ${rem("16px")} !important;
	background-color: transparent;
	z-index: 1;

	${above.large`
		padding: ${(props: IPageTitleProps) => {
			if (props.isProject) {
				return `${rem("48px")} !important`;
			}

			return `${rem("48px")} ${rem("16px")} !important`;
		}}
	`};

	${(props: IPageTitleProps) =>
		props.isProject &&
		css`
			width: auto !important;
			box-shadow: 0 16px 48px 0 rgba(108, 158, 195, 0.22);
			border-radius: ${rem("12px")};
		`};

	${(props: IPageTitleProps) =>
		props.center &&
		css`
			display: flex;
			flex-direction: column;
			align-items: center;
		`};
`;

export const Subtitle = styled.h2`
	font-family: var(--body-font-family);
	color: var(--color-gray9, #3a3e4c);
	text-align: ${(props: IPageTitleProps) => (props.center ? "center" : "left")};
	font-weight: 300;
	font-size: ${rem("20px")};

	${above.medium`
		font-size: ${rem("24px")};
	`};

	${theme.dark`
		color: var(--color-gray2);
	`};
`;

export const Title = styled.h1`
	width: auto;
	text-align: ${(props: IPageTitleProps) => (props.center ? "center" : "left")};
	font-family: var(--heading-font-family);
	font-size: ${rem("32px")};
	font-weight: 300;
	color: var(--color-primary);
	letter-spacing: 0.7px;

	${above.medium`
		letter-spacing: 0.85px;
		line-height: 1.2;
		font-size: ${rem("40px")};
	`};

	${theme.dark`
		color: var(--color-white);
	`};
`;
