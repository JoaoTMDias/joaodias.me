/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import PAGE_CONTENT from "../../data/index.json";
import { FunctionComponent } from "react";
import { Track } from "../../typings/index";
import styles from "./styles.module.scss";

/**
 * Last Played Song Card
 */
export const LastPlayedSongCard: FunctionComponent<{
	song: Track;
}> = ({ song }) => {
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<img
					className={styles.cover__image}
					src={song.image[2]["#text"]}
					width={PAGE_CONTENT.footer.marquee.card.width}
					height={PAGE_CONTENT.footer.marquee.card.height}
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
					<span className="sr-only">{PAGE_CONTENT.footer.marquee.track}</span>
				</a>
				<span className="sr-only">by</span>
				<span className={styles.artist} aria-hidden="true">
					/
				</span>
				<span className={styles.artist} data-testid="currently-listening-artist">
					{song.artist["#text"]}
				</span>
				<span className="sr-only">{PAGE_CONTENT.footer.marquee.artist}</span>
				<span className={styles.artist} aria-hidden="true">
					/
				</span>
				<span className={styles.album} data-testid="currently-listening-album">
					{song.album["#text"]}
				</span>
				<span className="sr-only">{PAGE_CONTENT.footer.marquee.album}</span>
			</p>
		</div>
	);
};

export default LastPlayedSongCard;
