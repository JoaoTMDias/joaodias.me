/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { SkipLinks } from "@feedzai/react-a11y-tools";
import "@feedzai/react-a11y-tools/dist/index.css";
import "./index.module.scss";

interface ISkipLink {
  target: string;
  text: string;
  as?: "link" | "button";
}

const items: ISkipLink[] = [
  {
    target: "#content",
    text: "Skip to content",
    as: "link",
  },
  {
    target: "#work",
    text: "Skip to projects",
    as: "link",
  },
  {
    target: "#contact",
    text: "Skip to social links",
    as: "link",
  },
];

function SkipLink() {
  return <SkipLinks items={items} />;
}

export default SkipLink;
