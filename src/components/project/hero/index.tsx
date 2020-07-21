// Libraries
import React, { useState, useEffect } from "react";
import supportsWebP from "supports-webp";
import { Masthead, BackgroundImage } from "./styles";
import { IProjectHeroProps } from "./types";

const ProjectHero: React.FunctionComponent<IProjectHeroProps> = ({ id, backgroundImage: file }) => {
	const [supports, setSupport] = useState(false);

	useEffect(() => {
		/**
		 * Gets the support for WebP images in the browser
		 */
		async function getSupportForWebP() {
			const result = await supportsWebP;

			setSupport(result);
		}

		getSupportForWebP();
	}, []);

	return (
		<Masthead id={id}>
			<BackgroundImage supports={supports} file={file} />
		</Masthead>
	);
};

export default ProjectHero;
