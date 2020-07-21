export interface IAboutPage {
	data: Data;
}

export interface Data {
	allContentfulAsset: AllContentfulAsset;
	allContentfulSkills: AllContentfulSkills;
}

export interface AllContentfulAsset {
	edges: AllContentfulAssetEdge[];
}

export interface AllContentfulAssetEdge {
	node: PurpleNode;
}

export interface PurpleNode {
	id: string;
	title: string;
	description: string;
	fluid: Fluid;
}

export interface Fluid {
	src: string;
	srcSet: string;
	srcWebp: string;
	srcSetWebp: string;
	sizes: string;
	aspectRatio: number;
}

export interface AllContentfulSkills {
	edges: AllContentfulSkillsEdge[];
}

export interface AllContentfulSkillsEdge {
	node: FluffyNode;
}

export interface FluffyNode {
	id: string;
	title: string;
	description: string;
	backgroundColor: string;
	icon: Icon;
}

export interface Icon {
	file: File;
	title: string;
	description: string;
}

export interface File {
	url: string;
	contentType: string;
}
