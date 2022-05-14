/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  text: string;
}

function FancyLink({ text, ...props }: Props) {
  return (
    <a {...props} className="fancy__link">
      <span>{text}</span>
      <svg
        className="fancy__link__underline"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
      </svg>
    </a>
  );
}

export default FancyLink;
