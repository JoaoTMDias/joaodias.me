// Libraries
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rem } from 'polished';

/**
 *  Large Navigation Menu
 *
 * @component LargeNavigation
 */
const LargeNavigation = () => (
  <Wrapper>
    <List>
      <Item>
        <Link to="/about/" activeClassName="active">
          About
        </Link>
      </Item>
      {/* <Item>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </Item> */}

      <Item>
        <Link to="/contact/" activeClassName="active">
          Contact
        </Link>
      </Item>
    </List>
  </Wrapper>
);

export default LargeNavigation;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex: 2;
  justify-content: center;
  align-self: center;
  max-height: ${props => props.theme.navbarHeight};
  width: auto;
`;

const List = styled.ul`
  justify-content: center;
  flex-direction: row;
  font-family: ${props => props.theme.bodyFontFamily};
  max-height: ${props => props.theme.navbarHeight};
  width: auto;
  display: none;
  visibility: hidden;
  margin: 0;

  @media ${props => props.theme.breakpointLarge} {
    display: flex;
    visibility: visible;
  }
`;

const Item = styled.li`
  display: inline-flex;
  list-style-type: none;
  line-height: ${rem('48px')};
  padding: 0;
  margin-top: 0;
  margin-right: ${rem('16px')};
  margin-bottom: 0;
  margin-left: ${rem('16px')};
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-wrap: wrap;
  min-width: ${rem('72px')};

  a {
    padding: 0;
    font-family: inherit;
    font-size: ${rem('12px')};
    color: ${props => props.theme.gray8};
    letter-spacing: ${rem('2px')};
    line-height: ${rem('48px')};
    text-transform: uppercase;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    display: flex;
    overflow: hidden;
    position: relative;

    &.active {
      color: ${props => props.theme.primaryColor};
      border-bottom: 2px dotted ${props => props.theme.primaryColor};
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.theme.alternateColor};
      transform: translate3d(-100%, 0, 0) translate3d(-1px, 0, 0);
      transition: transform 640ms;
      transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
    }

    &:hover,
    &:focus {
      color: ${props => props.theme.primaryColor};

      &:after {
        transform: translate3d(0%, 0, 0);
      }

      &:before {
        transform: translate3d(100%, 0, 0) translate3d(1px, 0, 0);
      }
    }

    &:active {
      outline: 1;
    }
  }
`;