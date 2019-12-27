// Libraries
import * as React from "react";

// Component Props
interface IMainContentProps {
	style?: React.CSSProperties;
	className?: string;
}

/**
 * @description MainContent Component
 * @author  João Dias
 * @date  01/December/2018 at 17:41
 * @extends {React.FunctionComponent}
 */
export const MainContent: React.FunctionComponent<IMainContentProps> = ({ children, className, style }) => {
	return (
		<div id="main-content" className={className} style={style}>
			{children}
		</div>
	);
};

export default MainContent;
