// Libraries
import React from 'react';
import { Spring } from 'react-spring';

const from = {
  opacity: 0,
  transform: `translate3d(0, 3rem, 0)`,
};

const to = {
  opacity: 1,
  transform: `translate3d(0,0,0)`,
};

/** ********
 ** Component: MainContent
 ** @type: functional stateless component
 ** @description:  Main Content Page Wrapper
 ** ******* */
const MainContent = ({ children, className }) => {
  return (
    <Spring delay={750} from={from} to={to}>
      {props => {
        return (
          <div id="main-content" className={`${className}`} style={props}>
            {children}
          </div>
        );
      }}
    </Spring>
  );
};

export default MainContent;
