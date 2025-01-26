/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
export interface ExternalServiceSongs {
	recenttracks: Recenttracks;
}

export interface Recenttracks {
	"@attr": Attr;
	track: Track[];
}

export interface Attr {
	page: string;
	perPage: string;
	user: string;
	total: string;
	totalPages: string;
}

export interface Track {
	artist: Album;
	album: Album;
	image: Image[];
	streamable: string;
	date: DateClass;
	url: string;
	name: string;
	mbid: string;
}

export interface Album {
	mbid: string;
	"#text": string;
}

export interface DateClass {
	uts: string;
	"#text": string;
}

export interface Image {
	size: "extralarge" | "large" | "medium" | "small";
	"#text": string;
}
