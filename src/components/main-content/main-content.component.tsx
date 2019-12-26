// Libraries
import * as React from "react";

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
const MainContent: React.FunctionComponent<IMainContentProps> = ({ children, className }) => {
	return (
		<div id="main-content" className={className}>
			{children}
		</div>
	);
};

export default MainContent;
