// Libraries
import * as React from 'react';

// Component Props
interface IA11yPageTitleProps {
  title: string;
}

/**
 * @description Accessible Page Title for Reach Router
 * @author  João Dias
 * @date  29/November/2018 at 23:42
 * @extends {React.FunctionComponent}
 */
const A11yPageTitle: React.FunctionComponent<IA11yPageTitleProps> = props => {
  const { title } = props;
  return (
    <h1 id="page-title" className="show-for-screen-readers" role="status" aria-live="polite" aria-atomic="true">
      {`Page Title: ${title}`}
    </h1>
  );
};

A11yPageTitle.defaultProps = {
  title: `Page Title`,
};

export default A11yPageTitle;
