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
