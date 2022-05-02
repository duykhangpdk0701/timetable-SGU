import { Typography } from "@mui/material";
import React from "react";
import { twentyFourHour } from "../../global/timeType";
import styles from "./Ruler.module.scss";

const Ruler = () => {
  return (
    <div className={styles.timeline}>
      <div className={styles.empty_box}></div>
      {twentyFourHour.map((item, index) => (
        <div key={index} className={styles.line_of_time_container}>
          <div className={styles.line_of_time_wrapper}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: 13, height: 20, marginRight: 0.5 }}>
              {item}
            </Typography>
            <div
              className={`${styles.line_of_time} ${styles.line_of_time_long}`}></div>
          </div>
          <div className={styles.line_of_time_wrapper}>
            <div className={styles.line_of_time}></div>
          </div>
          <div className={styles.line_of_time_wrapper}>
            <div className={styles.line_of_time}></div>
          </div>
          <div className={styles.line_of_time_wrapper}>
            <div
              className={`${styles.line_of_time} ${styles.line_of_time_middle}`}></div>
          </div>
          <div className={styles.line_of_time_wrapper}>
            <div className={styles.line_of_time}></div>
          </div>
          <div className={styles.line_of_time_wrapper}>
            <div className={styles.line_of_time}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ruler;
