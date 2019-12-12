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

const PageTitle: React.FunctionComponent<IPageTitleProps> = ({ title, subtitle, children, center, isProject }) => {
	useEffect(() => {
		const parallax: HTMLElement | null = document.querySelector(".parallax");
		const speed = -0.5;

		if (parallax) {
			parallax.style.transform = "translateY( calc( var(--scrollparallax) * 1px ) )";
		}

		/**
		 * Sets the scroll parallax
		 */
		function setScrollParallax() {
			if (parallax) {
				const value = (document.body.scrollTop || document.documentElement.scrollTop) * speed;
				parallax.style.setProperty("--scrollparallax", `${value}`);
			}

			window.requestAnimationFrame(setScrollParallax);
		}

		window.requestAnimationFrame(setScrollParallax);
	}, []);

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
