// Libraries
import * as React from "react";
import { useSpring, animated } from "react-spring";

// Component Props
interface IMainContentProps {
	className: string;
	children: any;
}

const from = {
	opacity: 0,
	transform: "translate3d(0, 3rem, 0)",
};

const to = {
	opacity: 1,
	transform: "translate3d(0,0,0)",
};

/**
 * @description MainContent Component
 * @author  João Dias
 * @date  01/December/2018 at 17:41
 * @extends {React.FunctionComponent}
 */
const MainContent: React.FunctionComponent<IMainContentProps> = ({ children, className }) => {
	const animationProps = useSpring({
		from,
		to,
	});

	return (
		<animated.div id="main-content" className={`${className}`} style={animationProps}>
			{children}
		</animated.div>
	);
};

export default MainContent;
