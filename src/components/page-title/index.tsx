/**
 * Import Libraries
 */
import React from "react";
import classnames from "classnames";
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
	backgroundColor,
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

	const rowClassNames = classnames("layout__row", "parallax", {
		isCenter: center,
		isProject,
	});
	const classNames = center ? "isCenter" : "";

	return (
		<Container className="layout__container layout__container layout__section utilities--above-the-fold">
			<Row
				data-testid="row"
				className={rowClassNames}
				center={center}
				isProject={isProject}
				backgroundColor={backgroundColor}
			>
				<AnimatedTitle
					data-testid="title"
					classNames={classNames}
					center={center}
					isProject={isProject}
					aria-label={`Page Title: ${title}`}
					style={animatedProps}
				>
					{title}
				</AnimatedTitle>
				<AnimatedSubtitle
					data-testid="subtitle"
					classNames={classNames}
					center={center}
					aria-label={`Page Subtitle: ${subtitle}`}
					tabIndex={0}
					style={animatedProps}
				>
					{subtitle}
				</AnimatedSubtitle>
			</Row>
			{children}
		</Container>
	);
};

export default PageTitle;
