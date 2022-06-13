import { createRef, DetailsHTMLAttributes, FC, useEffect } from "react";
import styles from "./TagFilter.module.scss";
import { assertIsNode } from "../util/assertIsNode";

export type DetailProps = DetailsHTMLAttributes<HTMLDetailsElement> & {};

const TagFilter: FC<DetailProps> = ({ ...props }) => {
  const detailsRef = createRef<HTMLDetailsElement>();
  const closeDetails = (e: Event) => {
    assertIsNode(e.target);
    if (detailsRef.current && !detailsRef.current?.contains(e.target))
      detailsRef.current.open = false;
  };
  useEffect(() => {
    document.addEventListener("click", closeDetails);
    return () => document.removeEventListener("click", closeDetails);
  }, [detailsRef]);

  return (
    <details className={styles.detailsBase} ref={detailsRef}>
      <summary className={styles.summaryBase}>hejsaashdjasdkjas</summary>
      <div className={styles.filterViewBase}>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
        <p>asdasdas</p>
      </div>
    </details>
  );
};

export default TagFilter;
