// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

// Components
import { responsiveTypography } from '../../../helpers/helpers';

/** ********
 ** Component: HomePageLatestCard
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
const HomePageLatestCard = props => (
  <Wrapper className="fadeInUp">
    <h3>{props.label}</h3>
    <Card
      href={props.href}
      title="Know more about this"
      target="_blank"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${props.background})`,
      }}
    >
      <h2>{props.title}</h2>
      <time dateTime={`${props.date}`}>{props.date}</time>
    </Card>
  </Wrapper>
);

HomePageLatestCard.defaultProps = {
  label: 'teste',
};

HomePageLatestCard.propTypes = {
  label: PropTypes.string,
};

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: ${rem('32px')};
  animation-timing-function: ${props => props.theme.easeOutBack};
  animation-duration: 500ms;
  &:first-child {
    margin-right: ${rem('24px')};
  }

  &:last-child {
    margin: 0;
    margin-bottom: ${rem('64px')};
  }
  @media ${props => props.theme.breakpointMedium} {
    width: calc(50% - ${props => props.theme.globalMargin});
    margin-bottom: 0;
  }

  h3 {
    font-family: ${props => props.theme.bodyFontFamily};
    color: ${props => props.theme.gray4};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: ${rem('8px')};

    ${responsiveTypography({
    minFont: 10,
    maxFont: 12,
    minWidth: 320,
    maxWidth: 1440,
  })};
  }
`;

const Card = styled.a`
  width: 100%;
  padding: ${rem('24px')};
  border: 1px solid ${props => props.theme.gray1};
  box-shadow: 0 1px 4px rgba(177, 177, 194, 0.4);
  display: flex;
  cursor: pointer;
  transition: all 500ms ${props => props.theme.easeOutExpo};
  transform: translate3d(0, 0, 0);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: ${rem('240px')};
  &:hover {
    opacity: 1;
    transform: scale(1.025);
  }

  @media ${props => props.theme.breakpointLarge} {
    height: ${rem('320px')};
  }

  h2 {
    ${responsiveTypography({
    minFont: 18,
    maxFont: 28,
    minWidth: 320,
    maxWidth: 1440,
  })};
  }

  time  {
    ${responsiveTypography({
    minFont: 12,
    maxFont: 16,
    minWidth: 320,
    maxWidth: 1440,
  })};
    opacity: 0.8;
  }

  h2,
  time {
    color: ${props => props.theme.white};
    text-transform: capitalize;
  }
`;

export default HomePageLatestCard;
