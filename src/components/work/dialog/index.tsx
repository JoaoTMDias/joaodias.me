import { FocusManager } from "@feedzai/react-a11y-tools";
import { useEffect, useRef } from "react";
import DialogCover from "./DialogCover";
import DialogHeader from "./DialogHeader";
import DialogProjectMeta from "./DialogProjectMeta";
import styles from "./index.module.scss";

function Dialog({ children, onClose }) {
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
            <DialogHeader
              title="Project Title"
              date="2022"
              intro="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic deleniti magni,
              eveniet praesentium illo eligendi minus ullam officiis, omnis esse suscipit placeat
              modi autem facilis nesciunt exercitationem ratione, porro non!"
            />
            <DialogCover
              src="https://source.unsplash.com/random/800x600/?cats"
              width="800"
              height="600"
              loading="lazy"
              alt="cenas"
            />
            <div className={styles.content}>
              <DialogProjectMeta />
              <div className={styles.section}>
                <h3>The Problem</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur optio
                  reprehenderit numquam. Laboriosam accusantium maxime similique aut quis,
                  voluptatem esse id doloribus consequuntur sapiente facilis commodi sunt numquam!
                  Excepturi, voluptatibus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur optio
                  reprehenderit numquam. Laboriosam accusantium maxime similique aut quis,
                  voluptatem esse id doloribus consequuntur sapiente facilis commodi sunt numquam!
                  Excepturi, voluptatibus.
                </p>
              </div>
              <div className={styles.section}>
                <h3>The Solution</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur optio
                  reprehenderit numquam. Laboriosam accusantium maxime similique aut quis,
                  voluptatem esse id doloribus consequuntur sapiente facilis commodi sunt numquam!
                  Excepturi, voluptatibus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur optio
                  reprehenderit numquam. Laboriosam accusantium maxime similique aut quis,
                  voluptatem esse id doloribus consequuntur sapiente facilis commodi sunt numquam!
                  Excepturi, voluptatibus.
                </p>
              </div>
              <div className={styles.section}>
                <img
                  className={styles.gallery}
                  src="https://source.unsplash.com/random/640x480/?cats"
                  width="640"
                  height="480"
                  loading="lazy"
                  alt="cenas"
                />
                <img
                  className={styles.gallery}
                  src="https://source.unsplash.com/random/640x480/?cats"
                  width="640"
                  height="480"
                  loading="lazy"
                  alt="cenas"
                />
                <img
                  className={styles.gallery}
                  src="https://source.unsplash.com/random/640x480/?cats"
                  width="640"
                  height="480"
                  loading="lazy"
                  alt="cenas"
                />
                <img
                  className={styles.gallery}
                  src="https://source.unsplash.com/random/640x480/?cats"
                  width="640"
                  height="480"
                  loading="lazy"
                  alt="cenas"
                />
              </div>
            </div>
            {children}
          </div>
        </div>
      </FocusManager>
    </div>
  );
}

export default Dialog;
