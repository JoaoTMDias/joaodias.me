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

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  "data-background"?: string;
}

function DialogCover({ "data-background": dataBackground, ...props }: Props) {
  const fallbackColor = dataBackground
    ? ({
        "--cover-background-color": dataBackground,
      } as React.CSSProperties)
    : undefined;
  return (
    <div className={styles.cover}>
      <img {...props} loading="lazy" style={fallbackColor} />
    </div>
  );
}

export default DialogCover;
