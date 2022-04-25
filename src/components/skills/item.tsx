import { useRef } from "react";
import styles from "./index.module.scss";
import { useIntersection } from "react-use";

interface SkillsItemProps {
  name: string;
  type: "odd" | "even";
}

function SkillsItem({ name, type }: SkillsItemProps): JSX.Element {
  const ref = useRef(null);
  const observer = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });
  const isIntersecting = !!(
    observer &&
    observer.isIntersecting &&
    observer.intersectionRatio >= 0.8
  );

  return (
    <li ref={ref} className={styles.item} data-type={type}>
      <span className={styles.name} data-visible={isIntersecting}>
        {name}
      </span>
      <span className={styles.slash} aria-hidden="true">
        /
      </span>
    </li>
  );
}

export default SkillsItem;
