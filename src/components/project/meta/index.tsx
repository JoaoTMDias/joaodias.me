// Libraries
import React from "react";
import { Wrapper } from "./styles";
import ProjectMetaList from "./list";
import { IProjectMetaProps } from "./types";

/**
 * Project Meta
 *
 * @export
 * @param {IProjectMetaProps} props
 * @returns {JSX.Element}
 */
const ProjectMeta: React.FunctionComponent<IProjectMetaProps> = ({ skills, tools, client, date }) => {
	return (
		<Wrapper className="layout__project layout__section fadeInUp">
			<ProjectMetaList data-test="project-meta-list-skills" title="Skills">
				{skills.map((skill) => (
					<li key={skill} aria-label={`Skill: ${skill}`}>{`${skill}`}</li>
				))}
			</ProjectMetaList>
			<ProjectMetaList data-test="project-meta-list-tools" title="Tools">
				{tools.map((tool) => (
					<li key={tool} aria-label={`Tool: ${tool}`}>{`${tool}`}</li>
				))}
			</ProjectMetaList>
			<ProjectMetaList data-test="project-meta-list-date" title="Date">
				<li aria-label={`Date: ${date}`}>{`${date}`}</li>
			</ProjectMetaList>
			<ProjectMetaList data-test="project-meta-list-client" title="Client">
				<li aria-label={`Client: ${client}`}>{`${client}`}</li>
			</ProjectMetaList>
		</Wrapper>
	);
};

export default ProjectMeta;
