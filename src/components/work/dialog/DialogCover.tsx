import * as React from "react";
import styles from "./index.module.scss";

function DialogCover(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <figure className={styles.cover}>
      <img {...props} />
    </figure>
  );
}

export default DialogCover;
