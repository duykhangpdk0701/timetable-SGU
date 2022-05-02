import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React from "react";
import styles from "./Calendar.module.scss";

const Calendar = (props) => {
  const { setDate, date } = props;

  return (
    <aside className={styles.aside}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
      </LocalizationProvider>
    </aside>
  );
};

export default Calendar;
