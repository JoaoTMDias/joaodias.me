import React from "react";
import { render, cleanup } from "@testing-library/react";
import AlbumCover, { defaultProps } from "./album-cover";
import { LastPlayedSong } from "./last-played-song";
import { LastPlayedSongCard, ILastPlayedSongCardProps } from "./last-played-song-card";
import { IAlbumCoverProps } from "./styles";

afterEach(cleanup);

describe("<LastPlayedSong />", () => {
	it("should render without errors", () => {
		const component = render(<LastPlayedSong />);

		expect(component).toMatchSnapshot();
	});
});

describe("<LastPlayedSongCard />", () => {
	const props: ILastPlayedSongCardProps = {
		song: {
			artist: {
				mbid: "83b9cbe7-9857-49e2-ab8e-b57b01038103",
				"#text": "Pearl Jam",
			},
			album: {
				mbid: "",
				"#text": "Vault 9: Live in Seattle 12/8/93",
			},
			image: [
				{
					size: "small",
					"#text": "https://lastfm.freetls.fastly.net/i/u/34s/c6aaab6608ee5ed79cac652a7a3d3cd9.jpg",
				},
				{
					size: "medium",
					"#text": "https://lastfm.freetls.fastly.net/i/u/64s/c6aaab6608ee5ed79cac652a7a3d3cd9.jpg",
				},
				{
					size: "large",
					"#text": "https://lastfm.freetls.fastly.net/i/u/174s/c6aaab6608ee5ed79cac652a7a3d3cd9.jpg",
				},
				{
					size: "extralarge",
					"#text": "https://lastfm.freetls.fastly.net/i/u/300x300/c6aaab6608ee5ed79cac652a7a3d3cd9.jpg",
				},
			],
			streamable: "0",
			date: {
				uts: "1577995462",
				"#text": "02 Jan 2020, 20:04",
			},
			url: "https://www.last.fm/music/Pearl+Jam/_/Animal+(Live)",
			name: "Animal (Live)",
			mbid: "4c43b91a-5aba-4f1e-ac14-27f42df5c04d",
		},
	};

	it("should render without errors", () => {
		const component = render(<LastPlayedSongCard {...props} />);

		expect(component).toMatchSnapshot();
	});
});

describe("<AlbumCover />", () => {
	const props: IAlbumCoverProps = {
		...defaultProps,
		url: "https://www.last.fm/music/Pearl+Jam/_/Animal+(Live)",
		artist: "Pearl Jam",
		src: "https://lastfm.freetls.fastly.net/i/u/174s/c6aaab6608ee5ed79cac652a7a3d3cd9.jpg",
		name: "Animal (Live)",
		alt: "Album Cover for Vault 9: Live in Seattle 12/8/1993",
		width: defaultProps.width,
	};

	it("should render without errors", () => {
		const component = render(<AlbumCover {...props} />);

		expect(component).toMatchSnapshot();
	});
});
