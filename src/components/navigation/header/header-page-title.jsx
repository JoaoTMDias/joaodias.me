// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

// Components
// import Component from '../components/componentName';

/**********
 ** Component: HeaderPageTitle
 ** @type: functional stateless component
 ** @description: Page Title for the header on fullscreen
 **********/
const HeaderPageTitle = props => {
  return <Title id="header-page-title">{`${props.title}`}</Title>;
};

const Title = styled.h2`
  display: none;
  justify-content: center;
  width: calc(100vw - ${rem('96px')});
  height: 100%;
  line-height: 1;
  text-align: center;
  margin: 0;
  color: var(--color-white, #ffffff);
`;

HeaderPageTitle.defaultProps = {
  title: 'Project Details',
};

HeaderPageTitle.propTypes = {
  title: PropTypes.string,
};

export default HeaderPageTitle;
