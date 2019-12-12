import { FluidObject } from "gatsby-image";

export interface IPortfolioItemProps {
	cover: FluidObject;
	id: string;
	to: string;
	alt: string;
	theme: string;
	color: string;
	type: string;
	title: string;
	description: string;
}
