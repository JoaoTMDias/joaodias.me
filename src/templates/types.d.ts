export interface IProjectPageProps {
	data: IData;
}

export interface IData {
	contentfulPortfolio: IContentfulPortfolio;
}

export interface IContentfulPortfolio {
	id: string;
	slug: string;
	title: string;
	introduction: IIntroduction;
	description: IDescription;
	featuredImage: IFeaturedImage;
	skills: string[];
	tools: string[];
	client: string;
	date: string;
	body: IBody;
}

export interface IBody {
	id: string;
	childMarkdownRemark: IChildMarkdownRemark;
}

export interface IChildMarkdownRemark {
	html: string;
	timeToRead: number;
}

export interface IDescription {
	description: string;
}

export interface IFeaturedImage {
	file: IFile;
	description: string;
}

export interface IFile {
	url: string;
}

export interface IIntroduction {
	internal: IInternal;
}

export interface IInternal {
	content: string;
	contentDigest: string;
}
