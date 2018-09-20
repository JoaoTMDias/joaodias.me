// Libraries
import React from 'react';
import styled from 'styled-components';

// Styled Components
const Aside = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media ${props => props.theme.breakpointMedium} {
    flex-direction: row;
  }
`;

/** ********
 ** Component: HomePageLatest
 ** @type: functional stateless component
 ** @description:  componentDescription
 ********* */
const HomePageLatest = props => <Aside className="l__row">{props.children}</Aside>;

export default HomePageLatest;
