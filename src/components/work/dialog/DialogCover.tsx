/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
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
