import { useState } from "react";
import { RoverProvider } from "@feedzai/react-a11y-tools";
import Dialog from "./dialog";
import Item from "./item";
import styles from "./index.module.scss";
import { WORKS } from "./data";

function Work() {
  const [show, setShow] = useState(false);

  function handleOnClose() {
    setShow(false);
  }

  function handleOnClickOnButton() {
    setShow(true);
  }

  return (
    <>
      <div className={styles.work}>
        <h2 id="work" aria-describedby="work-description" className={styles.title}>
          <span className={styles.arrow} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
              <path
                fill="var(--text-color)"
                d="M15.2 38.64v.48h5.76v-.48c0-4.88 1.92-9.52 5.36-13.04 3.44-3.52 8.08-5.44 12.96-5.52h.4v-1.04h-.48c-4.88-.08-9.44-2-12.88-5.52-3.44-3.44-5.36-8.08-5.36-13.04V0H15.2v.48c0 5.28 2.48 10.16 7.04 13.84 2.72 2.16 5.92 3.76 9.44 4.72H.8v1.04h30.88c-3.52.96-6.72 2.56-9.44 4.72-4.56 3.68-7.04 8.64-7.04 13.84Z"
              />
            </svg>
          </span>
          <span>Selected work</span>
        </h2>
        <span id="work-description" className="sr-only">
          Press up and down arrows to navigate between projects
        </span>
        <RoverProvider direction="vertical">
          <div className={styles.work__list}>
            {WORKS.map((work, index) => (
              <Item key={index} {...work} onClick={handleOnClickOnButton} />
            ))}
          </div>
        </RoverProvider>
      </div>
      {show && (
        <Dialog onClose={handleOnClose}>
          <p>cenas</p>
        </Dialog>
      )}
    </>
  );
}

export default Work;
