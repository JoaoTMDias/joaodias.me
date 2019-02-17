import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

const VerticalTimeline = props => (
  <Wrapper className="vertical-timeline--animate">{props.children}</Wrapper>
);

// Styled Components
const Wrapper = styled.div`
  width: 95%;
  max-width: ${rem('1170px')};
  margin-top: ${rem('32px')};
  margin-right: auto;
  margin-bottom: ${rem('32px')};
  margin-left: auto;
  position: relative;
  padding: ${rem('32px')} 0;

  &:after {
    /* clearfix */
    content: '';
    display: table;
    clear: both;
  }
  &:before {
    /* this is the vertical line */
    content: '';
    position: absolute;
    top: 0;
    left: ${rem('18px')};
    height: 100%;
    width: ${rem('4px')};
    background: var(--color-black);
  }

  @media ${props => props.theme.breakpointLarge} {
    margin-top: ${rem('48px')};
    margin-bottom: ${rem('48px')};
    width: 90%;
    &:before {
      left: 50%;
      margin-left: ${rem('-2px')};
    }
  }
`;

VerticalTimeline.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default VerticalTimeline;
