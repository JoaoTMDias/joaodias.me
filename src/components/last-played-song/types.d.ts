export interface IExternalServiceSongs {
	recenttracks: IRecenttracks;
}

export interface IRecenttracks {
	"@attr": IAttr;
	track: ITrack[];
}

export interface IAttr {
	page: string;
	perPage: string;
	user: string;
	total: string;
	totalPages: string;
}

export interface ITrack {
	artist: IAlbum;
	album: IAlbum;
	image: IImage[];
	streamable: string;
	date: IDateClass;
	url: string;
	name: string;
	mbid: string;
}

export interface IAlbum {
	mbid: string;
	"#text": string;
}

export interface IDateClass {
	uts: string;
	"#text": string;
}

export interface IImage {
	size: "extralarge" | "large" | "medium" | "small";
	"#text": string;
}
