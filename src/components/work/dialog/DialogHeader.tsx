import styles from "./index.module.scss";

interface Props {
  title: string;
  date: string;
  intro: string;
}

function DialogHeader({ title, date, intro }: Props): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.date}>{date}</p>
      </div>
      <p className={styles.intro}>{intro}</p>
    </div>
  );
}

export default DialogHeader;
