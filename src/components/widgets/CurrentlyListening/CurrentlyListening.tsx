/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LAST_FM_URL } from "../../../data/services/config";
import type { ExternalServiceSongs, Track } from "../../../typings/index";
import LastPlayedSongCard from "./LastPlayedSongCard";

interface PlayerConfig {
	loading?: string;
	card?: {
		width?: string;
		height?: string;
	};
	track?: string;
	artist?: string;
	album?: string;
}

interface ICurrentlyListeningProps {
	playerConfig?: PlayerConfig;
}

async function getSong() {
	const request = await fetch(LAST_FM_URL);
	const data: ExternalServiceSongs = await request.json();
	const { recenttracks } = data;

	return recenttracks.track.slice(0, 1)[0];
}

const FALLBACK_CONFIG: PlayerConfig = {
	loading: "Loading...",
	card: {
		width: "72",
		height: "72",
	},
	track: "",
	artist: "",
	album: "",
};

function CurrentlyListeningContent({ playerConfig }: ICurrentlyListeningProps) {
	const resolvedConfig = playerConfig ?? FALLBACK_CONFIG;
	const {
		data: song,
		isError,
		isLoading,
	} = useQuery<Track | undefined>({
		queryKey: ["current-song"],
		queryFn: getSong,
		retry: false,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <p aria-busy="true">{resolvedConfig.loading}</p>;
	}

	if (isError || !song) {
		return <p aria-busy="true">{resolvedConfig.loading}</p>;
	}

	return <LastPlayedSongCard key={song.name} song={song} playerConfig={resolvedConfig} />;
}

function CurrentlyListening({ playerConfig }: ICurrentlyListeningProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<CurrentlyListeningContent playerConfig={playerConfig} />
		</QueryClientProvider>
	);
}

export default CurrentlyListening;
