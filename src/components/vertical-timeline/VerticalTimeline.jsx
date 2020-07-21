import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { rem } from "polished";
import { above } from "../../helpers/media-queries.helper";
import { theme } from "../../helpers/theme.helper";

const VerticalTimeline = ({ children }) => <Wrapper className="vertical-timeline--animate">{children}</Wrapper>;

// Styled Components
const Wrapper = styled.div`
	--vertical-line-background: var(--color-gray2, #dfe0e5);
	width: 95%;
	max-width: ${rem("1170px")};
	margin-top: ${rem("32px")};
	margin-right: auto;
	margin-bottom: ${rem("32px")};
	margin-left: auto;
	position: relative;
	padding: ${rem("32px")} 0;

	&:after {
		content: "";
		display: table;
		clear: both;
	}

	&:before {
		content: "";
		position: absolute;
		top: 0;
		left: ${rem("12px")};
		height: 100%;
		width: ${rem("2px")};
		background-color: var(--vertical-line-background);
	}

	${above.large`
    margin-top: ${rem("48px")};
    margin-bottom: ${rem("48px")};
    width: 90%;
    &:before {
      left: 50%;
      margin-left: ${rem("-2px")};
    }
	`};

	${theme.dark`
			--vertical-line-background: var(--color-gray10);
	`}
`;

VerticalTimeline.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default VerticalTimeline;
