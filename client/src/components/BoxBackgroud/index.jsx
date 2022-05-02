import React from "react";
import styles from "./BoxBackground.module.scss";

const BoxBackground = () => {
  return (
    <div className={styles.box_timetable_container}>
      <div className={styles.box_timetable}></div>
      <div className={styles.box_timetable}></div>
      <div className={styles.box_timetable}></div>
      <div className={styles.box_timetable}></div>
      <div className={styles.box_timetable}></div>
      <div className={styles.box_timetable}></div>
    </div>
  );
};

export default BoxBackground;
