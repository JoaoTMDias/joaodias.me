/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import type { Track } from "../../typings/index";
import styles from "./styles.module.scss";

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

const RECORD_SIZE_FACTOR = 0.875; // 87.5% of the cover size
const RECORD_DISTANCE_RIGHT_SHIFT = 0.22;

/**
 * Last Played Song Card
 */
export const LastPlayedSongCard = ({
	song,
	playerConfig,
}: {
	song: Track;
	playerConfig?: PlayerConfig;
}) => {
	const { card = {}, track = "", artist = "", album = "" } = playerConfig ?? {};
	const width = Number.parseInt(card.width ?? "72", 10);
	const height = Number.parseInt(card.height ?? "72", 10);
	const coverImage = [...song.image].reverse().find((entry) => entry["#text"]?.trim())?.["#text"];
	const alt = `${song.name} by ${song.artist["#text"]} from the album ${song.album["#text"]}`;

	const coverStyles = {
		"--cover-width": `${width}px`,
		"--record-size-factor": `${RECORD_SIZE_FACTOR}`,
		"--record-distance-right-shift": `${RECORD_DISTANCE_RIGHT_SHIFT}`,
	} as React.CSSProperties;

	return (
		<div className={styles.container}>
			<div className={styles.cover} style={coverStyles}>
				<img
					className={styles.cover__image}
					src={coverImage}
					width={width}
					height={height}
					alt={alt}
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
					rel="noopener noreferrer"
				>
					{song.name}
					<span className="sr-only">{track}</span>
				</a>
				<span className="sr-only">by</span>
				<span className={styles.artist} data-testid="currently-listening-artist">
					{song.artist["#text"]}
				</span>
				<span className="sr-only">{artist}</span>
				<span className={styles.album} data-testid="currently-listening-album">
					{song.album["#text"]}
				</span>
				<span className="sr-only">{album}</span>
			</p>
		</div>
	);
};

export default LastPlayedSongCard;
