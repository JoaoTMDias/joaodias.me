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
        alt={`Album Cover for ${song.album["#text"]}`}
        loading="lazy"
      />

      <p className={styles.info}>
        <a className={styles.track} href={song.url} data-testid="last-played-title">
          {song.name}
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
