// Libraries
import React from "react";

// Services
import { LastPlayedSongCard } from "./last-played-song-card";
import { LastPlayedSongTitle } from "./styles";
import { ITrack } from "./types";
import { LAST_FM_URL } from "../../data/services/config";
import { useAsyncHook } from "../../helpers";

/**
 * Retrieves info from Last.fm and displays on the widget
 *
 * @export
 * @returns {JSX.Element[] | null}
 */
export const LastPlayedSong = () => {
	const [result, loading] = useAsyncHook(LAST_FM_URL);

	/**
	 * Renders the last played song
	 *
	 * @returns
	 */
	function renderLastPlayedSong() {
		if (result) {
			const song = result as ITrack;
			return <LastPlayedSongCard key={song.name} song={song} />;
		}

		return null;
	}

	if (loading) {
		return null;
	}

	return (
		<section id="last-played-song" className="layout__container layout__section">
			<div className="layout__row">
				<LastPlayedSongTitle>Currently listening to...</LastPlayedSongTitle>
				{renderLastPlayedSong()}
			</div>
		</section>
	);
};

export default LastPlayedSong;
