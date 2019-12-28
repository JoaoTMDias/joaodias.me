import { FluidObject } from "gatsby-image";

export interface IIndexPageProps {
	location: Location;
	data: IIndexPageData;
}

export interface IIndexPageData {
	allContentfulPortfolio: IIndexPageAllContentfulPortfolio;
}

export interface IIndexPageAllContentfulPortfolio {
	edges: IIndexPageEdge[];
}

export interface IIndexPageEdge {
	node: IIndexPageNode;
}

export interface IIndexPageNode {
	id: string;
	slug: string;
	title: string;
	description: IIndexPageDescription;
	color: string;
	featuredImage: IIndexPageFeaturedImage;
	theme: string;
	date: string;
	category: IIndexPageCategory[] | null;
}

export interface IIndexPageCategory {
	title: string;
}

export interface IIndexPageDescription {
	description: string;
}

export interface IIndexPageFeaturedImage {
	id: string;
	title: string;
	fluid: FluidObject | FluidObject[];
	description: string;
}
