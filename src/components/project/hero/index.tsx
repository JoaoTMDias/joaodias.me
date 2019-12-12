// Libraries
import React from "react";
import { Masthead, BackgroundImage } from "./styles";
import { IProjectHeroProps } from "./types";

const ProjectHero: React.FunctionComponent<IProjectHeroProps> = ({ id, backgroundImage }) => {
	return (
		<Masthead id={id}>
			<BackgroundImage backgroundImage={backgroundImage} />
		</Masthead>
	);
};

export default ProjectHero;
