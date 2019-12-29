export interface IFluidObject {
	aspectRatio: number;
	src: string;
	srcSet: string;
	sizes: string;
	base64?: string;
	tracedSVG?: string;
	srcWebp?: string;
	srcSetWebp?: string;
	media?: string;
}
export interface IPortfolioItemProps {
	fluid?: IFluidObject | IFluidObject[];
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
