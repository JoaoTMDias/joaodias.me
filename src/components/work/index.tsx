import { useState } from "react";
import { RoverProvider } from "@feedzai/react-a11y-tools";
import Dialog from "./dialog";
import Item from "./item";
import styles from "./index.module.scss";

export const WORKS = [
  {
    id: "6fbb9dae-98f9-478f-9772-34c47df5382b",
    title: "WinPicker",
    subtitle: "A colour picker for Windows 11",
    skills: ["react", "vitejs", "electron"],
  },
  {
    id: "a03619ec-2900-4e85-954b-95d86b51d38c",
    title: "Google Chat Formatter",
    subtitle: "Browser extension that helps google chat users to type rich text",
    skills: ["preact", "vitejs", "cypress"],
  },
  {
    id: "f03ff710-8b47-41c9-96e8-78461ca0b51e",
    title: "istovaidarmerda.online",
    subtitle: "Website for an online pandemic-centric conference. Includes some easter eggs.",
    skills: ["nextjs", "cypress", "jest", "testing-library"],
  },
  {
    id: "00b3d7ba-7595-406f-9a1c-38a458c0d5a7",
    title: "Paperboy",
    subtitle: "A progressive web app for a concept news reader.",
    skills: ["gatsby", "news-api", "cypress", "styled-components"],
  },
  {
    id: "d32c9e21-7376-407c-af1e-34bc4c9b2d27",
    title: "@feedzai/react-a11y-tools",
    subtitle:
      "A small component library that eases the process of creating accessible design systems, web apps or websites. Available on npm.",
    skills: ["react", "node", "cypress-component-testing", "esbuild", "rollup"],
  },
];

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
        <h2 id="work" className={styles.title}>
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
