/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

import { useEffect, useState } from "react";
import { LAST_FM_URL } from "../../data/services/config";
import type { ExternalServiceSongs, Track } from "../../typings/index";
import LastPlayedSongCard from "./LastPlayedSongCard";

interface IMarqueeConfig {
	loading: string;
	card: {
		width: string;
		height: string;
	};
	track: string;
	artist: string;
	album: string;
}

interface ICurrentlyListeningProps {
	marqueeConfig: IMarqueeConfig;
}

async function getSong() {
	const request = await fetch(LAST_FM_URL);
	const data: ExternalServiceSongs = await request.json();
	const { recenttracks } = await data;

	return recenttracks.track.slice(0, 1)[0];
}

function CurrentlyListening({ marqueeConfig }: ICurrentlyListeningProps) {
	const [song, setSong] = useState<Track>(null);

	useEffect(() => {
		try {
			getSong().then((result) => {
				if (result) {
					setSong(result);
				}
			});
		} catch (error) {
			console.warn("Problems fetching the current song: ", error);
		}
	}, []);

	if (!song) {
		return <p>{marqueeConfig.loading}</p>;
	}

	return <LastPlayedSongCard key={song.name} song={song} marqueeConfig={marqueeConfig} />;
}

export default CurrentlyListening;
