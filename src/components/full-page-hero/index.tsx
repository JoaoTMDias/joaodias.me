/**
 * Libraries
 */
import React from "react";
import { Hero, Wrapper, Subtitle, Text } from "./styles";
import HelloAnimation from "../hello";

/**
 * Full Page Hero
 */
export const HomePageHero: React.FunctionComponent = () => {
	const text = "I am João, a frontend developer and designer.";

	return (
		<Hero className="layout__row utilities--above-the-fold">
			<Wrapper>
				<HelloAnimation />
				<Text>
					<Subtitle>{text}</Subtitle>
				</Text>
			</Wrapper>
		</Hero>
	);
};

export default HomePageHero;
