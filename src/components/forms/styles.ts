import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";
import { EHeadingSize } from "../../data/constants/headings";
import { responsiveHeading } from "../../helpers/responsive-typography.helpers";
import { theme } from '../../helpers/theme.helper';

// Styled Components
export const TextInputWrapper = styled.div`
	-webkit-appearance: none;
	appearance: none;
	background-color: var(--color-white, #ffffff);
	padding: 0;
	margin: 0;

	&.isFocused {
		.label {
			color: var(--color-primary);
		}
		.content {
			outline-width: 2px;
			outline-style: solid;
			outline-color: var(--color-primary);
			outline-offset: -2px;
		}

		.input {
			outline: 0;
		}
	}

	.content,
	.label,
	.helper,
	.input {
		transition: all 200ms ease-in-out;
	}

	.content {
		position: relative;
		background-color: var(--color-white, #ffffff);
		border-radius: 0;
		padding: ${rem("4px")} ${rem("14px")} 0 ${rem("14px")};
		border: 2px solid var(--color-gray2, #dfe0e5);
		width: 100%;
		margin: 0;

		&:hover,
		&:focus {
			.label {
				color: var(--color-primary);
			}
		}
	}

	.label {
		font-size: ${rem("10px")};
		color: var(--color-gray8, #646b82);
		margin-bottom: 0;
		width: 100%;
		display: block;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.input {
		margin: 0;
		color: var(--color-gray9, #3a3e4c);
		border: none;
		box-shadow: none;
		padding: 0;
		height: ${rem("32px")};
		background-color: var(--color-white, #ffffff);
		width: 100%;

		&::placeholder {
			color: var(--color-gray8, #646b82) !important;
		}

		&:focus {
			border: none;
			box-shadow: none;
		}
	}
	.helper {
		font-size: ${rem("14px")};
		font-style: italic;
		color: var(--color-gray4, #c0c3cc);
		margin-top: ${rem("2px")};
		margin-left: 0;
		margin-right: 0;
		margin-bottom: 0;
		text-align: left;
	}

	${theme.dark`
		background-color: var(--color-gray10);

		.content {
			background-color: var(--color-gray10);
			border-color: var(--color-gray10);
		}

		.label {
			color: var(--color-gray3);
		}

		.input,
		.input:-internal-autofill-selected {
			color: var(--color-gray1) !important;
			background-color: var(--color-gray10) !important;

			&::placeholder {
				color: var(--color-gray7) !important;
			}

			&:focus {
				border: none;
				box-shadow: none;
			}
		}
		.helper {
			color: var(--color-gray8);
		}
	`};
`;

export const TextAreaInputWrapper = styled(TextInputWrapper)`
	.input {
		flex: 1;
		min-height: ${rem("200px")};
		max-height: ${rem("480px")};
	}
`;

export const FormWrapper = styled.form`
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
`;

export const Submit = styled.button`
	font-size: ${rem("12px")};
	text-transform: uppercase;
	letter-spacing: ${rem("4px")};
	color: var(--color-gray4, #c0c3cc);
	cursor: not-allowed;
	font-weight: bold;
	text-align: center;
	width: 100%;
	padding: var(--global-padding);
	border-width: 2px;
	border-style: solid;
	border-color: var(--color-gray2, #dfe0e5);
	border-radius: 0;
	background-color: var(--color-white, #ffffff);
	appearance: none;
	transition: all 200ms;
	pointer-events: none;
	grid-column: 1 / 3;

	&.is-valid {
		color: var(--color-gray9, #3a3e4c);
		cursor: pointer;
		pointer-events: all;
		border-radius: 0;

		&:hover,
		&:focus {
			background-color: var(--color-gray9, #3a3e4c);
			color: var(--color-white, #ffffff);
			border-color: var(--color-black, #030304);
			padding-top: ${rem("24px")};
			padding-bottom: ${rem("24px")};
		}
	}

	${theme.dark`
		color: var(--color-gray9);
		background-color: var(--color-black);
		border-color: transparent;

		&.is-valid {
			color: var(--color-gray4);
			border-color: transparent;

			&:hover,
			&:focus {
				background-color: var(--color-gray10);
				color: var(--color-gray3);
				border-color: var(--color-gray10);
			}
		}
	`};
`;

export const Fieldset = styled.div`
	width: 100%;
	display: grid;
	justify-content: flex-start;
	grid-gap: 0.25rem;
	grid-template-columns: 1fr;

	${above.medium`
		grid-template-columns: 1fr 1fr;

		[data-form="textarea"] {
			grid-column: 1 / 3;
		}
	`};
`;

export const Success = styled.div`
	background-color: var(--color-primary, $color-primary);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: calc(var(global-padding) * 1.5);

	.success {
		&:focus {
			outline-width: 1px;
			outline-style: dashed;
			outline-color: var(--color-white, #ffffff);
			outline-offset: -3px;
		}

		&__title,
		&__message {
			color: var(--color-white, #ffffff);
			text-align: center;

			&:focus {
				outline-width: 1px;
				outline-style: dashed;
				outline-color: var(--color-white, #ffffff);
			}
		}

		&__image {
			width: ${rem("96px")};
			height: ${rem("96px")};
			border-radius: ${rem("96px")};
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: calc(var(global-margin) * 1.5);
			background-color: var(--color-white, #ffffff);
			clip-path: circle(3rem at 50%);

			svg {
				width: ${rem("72px")};
				height: ${rem("72px")};

				path {
					fill: var(--color-primary);
				}
			}
		}

		&__title {
			font-weight: bold;
			margin-bottom: calc(var(--global-margin) * 0.5);
		}

		&__message {
			${responsiveHeading(EHeadingSize.LARGE, 6)};
			max-width: ${rem("560px")};
			margin: 0 auto;
		}
	}
`;
