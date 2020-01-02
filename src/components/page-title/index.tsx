/**
 * Import Libraries
 */
import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Container, Row, Title, Subtitle } from "./styles";
import { IPageTitleProps } from "./types";

const from = {
	opacity: 0,
	transform: "translate3d(0, 1rem, 0)",
};

const to = {
	opacity: 1,
	transform: "translate3d(0,0,0)",
};

export const PageTitle: React.FunctionComponent<IPageTitleProps> = ({
	title,
	subtitle,
	children,
	center,
	isProject,
}) => {
	const animatedProps = useSpring({
		from,
		to,
		config: {
			delay: 100,
		},
	});

	const AnimatedTitle = animated(Title);
	const AnimatedSubtitle = animated(Subtitle);

	return (
		<Container className="layout__container layout__container layout__section utilities--above-the-fold">
			<Row className="layout__row parallax" center={center} isProject={isProject}>
				<AnimatedTitle center={center} isProject={isProject} aria-label={`Page Title: ${title}`} style={animatedProps}>
					{title}
				</AnimatedTitle>
				<AnimatedSubtitle center={center} aria-label={`Page Subtitle: ${subtitle}`} tabIndex="0" style={animatedProps}>
					{subtitle}
				</AnimatedSubtitle>
			</Row>
			{children}
		</Container>
	);
};

export default PageTitle;
