/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */

import { FunctionComponent } from "react";
import { Track } from "../../../typings/index";
import styles from "./styles.module.scss";

/**
 * Last Played Song Card
 */
export const LastPlayedSongCard: FunctionComponent<{
  song: Track;
}> = ({ song }) => {
  return (
    <div className={styles.container}>
      <img
        src={song.image[2]["#text"]}
        width="32"
        height="32"
        alt={`${song.album["#text"]} cover`}
        loading="lazy"
      />

      <p className={styles.info}>
        <a className={styles.track} href={song.url} target="_blank" data-testid="last-played-title">
          {song.name}
          <span className="sr-only">. This link will open in a new tab</span>
        </a>
        <span className="sr-only">by</span>
        <span className={styles.artist} role="presentation" aria-hidden="true">
          ♠
        </span>
        <span className={styles.artist} data-testid="last-played-artist">
          {song.artist["#text"]}
        </span>
        <span className="sr-only">from the</span>
        <span className={styles.artist} role="presentation" aria-hidden="true">
          ♣
        </span>
        <span className={styles.album} data-testid="last-played-album">
          {song.album["#text"]}
        </span>
        <span className="sr-only">record</span>
      </p>
    </div>
  );
};

export default LastPlayedSongCard;
