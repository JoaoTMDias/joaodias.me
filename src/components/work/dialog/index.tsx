/**
 * This file is open-source. This means that it can be reproduced in whole
 * or in part, stored in a retrieval system transmitted in any form, or by
 * any means electronic with my prior permission as an author and owner
 * Please refer to the terms of the license agreement in the root of the project
 *
 * (c) 2022 joaodias.me, Rights Reserved.
 */
import { FocusManager } from "@feedzai/react-a11y-tools";
import { useEffect, useRef } from "react";
import { Project } from "../../../data/selected-work/types";
import DialogCover from "./DialogCover";
import DialogHeader from "./DialogHeader";
import DialogProjectMeta from "./DialogProjectMeta";
import styles from "./index.module.scss";

interface Props {
  data: Project;
  onClose: () => void;
}

function Dialog({ data, onClose }: Props): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Places focus on the dialog when it mounts
   */
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  /**
   * Enables the user to close the dialog with the escape key
   */
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keyup", closeOnEscape);

    return () => {
      window.removeEventListener("keyup", closeOnEscape);
    };
  }, []);

  /**
   * When the dialog is mounted, removes the body's scrollbar
   */
  useEffect(() => {
    const bodyElement = document.querySelector("body");
    bodyElement.classList.add("modal--open");

    return () => {
      bodyElement.classList.remove("modal--open");
    };
  });
  return (
    <div className={styles.container}>
      <FocusManager restoreFocus contain>
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={styles.dialog}
        >
          <span className="sr-only">
            Press the Escape key to close this window and go back to the work list
          </span>
          <button className={styles.close} type="button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                fill="currentColor"
                d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25-6.2 6.25-14.4 9.35-22.6 9.35s-16.38-3.125-22.62-9.375L160 301.3 54.63 406.6C48.38 412.9 40.19 416 32 416s-16.37-3.1-22.625-9.4c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
              />
            </svg>
            <span className="sr-only">Close and go back to the work list</span>
          </button>
          <div className={styles.main}>
            <div className={styles.top}>
              <DialogHeader
                title={data.title}
                date={data.details.date}
                intro={data.details.description}
              />
              <DialogCover {...data.details.cover} />
            </div>
            <div className={styles.content}>
              <DialogProjectMeta
                skills={data.skills}
                date={data.details.date}
                sourceCode={data.details.sourceCode}
              />
              <div className={styles.section}>
                {data.details.photos.map((photo, index) => {
                  return <img key={index} className={styles.gallery} loading="lazy" {...photo} />;
                })}
              </div>
              <div className={styles.section}>
                <h3>The Problem</h3>
                {data.details.problem.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
              <div className={styles.section}>
                <h3>The Solution</h3>
                {data.details.solution.map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      </FocusManager>
    </div>
  );
}

export default Dialog;
