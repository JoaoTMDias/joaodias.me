import { FocusManager } from "@feedzai/react-a11y-tools";
import styles from "../index.module.scss";

function Dialog({ children, onClose }) {
  return (
    <div className={styles.dialog} onClick={onClose}>
      <div role="dialog" className={styles.dialog__container}>
        <FocusManager autoFocus restoreFocus contain>
          <button type="button" onClick={onClose}>
            Close
          </button>
          <div className={styles.dialog__content}>{children}</div>
        </FocusManager>
      </div>
    </div>
  );
}

export default Dialog;
