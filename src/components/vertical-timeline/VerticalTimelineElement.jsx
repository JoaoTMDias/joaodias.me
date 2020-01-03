import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { rem, lighten } from "polished";
import { above } from "../../helpers/media-queries.helper";

/**
 *
 *
 * @class VerticalTimelineElement
 * @extends {Component}
 */
const VerticalTimelineElement = ({ id, children, icon, iconStyle, date, position, className, style, description }) => (
	<Item
		id={id}
		className={`${className}${position} timeline--item`}
		style={style}
		aria-label={`${description}`}
		tabIndex={0}
	>
		<div>
			<Icon style={iconStyle} className="icon bounce-in">
				{icon}
			</Icon>
			<Content className="content bounce-in">
				{children}
				<span className="date">{date}</span>
			</Content>
		</div>
	</Item>
);

VerticalTimelineElement.propTypes = {
	id: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
	className: PropTypes.string,
	icon: PropTypes.element,
	iconStyle: PropTypes.shape({}),
	style: PropTypes.shape({}),
	description: PropTypes.string,
	date: PropTypes.string,
	position: PropTypes.string,
};

VerticalTimelineElement.defaultProps = {
	id: "",
	children: null,
	className: "",
	icon: null,
	iconStyle: null,
	style: null,
	date: "",
	position: "",
};

// Styled Components
const CdBounce1 = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const CdBounce2Inverse = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  60% {
    opacity: 1;
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0);
  }
`;

const Item = styled.div`
	position: relative;
	margin: ${rem("32px")} 0;

	&:after {
		content: "";
		display: table;
		clear: both;
	}
	&:first-child {
		margin-top: 0;
	}
	&:last-child {
		margin-bottom: 0;
	}

	&:focus {
		outline-color: var(--color-gray2, #dfe0e5);
		outline-width: 1px;
		outline-style: dashed;
		outline-offset: -1px;
	}

	${above.large`
    margin: ${rem("64px")} 0;

		&:nth-child(even):not(.left) .content,
		&.right .content {
			float: right;
		}
		&:nth-child(even):not(.left) .content::before,
		&.right .content::before {
			top: ${rem("24px")};
			left: auto;
			right: 100%;
			border-color: transparent;
			border-right-color: var(--color-gray7, #82889b);
		}
		&:nth-child(even):not(.left) .content .date,
		&.right .content .date {
			left: auto;
			right: 142%;
			text-align: right;
		}
		&:first-child {
			margin-top: 0;
		}
		&:last-child {
			margin-bottom: 0;
		}

		&:nth-child(even):not(.left) .content.bounce-in,
		&.right .content.bounce-in {
			animation-name: ${CdBounce2Inverse};
			animation-duration: 600ms;
			animation-timing-function: var(--default-timing-function);
		}
	`};

	&.type {
		&--work {
			.icon {
				background-image: linear-gradient(var(--color-white, #ffffff), var(--color-gray1, #ecedf0));
			}
		}
		&--education {
			.icon {
				background-image: linear-gradient(var(--color-white, #ffffff), var(--color-gray2, #dfe0e5));
			}
		}
		&--work,
		&--education {
			color: var(--color-gray5, #afb2be);
		}
	}
`;

const Icon = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: ${rem("24px")};
	height: ${rem("24px")};
	border-radius: ${rem("24px")};
	box-shadow: 0 0 16px 2px var(--color-gray0, #f9f9fa);

	svg {
		display: block;
		width: ${rem("24px")};
		height: ${rem("24px")};
		position: relative;
		left: 50%;
		top: 50%;
		margin-left: ${rem("-12px")};
		margin-top: ${rem("-12px")};
	}
	/* Force Hardware Acceleration in WebKit */
	-webkit-transform: translateZ(0);
	-webkit-backface-visibility: hidden;

	.icon {
		&.is-hidden {
			visibility: hidden;
		}
		&.bounce-in {
			visibility: visible;
			animation-name: ${CdBounce1};
			animation-duration: 600ms;
			animation-timing-function: var(--default-timing-function);
		}
	}

	${above.large`
		width: ${rem("28px")};
		height: ${rem("28px")};
		left: 50%;
		margin-left: ${rem("-16px")};
	`};
`;

const Content = styled.div`
	position: relative;
	margin-left: ${rem("60px")};
	background: rgba(255, 255, 255, 0.05);
	border-radius: ${rem("4px")};
	padding: ${rem("16px")};
	border: var(--color-gray2, #dfe0e5);
	box-shadow: 0 4px 24px var(--color-gray2, #dfe0e5);

	&:hover,
	&:active,
	&:focus {
		background-color: var(--color-white, #ffffff);
	}

	&.is-hidden {
		visibility: hidden;
	}
	&.bounce-in {
		visibility: visible;
		animation-name: ${CdBounce2Inverse};
	}

	&:after {
		content: "";
		display: table;
		clear: both;
	}
	h2 {
		color: var(--color-gray7, #82889b);
	}
	p {
		font-size: ${rem("11px")};
		text-transform: uppercase;
		font-weight: 500;
		color: var(--color-gray5, #afb2be);
		margin: ${rem("16px")} 0 0;
		line-height: 1.6;
	}

	.date {
		font-size: ${rem("12px")};
		font-weight: 500;
		color: var(--color-gray4, #c0c3cc);
		display: inline-block;
		float: left;
		padding: ${rem("12.8px")} 0;
		opacity: ${rem("11.2px")};
	}

	.title,
	.subtitle {
		margin: 0;
	}

	.title {
		font-size: ${rem("20px")};
		font-weight: 400;
		color: var(--color-gray9, #3a3e4c);
	}

	.subtitle {
		font-family: var(--body-font-family);
		font-size: ${rem("16px")};
		text-transform: capitalize;
		color: var(--color-gray8, #646b82);
	}

	${above.medium`
		h2 {
			font-size: ${rem("20px")};
		}
		p {
			font-size: ${rem("12px")};
		}
		.date {
			font-size: ${rem("14px")};
		}
	`};

	${above.large`
		margin-left: 0;
		padding: ${rem("24px")};
		width: 40%;
		&: {
			top: ${rem("24px")};
			left: 100%;
			border-color: transparent;
			border-left-color: ${lighten(0.05, "#030304")};
		}
		.date {
			position: absolute;
			width: 100%;
			left: 142%;
			top: ${rem("6px")};
			font-size: ${rem("16px")};
		}
	`};
`;

export default VerticalTimelineElement;
