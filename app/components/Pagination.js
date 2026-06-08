"use client";

import styles from "../page.module.css";

export default function Pagination({ page, onPrev, onNext }) {
  return (
    <div className={styles.paginationRow}>
      <button className={styles.navButton} onClick={onPrev} disabled={page <= 1}>
        Previous
      </button>
      <span style={{ fontWeight: 600 }}>Page {page}</span>
      <button className={styles.navButton} onClick={onNext}>
        Next
      </button>
    </div>
  );
}