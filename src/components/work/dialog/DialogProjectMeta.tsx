import FancyLink from "../../fancy-link";
import styles from "./index.module.scss";

function DialogProjectMeta() {
  return (
    <div className={styles.projectMeta}>
      <h3 className="sr-only">Project Information</h3>
      <div className={styles.projectColumn}>
        <h4>Skills</h4>
        <ul className={styles.withHashes}>
          <li>React</li>
          <li>Vite</li>
          <li>Fluent UI</li>
          <li>Typescript</li>
          <li>Electron</li>
          <li>Node</li>
        </ul>
      </div>
      <div className={styles.projectColumn}>
        <h4>Date</h4>
        <p>January 2022</p>
      </div>
      <div className={styles.projectColumn}>
        <h4>Source Code</h4>
        <span className="fancy__link__wrapper">
          <FancyLink href="https://github.com/JoaoTMDias/winpicker" text="Github repository" />
        </span>
      </div>
    </div>
  );
}

export default DialogProjectMeta;
