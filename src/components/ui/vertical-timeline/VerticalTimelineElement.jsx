import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rem, lighten } from 'polished';

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
    tabIndex="0"
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
  id: '',
  children: null,
  className: '',
  icon: null,
  iconStyle: null,
  style: null,
  date: '',
  position: '',
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
  margin: ${rem('32px')} 0;

  &:after {
    content: '';
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
    outline-color: var(--color-gray6);
    outline-width: 1px;
    outline-style: dashed;
    outline-offset: -1px;
  }

  @media ${props => props.theme.breakpointLarge} {
    margin: ${rem('64px')} 0;

    &:nth-child(even):not(.left) .content,
    &.right .content {
      float: right;
    }
    &:nth-child(even):not(.left) .content::before,
    &.right .content::before {
      top: ${rem('24px')};
      left: auto;
      right: 100%;
      border-color: transparent;
      border-right-color: ${props => lighten(0.05, props.theme.colorGray9)};
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
  }

  &.type {
    &--work {
      &:first-child {
        .icon {
          background-image: linear-gradient(
            ${props => lighten(0.3, props.theme.colorGray9)},
            ${props => lighten(0.15, props.theme.colorGray9)}
          );
        }
      }
      .icon {
        background-image: linear-gradient(
          ${props => lighten(0.15, props.theme.colorGray9)},
          ${props => lighten(0.075, props.theme.colorGray9)}
        );
      }
    }
    &--education {
      .icon {
        background-image: linear-gradient(
          ${props => lighten(0.05, props.theme.colorGray9)},
          ${props => lighten(0.025, props.theme.colorGray9)}
        );
      }
    }
    &--work,
    &--education {
      color: var(--color-white);
    }
  }
`;

const Icon = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${rem('40px')};
  height: ${rem('40px')};
  border-radius: ${rem('40px')};
  box-shadow: 0 0 8px 8px rgba(70, 61, 61, 0.2), inset 0 2px 0 rgba(120, 104, 104, 0.4),
    0 3px 3px 4px rgba(152, 132, 132, 0.1) svg {
    display: block;
    width: ${rem('24px')};
    height: ${rem('24px')};
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: ${rem('-12px')};
    margin-top: ${rem('-12px')};
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

  @media ${props => props.theme.breakpointLarge} {
    width: ${rem('60px')};
    height: ${rem('60px')};
    left: 50%;
    margin-left: ${rem('-30px')};
  }
`;

const Content = styled.div`
  position: relative;
  margin-left: ${rem('60px')};
  background: transparent;
  border-radius: ${rem('4px')};
  padding: ${rem('16px')};
  border: var(--color-gray9);
  box-shadow: 0 4px 16px rgb(74, 70, 70);

  &.is-hidden {
    visibility: hidden;
  }
  &.bounce-in {
    visibility: visible;
    ${CdBounce2Inverse};
  }

  &:after {
    content: '';
    display: table;
    clear: both;
  }
  h2 {
    color: var(--color-gray7);
  }
  p {
    font-size: ${rem('13px')};
    font-weight: 500;
    color: ${props => lighten(0.56, props.theme.colorGray9)};
  }

  p {
    margin: ${rem('16px')} 0 0;
    line-height: 1.6;
  }

  .date {
    font-size: ${rem('13px')};
    font-weight: 500;
    color: var(--color-white);
    display: inline-block;
    float: left;
    padding: ${rem('12.8px')} 0;
    opacity: ${rem('11.2px')};
  }

  .title,
  .subtitle {
    margin: 0;
  }

  .title {
    font-size: ${rem('20px')};
    font-weight: 400;
    color: ${props => lighten(0.8, props.theme.colorWhite)};
  }

  .subtitle {
    font-family: var(--body-font-family);
    font-size: ${rem('16px')};
    text-text-transform: uppercase;
    color: ${props => lighten(0.7, props.theme.colorGray9)};
  }

  @media ${props => props.theme.breakpointMedium} {
    h2 {
      font-size: ${rem('20px')};
    }
    p {
      font-size: ${rem('16px')};
    }
    .date {
      font-size: ${rem('14px')};
    }
  }

  @media ${props => props.theme.breakpointLarge} {
    margin-left: 0;
    padding: ${rem('24px')};
    width: 40%;
    &: {
      top: ${rem('24px')};
      left: 100%;
      border-color: transparent;
      border-left-color: ${props => lighten(0.05, props.theme.colorGray9)};
    }
    .date {
      position: absolute;
      width: 100%;
      left: 142%;
      top: ${rem('6px')};
      font-size: ${rem('16px')};
    }
  }
`;

export default VerticalTimelineElement;
