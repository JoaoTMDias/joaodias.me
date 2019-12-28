import { FluidObject } from "gatsby-image";

export interface IPortfolioItemProps {
	fluid?: FluidObject | FluidObject[];
	id: string;
	to: string;
	alt: string;
	theme: string;
	color: string;
	type: string;
	title: string;
	description: string;
	loading: "auto" | "lazy" | "eager";
}
