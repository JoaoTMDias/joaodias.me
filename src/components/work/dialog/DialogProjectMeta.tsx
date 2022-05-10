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
        <span className="fancy__link__wrapper">
          <FancyLink href={sourceCode} text="View source code" />
        </span>
      </div>
    </div>
  );
}

export default DialogProjectMeta;
