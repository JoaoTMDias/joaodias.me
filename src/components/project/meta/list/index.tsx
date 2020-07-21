// Libraries
import React from "react";

// Components
// import Component from '../components/componentName';

// Styling
import { List, Item } from "./styles";
import { IProjectMetaListProps } from "../types";

/**
 * List of metadata for a skill or tool
 *
 * @export
 * @param {IProjectMetaListProps} props
 * @returns {JSX.Element}
 */
const ProjectMetaList: React.FunctionComponent<IProjectMetaListProps> = ({ title, children }) => {
	return (
		<List>
			<Item>{title}</Item>
			{children}
		</List>
	);
};

export default ProjectMetaList;
