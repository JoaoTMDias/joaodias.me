// Libraries
import React from 'react';
import PropTypes from 'prop-types';

/**********
 ** Component: A11yPageTitle
 ** @type: functional stateless component
 ** @description: Accessible Page Title for Reach Router
 **********/
const A11yPageTitle = ({ title }) => {
  return (
    <h1 id="page-title" className="show-for-screen-readers" role="status" aria-live="polite" aria-atomic="true">
      {`Page Title: ${title}`}
    </h1>
  );
};

A11yPageTitle.defaultProps = {
  title: `Page Title`,
};

A11yPageTitle.propTypes = {
  title: PropTypes.string,
};

export default A11yPageTitle;