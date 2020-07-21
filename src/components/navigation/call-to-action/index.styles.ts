import styled from "styled-components";
import { Link } from "gatsby";
import { rem } from "polished";
import { above } from "../../../helpers";

export const Item = styled(Link)`
	position: relative;
	box-shadow: 0 1px 4px rgba(177, 177, 194, 0.4);
	border-radius: calc(var(--global-radius) * 2);
	background-color: var(--call-to-action-wrapper-background);
	transition: all 250ms ease-in-out;
	background-repeat: no-repeat;
	text-decoration: none;
	grid-template-rows: 1fr;
	overflow: hidden;

	${above.medium`
    &:nth-child(1) {
      border-right: 1px solid var(--call-to-action-wrapper-border);
    }

    &:nth-child(n) {
      margin-left: calc(var(--global-margin) * 0.5);
      margin-right: calc(var(--global-margin) * 0.5);
    }
  `};

	&:hover,
	&:focus {
		box-shadow: 0 16px 48px var(--call-to-action-wrapper-shadow);
		--call-to-action-wrapper-background: var(--call-to-action-wrapper-background-hover);

		&::before {
			--size: ${rem("480px")};
			z-index: 3;
		}
	}

	.item__inner {
		width: 100%;
		display: flex;
		padding-top: calc(var(--global-padding) * 1.5);
		padding-right: calc(var(--global-padding) * 1.5);
		padding-bottom: calc(var(--global-padding) * 1.5);
		padding-left: calc(var(--global-padding) * 1.5);
		cursor: pointer;
		transition-property: cubic-bezier(0.19, 1, 0.22, 1), opacity cubic-bezier(0.19, 1, 0.22, 1),
			transform cubic-bezier(0.19, 1, 0.22, 1);
		transition-duration: 750ms;
		transform: translate3d(0, 0, 0);
		opacity: 1;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: auto;

		${above.large`
      height: ${rem("280px")};
      padding-top: calc(var(--global-padding) * 2);
      padding-right: calc(var(--global-padding) * 2);
      padding-bottom: calc(var(--global-padding) * 2);
      padding-left: calc(var(--global-padding) * 2);
    `};

		&:hover,
		&:focus {
			opacity: 1;
		}
	}

	.item__top,
	.item__bottom {
		display: flex;
		flex: 1;
		animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
	}

	.item__top {
		align-items: center;
		flex-direction: column;
		animation-delay: 500ms;
	}

	.item__bottom {
		align-items: flex-end;

		${above.large`
      align-items: flex-end;
    `};

		p {
			animation-delay: 2200ms;
		}
	}

	.item__title,
	.item__subtitle,
	.item__link {
		text-align: center;
		background-color: var(--call-to-action-wrapper-background);
	}

	.item__subtitle,
	.item__link {
		font-family: var(--body-font-family);
		font-weight: 400;
	}

	.item__title {
		font-family: var(--heading-font-family);
		font-weight: 300;
		color: var(--call-to-action-title, #030304);
		font-size: ${rem("20px")};
		margin-top: ${rem("8px")};

		${above.medium`
      font-size: ${rem("24px")};
    `};

		${above.large`
      font-size: ${rem("28px")};
    `};
	}

	.item__subtitle {
		color: var(--call-to-action-subtitle, #646b82);
		text-align: center;
		width: 100%;
		margin: 0 auto;

		font-size: ${rem("17px")};

		${above.medium`
      font-size: ${rem("18px")};
    `};

		${above.large`
      font-size: ${rem("20px")};
    `};
	}

	.item__link {
		color: var(--call-to-action-link, #646b82);
		text-align: center;
		width: 100%;
		margin: 0 auto;
		text-transform: uppercase;
		letter-spacing: ${rem("2px")};
		font-size: ${rem("12px")};

		${above.large`
      font-size: ${rem("14px")};
    `};
	}
`;

export const External = styled(Item)`
	position: relative;
`;

export const Wrapper = styled.div`
	flex-direction: row;

	.layout__row {
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: var(--global-margin);

		${above.medium`
			grid-template-columns: repeat(2, 1fr);
			grid-gap: calc(var(--global-margin) * 2)
		`};
	}
`;
