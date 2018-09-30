// Libraries
import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rem } from 'polished';

/** ********
 ** Component: FooterCopyright
 ** @type: functional stateless component
 ** @description: Copyright on Bottom
 ********* */
const FooterContent = () => (
  <Wrapper className="l__container">
    <div className="l__row">
      <div className="left">
        <ul className="list">
          <li className="item">
            <Link to="/">
Homepage
            </Link>
          </li>
          <li className="item">
            <Link to="/about/">
About
            </Link>
          </li>
          <li className="item">
            <Link to="/contact/">
Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="right">
        <ul className="list">
          <li className="item">
            <Link to="/privacy-policy/">
Privacy Policy
            </Link>
          </li>
          <li className="item">
            <p>
              {new Date().getFullYear()}
              {' '}
&copy; João Dias. All Rights Reserved
            </p>
          </li>
        </ul>
      </div>
    </div>
  </Wrapper>
);

// Styled
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${props => props.theme.white};
  height: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-top: ${props => props.theme.globalPadding};
  padding-bottom: ${props => props.theme.globalPadding};

  margin-top: ${rem('48px')} !important;
  margin-right: auto;
  margin-bottom: 0;
  margin-left: auto;

  .l__row {
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    flex-direction: column;
    display: flex;
    margin-bottom: ${props => props.theme.navbarHeight};

    @media ${props => props.theme.breakpointMedium} {
      flex-direction: row;
      margin-bottom: 0;
    }
  }

  .left {
    color: ${props => props.theme.gray8};
    text-align: center;
    justify-content: center;

    @media ${props => props.theme.breakpointLarge} {
      text-align: left;
      justify-content: flex-start;
    }
  }

  .right {
    flex-direction: column;
    text-align: center;

    @media ${props => props.theme.breakpointLarge} {
      text-align: right;
      align-items: flex-end;
    }
  }

  .left,
  .right {
    font-family: ${props => props.theme.bodyFontFamily};
    letter-spacing: 0;
    text-align: center;
    font-size: ${rem('12px')};
    margin-top: ${props => props.theme.globalMargin};
    margin-bottom: ${props => props.theme.globalMargin};
    width: 100%;
    display: flex;

    @media ${props => props.theme.breakpointMedium} {
      width: 50%;
    }

    a,
    p {
      line-height: ${rem('48px')};
      width: 100%;

      @media ${props => props.theme.breakpointMedium} {
        line-height: ${rem('64px')};
      }
    }

    a {
      color: ${props => props.theme.gray9};
    }

    p {
      color: ${props => props.theme.gray6};
      flex-wrap: wrap;
    }

    li {
      margin-left: ${props => props.theme.globalMargin};
      margin-right: ${props => props.theme.globalMargin};
    }
  }

  .list {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0;

    @media ${props => props.theme.breakpointLarge} {
      flex-direction: row;
    }

    .item {
      flex-wrap: wrap;
      color: ${props => props.theme.gray8};

      a {
        color: ${props => props.theme.gray8};
      }
    }
  }
`;

export default FooterContent;