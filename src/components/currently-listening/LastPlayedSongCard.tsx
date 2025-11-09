/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import type { FunctionComponent } from "react";
import type { Track } from "../../typings/index";
import styles from "./styles.module.scss";

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

/**
 * Last Played Song Card
 */
export const LastPlayedSongCard: FunctionComponent<{
	song: Track;
	marqueeConfig: IMarqueeConfig;
}> = ({ song, marqueeConfig }) => {
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<img
					className={styles.cover__image}
					src={song.image[2]["#text"]}
					width={marqueeConfig.card.width}
					height={marqueeConfig.card.height}
					alt={`${song.album["#text"]} cover`}
					loading="lazy"
					data-testid="currently-listening-album-cover"
				/>
			</div>
			<p className={styles.info}>
				<a
					className={`${styles.track} tooltip`}
					href={song.url}
					target="_blank"
					data-tooltip="View song on Last.fm"
					data-testid="currently-listening-song"
				>
					{song.name}
					<span className="sr-only">{marqueeConfig.track}</span>
				</a>
				<span className="sr-only">by</span>
				<span className={styles.artist} aria-hidden="true">
					/
				</span>
				<span className={styles.artist} data-testid="currently-listening-artist">
					{song.artist["#text"]}
				</span>
				<span className="sr-only">{marqueeConfig.artist}</span>
				<span className={styles.artist} aria-hidden="true">
					/
				</span>
				<span className={styles.album} data-testid="currently-listening-album">
					{song.album["#text"]}
				</span>
				<span className="sr-only">{marqueeConfig.album}</span>
			</p>
		</div>
	);
};

export default LastPlayedSongCard;
