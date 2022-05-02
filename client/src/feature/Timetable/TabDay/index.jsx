import React, { useEffect, useMemo, useState } from "react";
import styles from "./TabDay.module.scss";
import Calendar from "../../../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { getByDayTimeTableAsync } from "../../../redux/timetableDaySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import { Box, Chip, Typography } from "@mui/material";
import Ruler from "../../../components/Ruler";
import { convertCurrentTimeToPx } from "../../../utils/convertCurrentTimeToPx";
import { convertDayToWeekDay } from "../../../utils/convertDayToWeekday";
import BoxBackground from "../../../components/BoxBackgroud";
import { convertAmountOfTimeToSpecificTime } from "../../../utils/convertAmountOfTimeToSpecificTime";
import getColor from "../../../utils/getColor";
import { getGridRowBegin, getGridRowEnd } from "../../../utils/getGridRow";

const TabDay = () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const timetableDayValue = useSelector((state) => state.timetableDay.current);
  const dateFormat = useMemo(() => moment(date).format("DD/MM/YYYY"), [date]);
  const weekdayAndDay = useMemo(
    () => ({
      weekday: convertDayToWeekDay(date),
      day: moment(date).format("DD"),
    }),
    [date],
  );

  useEffect(() => {
    const fetchTimetableDay = async () => {
      try {
        const studentID = localStorage.getItem("studentID");
        const action = await getByDayTimeTableAsync({ id: studentID, date });
        const actionResult = await dispatch(action);
        await unwrapResult(actionResult);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTimetableDay();
  }, [date]);

  return (
    <div className={styles.main}>
      <Calendar date={date} setDate={setDate} />
      <div className={styles.main_content}>
        <div>
          <Typography
            sx={{ marginBottom: "2rem" }}
            className={styles.big_date}
            variant="h4">
            {dateFormat}
          </Typography>
          <div className={styles.timetable_container}>
            <Box
              sx={{
                top: convertCurrentTimeToPx(),
                position: "absolute",
                display: "flex",
                alignItems: "center",
                zIndex: "3",
              }}
              fullWidth
              className={styles.timeline_bar_container}>
              <Chip
                label={"09:00"}
                variant="outlined"
                sx={{
                  borderColor: "rgb(121, 226, 226)",
                  backgroundColor: "rgb(232, 252, 252)",
                  color: "rgb(121, 226, 226)",
                }}
              />
              <div className={styles.timeline_bar_line}></div>
            </Box>
            <Ruler />
            <div className={styles.time_content}>
              <div className={styles.time_content_wrapper}>
                <Typography>{weekdayAndDay.weekday}</Typography>
                <Typography>{weekdayAndDay.day}</Typography>
              </div>
              <div className={styles.box_timetable_wrapper}>
                <BoxBackground />
                <div className={styles.render_timetable_container}>
                  {timetableDayValue.map((value, index) =>
                    value.scheduleArray.map((valueSchedule, indexSchedule) => {
                      const timeStamp = convertAmountOfTimeToSpecificTime(
                        valueSchedule.subjectStart,
                        valueSchedule.amountOfSubject,
                      );
                      return (
                        <div
                          key={value.code + indexSchedule}
                          style={{
                            backgroundColor: getColor(index).background,
                            gridRow: `${getGridRowBegin(
                              valueSchedule.subjectStart,
                            )} / ${getGridRowEnd(
                              valueSchedule.subjectStart,
                              valueSchedule.amountOfSubject,
                            )}`,
                          }}
                          className={styles.render_timetable}>
                          <div
                            style={{
                              backgroundColor: getColor(index).border,
                            }}
                            className={styles.render_timetable_border}></div>
                          <Typography variant="subtitle2">
                            {value.name}
                          </Typography>
                          <Typography variant="caption">
                            {valueSchedule.room}
                          </Typography>
                          <br />
                          <Typography variant="caption">
                            {timeStamp.timeStart} - {timeStamp.timeEnd} (
                            {valueSchedule.amountOfSubject} tiết)
                          </Typography>
                        </div>
                      );
                    }),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDay;
