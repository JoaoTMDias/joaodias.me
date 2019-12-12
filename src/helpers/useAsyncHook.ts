import React from "react";
import ExternalServices from "../data/services/external-services";
import { ITrack } from "../components/last-played-song/types";

const FIRST_SONG = 1;

export type IUserAsyncHookResult = ITrack | null;
export type IUserAsyncHookLoading = boolean | null;

/**
 *
 *
 * @param {string} url
 * @returns {(boolean | ITrack[] | null)[]}
 */
export function useAsyncHook(url: string) {
	const [result, setResult] = React.useState<IUserAsyncHookResult>(null);
	const [loading, setLoading] = React.useState<IUserAsyncHookLoading>(false);

	React.useEffect(() => {
		async function fetchLatestSong() {
			try {
				setLoading(true);
				const response = await ExternalServices.getLatestSong(url);
				const { data } = await response;
				const { recenttracks } = data;
				const song = recenttracks.track.slice(0, FIRST_SONG)[0];

				setResult(song);
				setLoading(false);
			} catch (error) {
				setLoading(null);
			}
		}

		if (url !== "") {
			fetchLatestSong();
		}
	}, [url]);

	return [result, loading];
}
