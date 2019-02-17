// Libraries
import * as React from 'react';
import { Spring } from 'react-spring/renderprops';

// Component Props
interface IMainContentProps {
  className: string;
  children: any;
}

/**
 * @description MainContent Component
 * @author  João Dias
 * @date  01/December/2018 at 17:41
 * @extends {React.FunctionComponent}
 */
const MainContent: React.FunctionComponent<IMainContentProps> = props => {
  const from = {
    opacity: 0,
    transform: `translate3d(0, 3rem, 0)`,
  };

  const to = {
    opacity: 1,
    transform: `translate3d(0,0,0)`,
  };

  const { children, className } = props;
  return (
    <Spring from={from} to={to}>
      {animationProps => {
        return (
          <div id="main-content" className={`${className}`} style={animationProps}>
            {children}
          </div>
        );
      }}
    </Spring>
  );
};

export default MainContent;
