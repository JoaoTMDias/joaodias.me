/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { Project } from "../../../data/selected-work/types";
import FancyLink from "../../fancy-link";
import styles from "./index.module.scss";

interface Props {
  skills: Project["skills"];
  date: Project["details"]["date"];
  sourceCode: Project["details"]["sourceCode"];
}

function DialogProjectMeta({ skills, date, sourceCode }: Props): JSX.Element {
  return (
    <div className={styles.projectMeta}>
      <h3 className="sr-only">Project Information</h3>
      <div className={styles.projectColumn}>
        <h4>Skills</h4>
        <ul className={styles.withHashes}>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className={styles.projectColumn}>
        <h4>Date</h4>
        <p>{date}</p>
      </div>
      <div className={styles.projectColumn}>
        <h4>Source Code</h4>
        <span className="fancy-link__wrapper">
          <FancyLink href={sourceCode} text="View source code" target="_blank" />
        </span>
      </div>
    </div>
  );
}

export default DialogProjectMeta;
