/**
 * Libraries
 */
import React from "react";
import { useSpring, animated, config } from "react-spring";
import { Hero, Wrapper, Subtitle, Text } from "./styles";
import HelloAnimation from "../hello";

const from = {
	opacity: 0,
	transform: "translate3d(0, 1.5rem, 0)",
};

const to = {
	opacity: 1,
	transform: "translate3d(0,0,0)",
};

/**
 * Full Page Hero
 */
export const HomePageHero: React.FunctionComponent = () => {
	const animationProps = useSpring({
		from,
		to,
		config: {
			...config.stiff,
			delay: 1000,
		},
	});

	const AnimatedSubtitle = animated(Subtitle);
	const text = "I am João, a frontend developer and designer.";

	return (
		<Hero className="layout__row utilities--above-the-fold">
			<Wrapper>
				<HelloAnimation />
				<Text>
					<AnimatedSubtitle style={animationProps}>{text}</AnimatedSubtitle>
				</Text>
			</Wrapper>
		</Hero>
	);
};

export default HomePageHero;
