import "media-chrome";
import {
  MediaController,
  MediaControlBar,
  MediaPlayButton,
  MediaTimeDisplay,
  MediaTimeRange,
} from "media-chrome/react";
import styles from "./Show.module.scss";

export type MusicPlayerProps = {
  /** Audio src URL (defaults to current station) */
  src?: string;
};

const DEFAULT_SRC =
  "https://bucket.ruc.pt/wp-content/uploads/2026/01/05090200/20260105_0000_MEL_E_TAL.mp3";

function Show({ src = DEFAULT_SRC }: MusicPlayerProps) {
  return (
    <article className={styles.show} lang="pt-PT">
      <a
        href="https://ruc.pt/podcast/mel-e-tal/05-de-janeiro-de-2026-os-melhores-do-ano-parte-1-de-2"
        className={styles.show__cover}
      >
        <img
          className={styles.show__image}
          src="https://ruc.pt/_next/image?url=https%3A%2F%2Fbucket.ruc.pt%2Fwp-content%2Fuploads%2F2026%2F01%2F05091026%2Fcover.jpeg&w=3840&q=75"
          width="200"
          height="200"
          alt=""
        />
        <p className={styles.show__link}>
          Listen to the episode <span className="sr-only">and read show details</span>
        </p>
      </a>
      <div className={styles.show__content}>
        <h3 className={styles.show__head}>
          <span className={styles.show__title}>Os Melhores de Outubro de 2025</span>
          <div className={styles.show__metadata}>
            <span className={styles.show__name}>Mel e Tal</span>
            <time dateTime="26/11/2025" className={styles.show__date}>
              <span className="sr-only">Aired on</span>&nbsp;Nov 26th, 2025
            </time>
          </div>
        </h3>
        <p className={styles.show__description}>
          Learn practical, hands-on strategies and common pitfalls for developers conducting{" "}
          <strong>effective screen reader testing</strong>, ensuring a truly inclusive user
          experience.
        </p>
        <MediaController audio>
          <audio slot="media" src={src} />
          <MediaControlBar className={styles.show__bar}>
            <MediaPlayButton />
            <MediaTimeDisplay showDuration />
            <MediaTimeRange />
          </MediaControlBar>
        </MediaController>
      </div>
    </article>
  );
}

export default Show;
