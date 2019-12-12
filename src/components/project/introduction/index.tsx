// Libraries
import React from "react";
import { useSpring, animated } from "react-spring";
import { IProjectIntroductionProps } from "./types";
import { Wrapper } from "./styles";

/** ********
 ** Component: ProjectIntroduction
 ** @type: functional stateless component
 ** @description: Project Intro section
 ********* */
const from = {
	opacity: 0,
	transform: "translate3d(0, 1.5rem, 0)",
};

const to = {
	opacity: 1,
	transform: "translate3d(0,0,0)",
};

/**
 *
 *
 * @export
 * @param {IProjectIntroductionProps} props
 * @returns {JSX.Element}
 */
export const ProjectIntroduction: React.FunctionComponent<IProjectIntroductionProps> = ({
	title,
	description,
	text,
}): JSX.Element => {
	const animationProps = useSpring({
		from,
		to,
		config: {
			delay: 0,
		},
	});
	if (typeof document !== "undefined") {
		const pageTitle: HTMLHeadingElement | null = document.querySelector(".title");
		if (pageTitle) {
			pageTitle.focus();
		}
	}

	return (
		<Wrapper className="layout__row utilities--above-the-fold">
			<div className="layout__project layout__hero">
				<animated.h1 className="title" aria-label={`${title}`} style={{ ...animationProps, config: { delay: 300 } }}>
					{title}
				</animated.h1>
				<animated.h2
					className="description"
					aria-label={`${description}`}
					style={{ ...animationProps, config: { delay: 550 } }}
				>
					{description}
				</animated.h2>
				<animated.p className="lead" aria-label={`${text}`} style={{ ...animationProps, config: { delay: 850 } }}>
					{text}
				</animated.p>
			</div>
		</Wrapper>
	);
};

ProjectIntroduction.defaultProps = {
	title: "title",
	description: "description",
	text: "text",
};

export default ProjectIntroduction;
