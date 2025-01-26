export interface SelectedProjects {
	title?: string;
	copyright?: string;
	header?: Header;
	hero?: Hero;
	about?: About;
	work?: Work;
	footer?: Footer;
}

export interface About {
	title?: string;
	intro?: Intro;
	skills?: Skills;
	bio?: Bio;
	experience?: Experience;
}

export interface Bio {
	title?: string;
	"bio-picture"?: Picture;
	mainTitle?: string;
	description?: string[];
}

export interface Picture {
	src?: string;
	width?: string;
	height?: string;
	alt?: string;
}

export interface Experience {
	title?: string;
	currently?: Currently;
	past?: Currently;
	download?: Download;
}

export interface Currently {
	title?: string;
	items?: Item[];
}

export interface Item {
	title?: string;
	description?: string;
	duration?: Duration;
	location?: string;
}

export interface Duration {
	from?: string;
	to?: string;
}

export interface Download {
	href?: string;
	download?: string;
	label?: string;
	text?: string;
}

export interface Intro {
	title?: string;
	subtitle?: string;
	mainTitle?: Logo;
	"currently-at"?: CurrentlyAt;
}

export interface CurrentlyAt {
	href?: string;
	text?: string;
}

export interface Logo {
	"title-first"?: string;
	"title-name"?: string;
	"title-second"?: string;
	"title-location"?: string;
}

export interface Skills {
	title?: string;
	items?: string[];
}

export interface Footer {
	title?: string;
	marquee?: Marquee;
	"social-media"?: SocialMedia;
}

export interface SocialMedia {
	title?: string;
	instagram?: Channel;
	github?: Channel;
	twitter?: Channel;
	linkedin?: Channel;
}

export interface Channel {
	label?: string;
	tooltip?: string;
}

export interface Marquee {
	loading?: string;
	card?: Card;
	track?: string;
	artist?: string;
	album?: string;
}

export interface Card {
	width?: string;
	height?: string;
}

export interface Header {
	links?: Link[];
	logo?: Logo;
	"main-navigation"?: Download[];
}

export interface Link {
	target?: string;
	text?: string;
	as?: string;
}

export interface Hero {
	"profile-picture"?: Picture;
	copyright?: string;
}

export interface Work {
	title?: string;
	description?: string;
	data?: WorkData[];
}

export interface WorkData {
	id?: string;
	title?: string;
	shortDescription?: string;
	thumbnail?: Thumbnail;
	theme?: Theme;
	skills?: string[];
	details?: Details;
}

export interface Details {
	date?: string;
	description?: string;
	cover?: Thumbnail;
	sourceCode?: string;
	problem?: string[];
	solution?: string[];
	photos?: Thumbnail[];
}

export interface Thumbnail {
	src?: string;
	width?: number;
	height?: number;
	alt?: string;
	"data-background"?: string;
}

export interface Theme {
	background?: string;
	foreground?: string;
}
